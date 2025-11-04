# ⚠️ ERROR CORS - Solución Requerida

## 🔴 Problema

La API de HuggingFace **requiere autenticación** para llamadas desde el navegador. Sin un token, obtienes el error CORS:

```
Access to fetch at 'https://api-inference.huggingface.co/...' has been blocked by CORS policy
```

## ✅ Solución: Obtener Token de HuggingFace (GRATIS)

### Paso 1: Crear cuenta en HuggingFace (2 minutos)

1. Ve a: **https://huggingface.co/join**
2. Regístrate con tu email (es 100% gratis)
3. Verifica tu email

### Paso 2: Obtener tu Token de Acceso

1. Inicia sesión en HuggingFace
2. Ve a: **https://huggingface.co/settings/tokens**
3. Haz clic en **"New token"**
4. Nombre: `sign-language-app` (o cualquier nombre)
5. Tipo: **"Read"** (es suficiente)
6. Haz clic en **"Generate"**
7. **COPIA el token** (empieza con `hf_...`)

### Paso 3: Configurar el Token en la App

#### Método Seguro (Recomendado para GitHub público):

1. **Copia el archivo de configuración:**
   
   En Windows PowerShell:
   ```powershell
   Copy-Item config.example.js config.local.js
   ```
   
   O manualmente: Haz clic derecho en `config.example.js` → Copiar → Pegar → Renombra a `config.local.js`

2. **Edita `config.local.js`** con tu editor de texto

3. **Reemplaza el token de ejemplo:**
   
   ANTES:
   ```javascript
   HUGGINGFACE_TOKEN: 'hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
   ```
   
   DESPUÉS:
   ```javascript
   HUGGINGFACE_TOKEN: 'hf_TU_TOKEN_REAL_AQUI'
   ```

4. **Guarda el archivo** `config.local.js`

5. **Recarga la página** (F5 o Ctrl+R)

**🔒 Importante:** El archivo `config.local.js` está en `.gitignore` - NO se subirá a GitHub

## 🎉 ¡Listo!

Ahora la aplicación funcionará perfectamente con el modelo de HuggingFace.

---

## 📌 Notas Importantes

### ¿Es seguro poner el token en el código?

- ✅ **Con `config.local.js`**: SÍ - Este archivo NO se sube a GitHub (está en `.gitignore`)
- ✅ **Para uso personal**: Totalmente seguro
- ✅ **Para GitHub público**: Perfecto - el token queda en tu computadora
- ❌ **Nunca pongas el token directamente en `app.js`** si vas a subirlo a GitHub

### Archivos y Seguridad

| Archivo | ¿Se sube a GitHub? | Contiene token |
|---------|-------------------|----------------|
| `config.example.js` | ✅ SÍ | ❌ No (solo ejemplo) |
| `config.local.js` | ❌ NO (.gitignore) | ✅ Sí (tu token real) |
| `app.js` | ✅ SÍ | ❌ No (carga desde config) |
| `.gitignore` | ✅ SÍ | - |

### ¿Qué pasa si subo config.local.js por error?

Si accidentalmente subes tu token a GitHub:

1. **INMEDIATAMENTE** ve a https://huggingface.co/settings/tokens
2. **Revoca** el token comprometido
3. **Genera** un nuevo token
4. **Actualiza** `config.local.js` con el nuevo token
5. **Verifica** que `.gitignore` contiene `config.local.js`

### Límites de la API Gratuita

- ✅ **1,000 requests/día** con token gratuito
- ✅ **Sin costo** para uso personal
- ✅ **Suficiente** para desarrollo y demos

---

## 🆘 ¿Necesitas ayuda?

Si tienes problemas:

1. Verifica que copiaste el token completo (empieza con `hf_`)
2. Asegúrate de que el token sea de tipo "Read"
3. Recarga la página completamente (Ctrl+Shift+R)
4. Abre la consola del navegador (F12) y verifica si hay otros errores

---

**¡Una vez que agregues el token, la app funcionará perfectamente!** 🚀
