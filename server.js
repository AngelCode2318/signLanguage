const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*', // En producción, especifica tu dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Crear/conectar a la base de datos SQLite
const db = new sqlite3.Database('./usuarios.db', (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err);
    } else {
        console.log('✅ Conectado a la base de datos SQLite');
        inicializarDB();
    }
});

// Crear tabla de usuarios si no existe
function inicializarDB() {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error al crear tabla:', err);
        } else {
            console.log('✅ Tabla de usuarios lista');
        }
    });
}

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Ruta para registro de usuario
app.post('/api/registro', async (req, res) => {
    const { nombre, email, password } = req.body;

    // Validaciones
    if (!nombre || !email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Todos los campos son obligatorios' 
        });
    }

    if (password.length < 6) {
        return res.status(400).json({ 
            success: false, 
            message: 'La contraseña debe tener al menos 6 caracteres' 
        });
    }

    try {
        // Verificar si el email ya existe
        db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, row) => {
            if (err) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Error en el servidor' 
                });
            }

            if (row) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Este correo electrónico ya está registrado' 
                });
            }

            // Encriptar contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar nuevo usuario
            db.run(
                'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
                [nombre, email, hashedPassword],
                function(err) {
                    if (err) {
                        return res.status(500).json({ 
                            success: false, 
                            message: 'Error al crear el usuario' 
                        });
                    }

                    res.json({ 
                        success: true, 
                        message: 'Usuario registrado exitosamente',
                        userId: this.lastID
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor' 
        });
    }
});

// Ruta para login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Email y contraseña son obligatorios' 
        });
    }

    db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, usuario) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Error en el servidor' 
            });
        }

        if (!usuario) {
            return res.status(401).json({ 
                success: false, 
                message: 'Correo electrónico o contraseña incorrectos' 
            });
        }

        try {
            // Verificar contraseña
            const passwordValida = await bcrypt.compare(password, usuario.password);

            if (!passwordValida) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Correo electrónico o contraseña incorrectos' 
                });
            }

            // Login exitoso
            res.json({ 
                success: true, 
                message: 'Login exitoso',
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email
                }
            });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: 'Error en el servidor' 
            });
        }
    });
});

// Ruta para obtener todos los usuarios (para desarrollo/pruebas)
app.get('/api/usuarios', (req, res) => {
    db.all('SELECT id, nombre, email, fecha_registro FROM usuarios', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Error al obtener usuarios' 
            });
        }
        res.json({ success: true, usuarios: rows });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📁 Archivos servidos desde: ${__dirname}`);
});

// Cerrar la base de datos al terminar
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Base de datos cerrada');
        process.exit(0);
    });
});
