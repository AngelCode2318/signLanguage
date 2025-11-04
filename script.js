// Sistema de autenticación con localStorage

// Función para inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
    inicializarFormularios();
    protegerPaginas();
});

// Verificar si hay una sesión activa
function verificarSesion() {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    
    if (usuarioActivo) {
        const usuario = JSON.parse(usuarioActivo);
        actualizarNavbar(usuario);
    }
}

// Proteger páginas - redirigir a login si no hay sesión
function protegerPaginas() {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const paginaActual = window.location.pathname.split('/').pop();
    const paginasPublicas = ['login.html', 'registro.html', ''];
    
    // Si no hay sesión activa y no estamos en una página pública
    if (!usuarioActivo && !paginasPublicas.includes(paginaActual)) {
        window.location.href = 'login.html';
    }
    
    // Si hay sesión activa y estamos en login o registro, redirigir a index
    if (usuarioActivo && (paginaActual === 'login.html' || paginaActual === 'registro.html')) {
        window.location.href = 'index.html';
    }
}

// Actualizar navbar según el estado de la sesión
function actualizarNavbar(usuario) {
    const loginBtn = document.getElementById('loginBtn') || document.getElementById('loginBtnNav');
    const registroBtn = document.getElementById('registroBtn') || document.getElementById('registroBtnNav');
    const logoutBtn = document.getElementById('logoutBtn') || document.getElementById('logoutBtnNav');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (registroBtn) registroBtn.style.display = 'none';
    if (logoutBtn) {
        logoutBtn.style.display = 'block';
        logoutBtn.textContent = `Cerrar Sesión (${usuario.nombre})`;
    }
}

// Inicializar formularios
function inicializarFormularios() {
    // Formulario de registro
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', manejarRegistro);
    }
    
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', manejarLogin);
    }
    
    // Botón de cerrar sesión
    const logoutBtn = document.getElementById('logoutBtn') || document.getElementById('logoutBtnNav');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', cerrarSesion);
    }
}

// Manejar registro de nuevo usuario
function manejarRegistro(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('emailRegistro').value;
    const password = document.getElementById('passwordRegistro').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const errorDiv = document.getElementById('registroError');
    const successDiv = document.getElementById('registroSuccess');
    
    // Limpiar mensajes previos
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    // Validaciones
    if (password.length < 6) {
        mostrarError(errorDiv, 'La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    if (password !== confirmPassword) {
        mostrarError(errorDiv, 'Las contraseñas no coinciden');
        return;
    }
    
    // Obtener usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verificar si el email ya existe
    if (usuarios.some(user => user.email === email)) {
        mostrarError(errorDiv, 'Este correo electrónico ya está registrado');
        return;
    }
    
    // Crear nuevo usuario
    const nuevoUsuario = {
        id: Date.now(),
        nombre: nombre,
        email: email,
        password: password,
        fechaRegistro: new Date().toISOString()
    };
    
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Mostrar mensaje de éxito
    successDiv.textContent = '¡Registro exitoso! Redirigiendo al login...';
    successDiv.style.display = 'block';
    
    // Limpiar formulario
    document.getElementById('registroForm').reset();
    
    // Redirigir al login después de 2 segundos
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Manejar inicio de sesión
function manejarLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const errorDiv = document.getElementById('loginError');
    errorDiv.style.display = 'none';
    
    // Obtener usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Buscar usuario
    const usuario = usuarios.find(user => user.email === email && user.password === password);
    
    if (!usuario) {
        mostrarError(errorDiv, 'Correo electrónico o contraseña incorrectos');
        return;
    }
    
    // Guardar sesión activa
    localStorage.setItem('usuarioActivo', JSON.stringify({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
    }));
    
    // Redirigir a la página principal
    window.location.href = 'index.html';
}

// Cerrar sesión
function cerrarSesion(e) {
    e.preventDefault();
    
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        localStorage.removeItem('usuarioActivo');
        window.location.href = 'index.html';
    }
}

// Mostrar mensaje de error
function mostrarError(elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.display = 'block';
}

// Función para simular descarga de PDFs
function descargarPDF(tipo) {
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    
    if (!usuarioActivo) {
        alert('Debes iniciar sesión para descargar los documentos');
        window.location.href = 'login.html';
        return;
    }
    
    // Mapeo de tipos de PDF
    const pdfs = {
        'alfabeto': 'Guía Básica del Alfabeto',
        'vocabulario': 'Vocabulario Esencial',
        'gramatica': 'Gramática y Estructura',
        'expresiones': 'Expresiones Faciales',
        'conversaciones': 'Conversaciones Prácticas',
        'tematico': 'Vocabulario Temático'
    };
    
    alert(`Descargando: ${pdfs[tipo]}.pdf\n\nNota: Esta es una demostración. Para descargas reales, coloca tus archivos PDF en la carpeta 'pdfs/' y actualiza los enlaces.`);
    
    // Aquí podrías agregar la lógica real de descarga
    // Por ejemplo: window.open('pdfs/' + tipo + '.pdf', '_blank');
}



// Función para agregar progreso del usuario (opcional - para futuras mejoras)
function guardarProgreso(leccion, completado) {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    
    if (!usuarioActivo) return;
    
    let progreso = JSON.parse(localStorage.getItem('progreso_' + usuarioActivo.id)) || {};
    progreso[leccion] = {
        completado: completado,
        fecha: new Date().toISOString()
    };
    
    localStorage.setItem('progreso_' + usuarioActivo.id, JSON.stringify(progreso));
}

// Función para obtener progreso del usuario
function obtenerProgreso() {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    
    if (!usuarioActivo) return null;
    
    return JSON.parse(localStorage.getItem('progreso_' + usuarioActivo.id)) || {};
}
