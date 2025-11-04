# Plataforma de Aprendizaje de Lenguaje de Señas con SQLite

Una plataforma web educativa para aprender lenguaje de señas con videos, documentos PDF y sistema de registro/login usando SQLite.

## 🌟 Características

- ✅ Sistema de registro y login con SQLite
- 🔐 Contraseñas encriptadas con bcrypt
- 📹 Videos educativos de YouTube integrados
- 📄 Sección de documentos PDF descargables
- 🎨 Diseño responsivo y atractivo
- 💾 Base de datos SQLite persistente
- 🎯 Niveles de aprendizaje (Básico, Intermedio, Avanzado)

## 📁 Estructura del Proyecto

```
signLanguage/
│
├── 📂 css/
│   └── styles.css              # Estilos CSS de la aplicación
│
├── 📂 js/
│   └── script.js               # JavaScript del frontend
│
├── 📂 images/
│   └── icono.png               # Logo/icono de la aplicación
│
├── 📂 docs/
│   └── pdfs/                   # PDFs educativos
│       └── Diccionario_lengua_Senas.pdf
│
├── 📄 index.html               # Página principal
├── 📄 login.html               # Página de inicio de sesión
├── 📄 registro.html            # Página de registro
├── 📄 aprender.html            # Página de contenido educativo
│
├── 📄 server.js                # Servidor Node.js con Express
├── 📄 package.json             # Dependencias del proyecto
├── 📄 package-lock.json        # Versiones exactas de dependencias
├── 📄 usuarios.db              # Base de datos SQLite (se crea automáticamente)
├── 📄 .gitignore               # Archivos ignorados por Git
│
├── 📄 README.md                # Este archivo
└── 📂 node_modules/            # Dependencias de Node.js (ignorado por Git)
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js (versión 14 o superior)
- npm (viene con Node.js)

### Paso 1: Instalar Dependencias

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
npm install
```

Esto instalará: express, sqlite3, bcrypt, cors, body-parser

### Paso 2: Iniciar el Servidor

```powershell
npm start
```

Verás: 🚀 Servidor corriendo en http://localhost:3000

### Paso 3: Abrir la Aplicación

Ve a: http://localhost:3000

## 📚 Contenido Educativo Incluido

### Videos
- Lenguaje de señas para niños/Lesco 🖐🏻
- Aprendes y en Señas - Lección 1: Saludos
- Aprende y en Señas - Abecedario Lengua de Señas Mexicana (Parte 1)
- Aprende y en Señas - Abecedario (parte 2)
- Aprende y en Señas - Abecedario (parte 3)

### Documentos PDF
- DICCIONARIO DE LENGUA DE SEÑAS MEXICANA
- Cuaderno de Actividades Didácticas

## 🔧 Personalización

### Agregar tus propios PDFs

1. Agrega tus archivos PDF en la carpeta `docs/pdfs/`
2. En `aprender.html`, agrega una nueva tarjeta PDF:

```html
<div class="pdf-card" onclick="abrirPDF('docs/pdfs/tu-archivo.pdf')" style="cursor: pointer;">
    <div class="pdf-icon">📕</div>
    <h4>Título del PDF</h4>
    <p>Descripción del contenido</p>
    <span class="btn btn-secondary">Ver PDF</span>
</div>
```

3. El PDF se abrirá automáticamente en una nueva ventana al hacer clic en la tarjeta

### Cambiar Videos de YouTube

En `aprender.html`, busca las etiquetas `<iframe>` y reemplaza el `src` con el ID de tu video:

```html
<iframe src="https://www.youtube.com/embed/TU_VIDEO_ID"></iframe>
```

### Personalizar Colores

En `css/styles.css`, modifica las variables CSS en `:root`:

```css
:root {
    --primary-color: #4A90E2;    /* Color principal */
    --secondary-color: #50C878;  /* Color secundario */
    --accent-color: #FF6B6B;     /* Color de acento */
    /* ... más colores ... */
}
```

### Cambiar el Logo

1. Reemplaza el archivo `images/icono.png` con tu propio logo
2. El logo aparecerá automáticamente en todas las páginas
3. Recomendado: imagen PNG de 40x40 píxeles o mayor

## 💾 Base de Datos SQLite

### Estructura de la Tabla `usuarios`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | ID autoincremental (clave primaria) |
| nombre | TEXT | Nombre completo del usuario |
| email | TEXT | Correo electrónico (único) |
| password | TEXT | Contraseña encriptada con bcrypt |
| fecha_registro | DATETIME | Fecha de registro automática |

### Almacenamiento de Sesión

- La sesión activa se guarda en `localStorage` del navegador
- Las credenciales se validan contra la base de datos SQLite
- Las contraseñas están encriptadas con bcrypt (salt rounds: 10)

## 🌐 Compatibilidad

- ✅ Chrome / Edge
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Dispositivos móviles (diseño responsivo)

## 📱 Diseño Responsivo

La página se adapta automáticamente a diferentes tamaños de pantalla:
- 💻 Desktop (> 768px)
- 📱 Tablet (768px - 480px)
- 📱 Móvil (< 480px)

## 🔐 Seguridad Implementada

✅ **Contraseñas encriptadas** con bcrypt (salt rounds: 10)
✅ **Validación de datos** en el servidor
✅ **Email único** - No permite duplicados
✅ **CORS configurado** para peticiones del frontend
✅ **Contraseñas no expuestas** en las respuestas API
✅ **Manejo de errores** apropiado

### Para Producción (Mejoras Recomendadas):
- Implementar tokens JWT para autenticación
- Usar HTTPS
- Migrar a PostgreSQL o MySQL para mayor robustez
- Implementar límite de intentos de login
- Agregar autenticación de dos factores (2FA)

## 🎨 Capturas de Pantalla

El proyecto incluye:
- Página principal con hero section
- Sistema de login/registro
- Galería de videos educativos
- Sección de documentos PDF
- Niveles de aprendizaje

## 📝 Características Implementadas

- [x] Backend con Node.js/Express ✅
- [x] Base de datos SQLite ✅
- [x] Sistema de autenticación ✅
- [x] Contraseñas encriptadas ✅
- [x] Videos educativos integrados ✅
- [x] Documentos PDF descargables ✅
- [x] Diseño responsivo ✅

## 🚀 Mejoras Futuras

- [ ] Migrar a PostgreSQL para persistencia de datos
- [ ] Sistema de progreso de lecciones
- [ ] Certificados de completación
- [ ] Foro de comunidad
- [ ] Exámenes interactivos
- [ ] Reconocimiento de señas con IA
- [ ] Modo oscuro
- [ ] Notificaciones por email

## 🌐 Despliegue

Este proyecto está preparado para desplegarse en:
- **Render.com** (Recomendado - Gratis)
- **Railway.app** (Gratis)
- **Vercel** (Gratis)
- **Heroku** (De pago)

## 🤝 Contribuir

Este es un proyecto educativo. Siéntete libre de:
- Agregar más videos educativos
- Crear documentos PDF de calidad
- Mejorar el diseño
- Agregar nuevas funcionalidades
- Reportar bugs o sugerir mejoras

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 👨‍💻 Autor

Creado para facilitar el aprendizaje del lenguaje de señas y promover la inclusión.

---

**¡Gracias por usar esta plataforma educativa! 🤟**
