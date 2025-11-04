# 🚀 Comandos para Subir a GitHub (Repositorio Público)

## ✅ VERIFICACIÓN PREVIA

Antes de subir, verifica que tu token NO esté en archivos públicos:

```powershell
# Verificar que config.local.js esté en .gitignore
Get-Content .gitignore | Select-String "config.local.js"

# Verificar qué archivos se van a subir (NO debe aparecer config.local.js)
git status
```

Si `config.local.js` aparece en `git status`, DETENTE y verifica `.gitignore`

---

## 📤 COMANDOS PARA SUBIR A GITHUB

### Primera vez (nuevo repositorio):

```powershell
# 1. Inicializar repositorio (si no lo has hecho)
git init

# 2. Agregar archivos (config.local.js se excluye automáticamente)
git add .

# 3. Verificar archivos a subir (NO debe aparecer config.local.js)
git status

# 4. Hacer commit
git commit -m "🤟 Traductor de Lenguaje de Señas con IA (HuggingFace + MediaPipe)"

# 5. Conectar con tu repositorio en GitHub
# Reemplaza TU_USUARIO y TU_REPOSITORIO con tus datos
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 6. Subir a GitHub
git branch -M main
git push -u origin main
```

---

### Actualizaciones posteriores:

```powershell
# 1. Agregar cambios
git add .

# 2. Verificar (config.local.js NO debe aparecer)
git status

# 3. Commit
git commit -m "Descripción de los cambios"

# 4. Push
git push
```

---

## 🔒 SEGURIDAD - ARCHIVOS PROTEGIDOS

Estos archivos NO se subirán a GitHub (están en .gitignore):

- ❌ `config.local.js` - Tu token está seguro aquí
- ❌ `.env` - Variables de entorno
- ❌ `node_modules/` - Dependencias

Estos archivos SÍ se subirán:

- ✅ `config.example.js` - Plantilla sin token
- ✅ `app.js` - Código principal
- ✅ `index.html` - Interfaz
- ✅ `styles.css` - Estilos
- ✅ `README.md` - Documentación
- ✅ `.gitignore` - Protección de archivos

---

## 🆘 ¿Subiste el token por error?

Si accidentalmente subiste `config.local.js` con tu token:

1. **INMEDIATAMENTE** revoca el token:
   - Ve a: https://huggingface.co/settings/tokens
   - Encuentra tu token y haz clic en "Delete"

2. **Genera un nuevo token**

3. **Limpia el historial de Git** (avanzado):
   ```powershell
   # Remover archivo del historial
   git filter-branch --force --index-filter "git rm --cached --ignore-unmatch config.local.js" --prune-empty --tag-name-filter cat -- --all
   
   # Forzar push
   git push origin --force --all
   ```

4. **Actualiza config.local.js** con el nuevo token

---

## 📋 CHECKLIST ANTES DE PUSH

- [ ] `config.local.js` NO aparece en `git status`
- [ ] Tu token NO está en `app.js` ni otros archivos
- [ ] `.gitignore` contiene `config.local.js`
- [ ] Has verificado el README para que tenga instrucciones claras
- [ ] Los usuarios sabrán que deben crear su propio `config.local.js`

---

## 🌟 DESCRIPCIÓN SUGERIDA PARA GITHUB

**Título del Repositorio:**
```
Traductor de Lenguaje de Señas con IA
```

**Descripción:**
```
🤟 Aplicación web para traducir lenguaje de señas a texto en tiempo real usando MediaPipe y HuggingFace AI. Precisión del 99.96% en reconocimiento de alfabeto A-Z.

🚀 Tecnologías: JavaScript, MediaPipe Hands, HuggingFace Inference API
⚡ Sin backend - 100% en el navegador
🎯 Modelo: prithivMLmods/Alphabet-Sign-Language-Detection
```

**Topics sugeridos:**
```
sign-language, machine-learning, mediapipe, huggingface, computer-vision, 
javascript, accessibility, ai, tensorflow, web-app
```

---

## 💡 TIPS

1. **No compartas tu token** en issues, comentarios o mensajes
2. **Revisa siempre** `git status` antes de hacer commit
3. **Lee el README** que creamos - tiene instrucciones claras para otros
4. **Usa .gitignore** - es tu amigo para proteger información sensible

---

¡Listo para subir de forma segura! 🚀🔒
