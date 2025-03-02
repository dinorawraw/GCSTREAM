const canvas = document.getElementById('gcCanvas');
const ctx = canvas.getContext('2d', { alpha: true });

// Configuração WebSocket
const socket = new WebSocket('wss://gcrodou.netlify.app/ws');

// Redimensionamento responsivo
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Renderização dos frames
socket.onmessage = (event) => {
  const img = new Image();
  img.src = URL.createObjectURL(event.data);
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(img.src);
  };
};

// Event listeners
window.addEventListener('resize', resizeCanvas);
socket.onopen = () => {
  console.log('Conectado ao GCSTREAM');
  resizeCanvas();
};
