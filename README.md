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
├── index.html          # Página principal
├── login.html          # Página de inicio de sesión
├── registro.html       # Página de registro
├── aprender.html       # Página de contenido educativo
├── styles.css          # Estilos CSS
├── script.js           # JavaScript del frontend
├── server.js           # Servidor Node.js con Express
├── package.json        # Dependencias del proyecto
├── usuarios.db         # Base de datos SQLite (se crea automáticamente)
├── .gitignore          # Archivos ignorados por Git
└── README.md           # Este archivo
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
- Introducción al Lenguaje de Señas
- El Alfabeto Manual
- Números y Cantidades
- Frases Cotidianas

### Documentos PDF (simulados)
- Guía Básica del Alfabeto
- Vocabulario Esencial
- Gramática y Estructura
- Expresiones Faciales
- Conversaciones Prácticas
- Vocabulario Temático

## 🔧 Personalización

### Agregar tus propios PDFs

1. Crea una carpeta `pdfs/` en el directorio del proyecto
2. Agrega tus archivos PDF
3. Actualiza la función `descargarPDF()` en `script.js`:

```javascript
function descargarPDF(tipo) {
    // ... código existente ...
    
    // Reemplaza el alert con:
    window.open('pdfs/' + tipo + '.pdf', '_blank');
}
```

4. Actualiza los enlaces en `aprender.html` para que coincidan con tus archivos

### Cambiar Videos de YouTube

En `aprender.html`, busca las etiquetas `<iframe>` y reemplaza el `src` con el ID de tu video:

```html
<iframe src="https://www.youtube.com/embed/TU_VIDEO_ID"></iframe>
```

### Personalizar Colores

En `styles.css`, modifica las variables CSS en `:root`:

```css
:root {
    --primary-color: #4A90E2;    /* Color principal */
    --secondary-color: #50C878;  /* Color secundario */
    --accent-color: #FF6B6B;     /* Color de acento */
    /* ... más colores ... */
}
```

## 💾 Almacenamiento de Datos

Los datos de usuarios se almacenan en `localStorage` del navegador:
- **usuarios**: Array de todos los usuarios registrados
- **usuarioActivo**: Usuario actualmente logueado
- **progreso_[id]**: Progreso de aprendizaje por usuario

⚠️ **Nota**: Este sistema es solo para demostración. Para una aplicación real, deberías usar un backend con base de datos segura.

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

## 🔐 Seguridad

⚠️ **Importante**: Este proyecto usa almacenamiento local y NO encripta las contraseñas. Es solo para fines educativos.

Para un proyecto de producción:
- Usa un backend seguro (Node.js, Python, PHP, etc.)
- Encripta las contraseñas con bcrypt o similar
- Implementa tokens JWT para autenticación
- Usa HTTPS
- Valida datos en el servidor

## 🎨 Capturas de Pantalla

El proyecto incluye:
- Página principal con hero section
- Sistema de login/registro
- Galería de videos educativos
- Sección de documentos PDF
- Niveles de aprendizaje

## 📝 Mejoras Futuras

- [ ] Backend con Node.js/Express
- [ ] Base de datos (MongoDB/MySQL)
- [ ] Sistema de progreso de lecciones
- [ ] Certificados de completación
- [ ] Foro de comunidad
- [ ] Exámenes interactivos
- [ ] Reconocimiento de señas con IA
- [ ] Modo oscuro

## 🤝 Contribuir

Este es un proyecto educativo. Siéntete libre de:
- Agregar más videos educativos
- Crear documentos PDF de calidad
- Mejorar el diseño
- Agregar nuevas funcionalidades

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 👨‍💻 Autor

Creado para facilitar el aprendizaje del lenguaje de señas y promover la inclusión.

---

**¡Gracias por usar esta plataforma educativa! 🤟**
