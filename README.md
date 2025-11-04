# 🤟 Traductor de Lenguaje de Señas

Aplicación web para traducir lenguaje de señas a texto en tiempo real usando inteligencia artificial.

## 🚀 Características

- ✅ **Detección en tiempo real**: Usa tu cámara web para detectar señas del alfabeto (A-Z)
- ✅ **Modelo de alta precisión**: 99.96% de precisión usando HuggingFace AI
- ✅ **Texto a señas**: Convierte texto en visualización de señas
- ✅ **Sin instalación**: Funciona 100% en el navegador

## 🎯 Tecnologías

- **MediaPipe Hands**: Detección de manos y landmarks (21 puntos por mano)
- **HuggingFace API**: Modelo pre-entrenado de reconocimiento de señas
- **HTML5/CSS3/JavaScript**: Frontend moderno y responsivo

## 📖 Cómo usar

### ⚠️ PASO IMPORTANTE: Configurar Token de HuggingFace

**El modelo requiere un token de HuggingFace (GRATIS) para funcionar:**

1. **Copia el archivo de ejemplo:**
   ```bash
   # En Windows PowerShell:
   Copy-Item config.example.js config.local.js
   
   # O manualmente: Renombra config.example.js a config.local.js
   ```

2. **Obtén tu token de HuggingFace:**
   - Ve a: https://huggingface.co/settings/tokens
   - Crea una cuenta si no tienes (gratis)
   - Genera un nuevo token (tipo "Read")
   - Copia el token (empieza con `hf_...`)

3. **Edita `config.local.js`** y reemplaza:
   ```javascript
   HUGGINGFACE_TOKEN: 'hf_xxxxxxxxxx'
   ```
   Por tu token real:
   ```javascript
   HUGGINGFACE_TOKEN: 'hf_TU_TOKEN_REAL_AQUI'
   ```

4. **Guarda el archivo** - `config.local.js` NO se subirá a GitHub (está en .gitignore)

**Ver instrucciones detalladas en:** `INSTRUCCIONES_TOKEN.md`

### Uso de la Aplicación

1. Abre `index.html` en tu navegador moderno (Chrome, Firefox, Edge)
2. Permite el acceso a la cámara web cuando se solicite
3. Haz señas del alfabeto frente a la cámara
4. Observa la detección en tiempo real

## 🤖 Modelo

- **Nombre**: Alphabet-Sign-Language-Detection
- **Autor**: prithivMLmods
- **Precisión**: 99.96%
- **Alfabeto**: A-Z (26 letras)
- **Arquitectura**: SiGLIP (Vision Transformer)
- **Parámetros**: 92.9M

## 🔧 Configuración (Opcional)

### Token de HuggingFace (REQUERIDO)

La API de HuggingFace **requiere autenticación** para evitar errores CORS.

**Archivos de configuración:**
- `config.example.js` - Plantilla sin token (SE SUBE a GitHub) ✅
- `config.local.js` - Tu archivo con token real (NO se sube a GitHub) 🔒

**Pasos:**

1. Crea una cuenta en [HuggingFace](https://huggingface.co) (GRATIS)
2. Ve a: https://huggingface.co/settings/tokens
3. Genera un nuevo token (tipo "Read")
4. Copia `config.example.js` a `config.local.js`
5. En `config.local.js`, reemplaza:
   ```javascript
   HUGGINGFACE_TOKEN: 'hf_TU_TOKEN_AQUI'
   ```

**📄 Ver guía completa:** [INSTRUCCIONES_TOKEN.md](INSTRUCCIONES_TOKEN.md)

### 🔒 Seguridad

- ✅ `config.local.js` está en `.gitignore` - NO se sube a GitHub
- ✅ `config.example.js` SÍ se sube - otros usuarios lo copian
- ✅ Tu token permanece privado y seguro

## 💡 Tips para mejor detección

1. ✅ Usa buena iluminación (luz natural o lámpara frontal)
2. ✅ Fondo limpio y uniforme
3. ✅ Mano centrada en el cuadro de video
4. ✅ Movimientos claros y pausados
5. ✅ Distancia adecuada: 30-60 cm de la cámara

## 📝 Notas

- La primera vez que uses la app, el modelo puede tardar ~20 segundos en cargar en HuggingFace
- Se requiere conexión a internet para usar el modelo de IA
- El navegador debe soportar WebRTC (Chrome, Firefox, Edge moderno)

## 📂 Estructura del proyecto

```
lenguajeDeSeñas/
├── index.html              # Página principal con interfaz de usuario
├── styles.css              # Estilos y animaciones
├── app.js                  # Lógica principal y detección de señas
├── config.example.js       # Plantilla de configuración (se sube a GitHub) ✅
├── config.local.js         # Tu configuración con token (NO se sube) 🔒
├── .gitignore              # Protege archivos sensibles
├── INSTRUCCIONES_TOKEN.md  # Guía para obtener token
├── LEEME_PRIMERO.txt       # Instrucciones rápidas
└── README.md               # Este archivo
```

**Nota:** `config.local.js` NO aparecerá en GitHub - está protegido por `.gitignore`

## 🌟 Créditos

- **Modelo de IA**: [prithivMLmods/Alphabet-Sign-Language-Detection](https://huggingface.co/prithivMLmods/Alphabet-Sign-Language-Detection)
- **Detección de manos**: [MediaPipe by Google](https://google.github.io/mediapipe/)
- **API de HuggingFace**: [Hugging Face Inference API](https://huggingface.co/inference-api)

---

Desarrollado con ❤️ para la comunidad de lenguaje de señas
