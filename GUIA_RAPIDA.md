# 🚀 Guía Rápida - Despliegue en Render

## Pasos Simples:

### 1️⃣ Subir a GitHub
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/signLanguage.git
git push -u origin main
```

### 2️⃣ Desplegar en Render
1. Ve a [render.com](https://render.com)
2. Regístrate/Inicia sesión (usa tu cuenta de GitHub)
3. Click en "New +" → "Web Service"
4. Conecta tu repositorio de GitHub
5. Configura:
   - **Name:** sign-language-app
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
6. Click "Create Web Service"
7. ¡Espera 2-5 minutos y listo! 🎉

### 3️⃣ Obtener tu URL
Render te dará una URL como:
```
https://sign-language-app.onrender.com
```

## ⚠️ Nota Importante:
El plan FREE de Render reinicia el servidor periódicamente, por lo que la base de datos SQLite se borrará. Si quieres datos permanentes, déjame saber y te ayudo a configurar PostgreSQL (también gratis).

## 📝 Para actualizar después:
```powershell
git add .
git commit -m "Actualización"
git push
```
Render se actualizará automáticamente.
