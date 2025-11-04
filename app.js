// Estado de la aplicación
const app = {
    camera: null,
    videoElement: null,
    canvasElement: null,
    canvasCtx: null,
    hands: null,
    detectedText: '',
    lastDetectedSign: null,
    lastDetectionTime: 0,
    lastPredictionTime: 0,
    playbackInterval: null,
    currentSignIndex: 0,
    playbackSpeed: 1,
    signs: []
};

// Configuración del modelo HuggingFace
const MODEL_CONFIG = {
    modelName: 'prithivMLmods/Alphabet-Sign-Language-Detection',
    // El token se carga desde config.local.js (no se sube a GitHub)
    apiToken: typeof CONFIG !== 'undefined' ? CONFIG.HUGGINGFACE_TOKEN : null
};

// Inicialización cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Elementos del DOM
    app.videoElement = document.getElementById('video');
    app.canvasElement = document.getElementById('canvas');
    app.canvasCtx = app.canvasElement.getContext('2d');

    // Verificar configuración del token
    if (!MODEL_CONFIG.apiToken || MODEL_CONFIG.apiToken === 'hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
        console.error('%c⚠️ TOKEN DE HUGGINGFACE REQUERIDO', 'font-size: 20px; color: red; font-weight: bold;');
        console.error('%c📋 Sigue las instrucciones en INSTRUCCIONES_TOKEN.md', 'font-size: 14px; color: orange;');
        console.error('%c🔗 Obtén tu token GRATIS en: https://huggingface.co/settings/tokens', 'font-size: 14px; color: cyan;');
        alert('⚠️ CONFIGURACIÓN REQUERIDA\n\nNecesitas un token de HuggingFace (GRATIS) para usar el modelo.\n\nVer instrucciones en: INSTRUCCIONES_TOKEN.md\n\nURL: https://huggingface.co/settings/tokens');
    } else {
        console.log('✅ Token de HuggingFace configurado correctamente');
    }

    // Event listeners para pestañas
    setupTabs();

    // Event listeners para cámara
    document.getElementById('start-camera').addEventListener('click', startCamera);
    document.getElementById('stop-camera').addEventListener('click', stopCamera);
    document.getElementById('clear-text').addEventListener('click', clearDetectedText);

    // Event listeners para texto a señas
    document.getElementById('translate-text').addEventListener('click', translateTextToSign);
    document.getElementById('play-signs').addEventListener('click', playSignSequence);
    document.getElementById('pause-signs').addEventListener('click', pauseSignSequence);
    document.getElementById('reset-signs').addEventListener('click', resetSignSequence);
    
    // Control de velocidad
    const speedControl = document.getElementById('playback-speed');
    speedControl.addEventListener('input', (e) => {
        app.playbackSpeed = parseFloat(e.target.value);
        document.getElementById('speed-value').textContent = `${app.playbackSpeed}x`;
    });

    console.log('✅ Aplicación inicializada');
    console.log('🤖 Modelo: HuggingFace Alphabet-Sign-Language-Detection (99.96% precisión)');
}

// Sistema de pestañas
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;

            // Remover active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activar el seleccionado
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');

            // Detener cámara si cambias de pestaña
            if (tabName === 'text-to-sign' && app.camera) {
                stopCamera();
            }
        });
    });
}

// ========== FUNCIONES PARA SEÑAS A TEXTO ==========

async function startCamera() {
    try {
        document.getElementById('detected-text').textContent = 'Iniciando cámara...';

        // Solicitar acceso a la cámara
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 }
        });

        app.videoElement.srcObject = stream;
        app.camera = stream;

        // Inicializar MediaPipe Hands
        await initializeHandDetection();

        // Actualizar UI
        document.getElementById('start-camera').disabled = true;
        document.getElementById('stop-camera').disabled = false;
        document.getElementById('detected-text').textContent = 'Cámara activa. Realiza señas frente a la cámara...';

        console.log('✅ Cámara iniciada');
    } catch (error) {
        console.error('❌ Error al iniciar cámara:', error);
        alert('No se pudo acceder a la cámara. Por favor, permite el acceso a la cámara en tu navegador.');
    }
}

async function initializeHandDetection() {
    // Configurar MediaPipe Hands
    app.hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });

    app.hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    app.hands.onResults(onHandsDetected);

    // Iniciar procesamiento de video
    app.videoElement.addEventListener('loadeddata', async () => {
        app.canvasElement.width = app.videoElement.videoWidth;
        app.canvasElement.height = app.videoElement.videoHeight;
        await processVideoFrame();
    });
}

async function processVideoFrame() {
    if (!app.camera) return;

    await app.hands.send({ image: app.videoElement });
    requestAnimationFrame(processVideoFrame);
}

function onHandsDetected(results) {
    // Limpiar canvas
    app.canvasCtx.save();
    app.canvasCtx.clearRect(0, 0, app.canvasElement.width, app.canvasElement.height);

    // Dibujar la imagen del video
    app.canvasCtx.drawImage(results.image, 0, 0, app.canvasElement.width, app.canvasElement.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        for (const landmarks of results.multiHandLandmarks) {
            // Dibujar las conexiones de la mano
            drawConnectors(app.canvasCtx, landmarks, HAND_CONNECTIONS, {
                color: '#00FF00',
                lineWidth: 5
            });
            
            // Dibujar los puntos de referencia
            drawLandmarks(app.canvasCtx, landmarks, {
                color: '#FF0000',
                lineWidth: 2,
                radius: 5
            });

            // Reconocer la seña usando HuggingFace
            recognizeWithHuggingFace(landmarks);
        }
    }

    app.canvasCtx.restore();
}

// Reconocimiento usando HuggingFace Inference API
async function recognizeWithHuggingFace(landmarks) {
    try {
        // Evitar predicciones demasiado frecuentes
        const now = Date.now();
        if (app.lastPredictionTime && (now - app.lastPredictionTime) < 1000) {
            return; // Esperar 1 segundo entre predicciones
        }
        
        // Extraer región de la mano del canvas
        const handImageBlob = await extractHandImageFromCanvas(landmarks);
        
        if (!handImageBlob) return;
        
        app.lastPredictionTime = now;
        
        // Llamar a la API de HuggingFace
        const apiURL = `https://api-inference.huggingface.co/models/${MODEL_CONFIG.modelName}`;
        
        const headers = {};
        
        // Agregar token (REQUERIDO para evitar CORS)
        if (MODEL_CONFIG.apiToken && MODEL_CONFIG.apiToken !== 'hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
            headers['Authorization'] = `Bearer ${MODEL_CONFIG.apiToken}`;
        } else {
            console.error('⚠️ TOKEN DE HUGGINGFACE REQUERIDO - Ver INSTRUCCIONES_TOKEN.md');
            return;
        }
        
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: headers,
            body: handImageBlob
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.warn('API HuggingFace respuesta:', response.status, errorText);
            
            // Si el modelo está cargando, mostrar mensaje
            if (response.status === 503) {
                console.log('⏳ Modelo cargándose en HuggingFace, intenta de nuevo en unos segundos...');
            }
            return;
        }
        
        const predictions = await response.json();
        
        // Obtener la predicción con mayor confianza
        if (predictions && predictions.length > 0) {
            const topPrediction = predictions[0];
            const detectedSign = topPrediction.label;
            const confidence = topPrediction.score;
            
            console.log('🔍 Predicción:', detectedSign, 'Confianza:', (confidence * 100).toFixed(1) + '%');
            
            // Solo actualizar si la confianza es alta
            if (confidence > 0.6) {
                updateDetectedText(detectedSign, confidence);
            }
        }
    } catch (error) {
        console.error('Error en predicción HuggingFace:', error);
    }
}

// Extraer imagen de la mano desde el canvas
async function extractHandImageFromCanvas(landmarks) {
    try {
        // Encontrar bounding box de la mano
        let minX = 1, minY = 1, maxX = 0, maxY = 0;
        
        for (const landmark of landmarks) {
            minX = Math.min(minX, landmark.x);
            minY = Math.min(minY, landmark.y);
            maxX = Math.max(maxX, landmark.x);
            maxY = Math.max(maxY, landmark.y);
        }
        
        // Agregar margen del 20%
        const margin = 0.2;
        const width = maxX - minX;
        const height = maxY - minY;
        
        minX = Math.max(0, minX - width * margin);
        minY = Math.max(0, minY - height * margin);
        maxX = Math.min(1, maxX + width * margin);
        maxY = Math.min(1, maxY + height * margin);
        
        // Convertir a coordenadas del canvas
        const x = Math.floor(minX * app.canvasElement.width);
        const y = Math.floor(minY * app.canvasElement.height);
        const w = Math.floor((maxX - minX) * app.canvasElement.width);
        const h = Math.floor((maxY - minY) * app.canvasElement.height);
        
        // Crear canvas temporal para la imagen recortada
        const tempCanvas = document.createElement('canvas');
        const targetSize = 224; // Tamaño que espera el modelo
        tempCanvas.width = targetSize;
        tempCanvas.height = targetSize;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Copiar y redimensionar región de la mano
        tempCtx.drawImage(app.canvasElement, x, y, w, h, 0, 0, targetSize, targetSize);
        
        // Convertir canvas a Blob para enviar a la API
        return new Promise((resolve) => {
            tempCanvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg', 0.95);
        });
        
    } catch (error) {
        console.error('Error extrayendo imagen:', error);
        return null;
    }
}

function updateDetectedText(sign, confidence) {
    // Evitar duplicados rápidos
    const now = Date.now();
    if (app.lastDetectedSign === sign && (now - app.lastDetectionTime) < 1000) {
        return;
    }

    app.lastDetectedSign = sign;
    app.lastDetectionTime = now;
    app.detectionConfidence = confidence;

    // Actualizar texto detectado
    if (sign !== ' ') {
        app.detectedText += sign;
    }
    
    const textElement = document.getElementById('detected-text');
    textElement.textContent = app.detectedText || 'Realiza una seña...';

    // Actualizar barra de confianza
    const confidencePercent = Math.round(confidence * 100);
    document.getElementById('confidence-value').textContent = `${confidencePercent}%`;
    document.getElementById('confidence-fill').style.width = `${confidencePercent}%`;
}

function clearDetectedText() {
    app.detectedText = '';
    document.getElementById('detected-text').textContent = 'Texto limpiado. Realiza señas...';
    document.getElementById('confidence-value').textContent = '0%';
    document.getElementById('confidence-fill').style.width = '0%';
}

function stopCamera() {
    if (app.camera) {
        app.camera.getTracks().forEach(track => track.stop());
        app.camera = null;
        app.videoElement.srcObject = null;

        document.getElementById('start-camera').disabled = false;
        document.getElementById('stop-camera').disabled = true;
        document.getElementById('detected-text').textContent = 'Cámara detenida.';

        // Limpiar canvas
        app.canvasCtx.clearRect(0, 0, app.canvasElement.width, app.canvasElement.height);

        console.log('✅ Cámara detenida');
    }
}

// ========== FUNCIONES PARA TEXTO A SEÑAS ==========

function translateTextToSign() {
    const text = document.getElementById('text-input').value.trim().toUpperCase();
    
    if (!text) {
        alert('Por favor escribe un texto para traducir');
        return;
    }

    // Limpiar contenedor
    const signOutput = document.getElementById('sign-output');
    signOutput.innerHTML = '';

    // Convertir cada letra a una seña
    app.signs = [];
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        if (char === ' ') {
            // Espacio
            const spaceDiv = document.createElement('div');
            spaceDiv.className = 'sign-item';
            spaceDiv.innerHTML = `
                <div style="width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; background: white; border-radius: 8px;">
                    <span style="font-size: 2em;">⎵</span>
                </div>
                <p>Espacio</p>
            `;
            signOutput.appendChild(spaceDiv);
            app.signs.push({ char: ' ', element: spaceDiv });
        } else if (/[A-Z]/.test(char)) {
            // Letra
            const signDiv = document.createElement('div');
            signDiv.className = 'sign-item';
            
            // Usar imágenes de placeholder o emojis
            // En producción, usarías imágenes reales del alfabeto dactilológico
            signDiv.innerHTML = `
                <div style="width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white; font-size: 3em; font-weight: bold;">
                    ${char}
                </div>
                <p>${char}</p>
            `;
            signOutput.appendChild(signDiv);
            app.signs.push({ char: char, element: signDiv });
        }
    }

    // Mostrar controles de reproducción
    document.querySelector('.playback-controls').style.display = 'flex';
    
    console.log(`✅ Traducido: ${text} (${app.signs.length} señas)`);
}

function playSignSequence() {
    if (app.signs.length === 0) return;

    // Limpiar animación anterior
    if (app.playbackInterval) {
        clearInterval(app.playbackInterval);
    }

    // Resetear si ya terminó
    if (app.currentSignIndex >= app.signs.length) {
        app.currentSignIndex = 0;
    }

    // Animar secuencia
    app.playbackInterval = setInterval(() => {
        // Remover highlight anterior
        app.signs.forEach(sign => sign.element.classList.remove('active'));

        // Highlight actual
        if (app.currentSignIndex < app.signs.length) {
            app.signs[app.currentSignIndex].element.classList.add('active');
            
            // Hacer scroll a la seña actual
            app.signs[app.currentSignIndex].element.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });

            app.currentSignIndex++;
        } else {
            // Fin de la secuencia
            pauseSignSequence();
            app.currentSignIndex = 0;
        }
    }, 1000 / app.playbackSpeed);

    console.log('▶️ Reproduciendo señas');
}

function pauseSignSequence() {
    if (app.playbackInterval) {
        clearInterval(app.playbackInterval);
        app.playbackInterval = null;
    }
    console.log('⏸️ Pausado');
}

function resetSignSequence() {
    pauseSignSequence();
    app.currentSignIndex = 0;
    app.signs.forEach(sign => sign.element.classList.remove('active'));
    console.log('🔄 Reiniciado');
}

// Funciones auxiliares para dibujar (compatibilidad con MediaPipe)
function drawConnectors(ctx, landmarks, connections, style) {
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.lineWidth;

    for (const connection of connections) {
        const from = landmarks[connection[0]];
        const to = landmarks[connection[1]];

        ctx.beginPath();
        ctx.moveTo(from.x * ctx.canvas.width, from.y * ctx.canvas.height);
        ctx.lineTo(to.x * ctx.canvas.width, to.y * ctx.canvas.height);
        ctx.stroke();
    }
}

function drawLandmarks(ctx, landmarks, style) {
    ctx.fillStyle = style.color;

    for (const landmark of landmarks) {
        ctx.beginPath();
        ctx.arc(
            landmark.x * ctx.canvas.width,
            landmark.y * ctx.canvas.height,
            style.radius,
            0,
            2 * Math.PI
        );
        ctx.fill();
    }
}

// Constantes de MediaPipe para conexiones de manos
const HAND_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4],           // Pulgar
    [0, 5], [5, 6], [6, 7], [7, 8],           // Índice
    [0, 9], [9, 10], [10, 11], [11, 12],      // Medio
    [0, 13], [13, 14], [14, 15], [15, 16],    // Anular
    [0, 17], [17, 18], [18, 19], [19, 20],    // Meñique
    [5, 9], [9, 13], [13, 17]                 // Palma
];

console.log('🚀 App.js cargado correctamente');
