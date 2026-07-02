const arbol = document.getElementById('arbol');
let contLuces = 0, contRegalos = 0;

const colores = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800'];
const coloresBolas = [
    { color: '#dc143c', light: '#ff6b8a', dark: '#8b0000' },
    { color: '#ffd700', light: '#ffed4e', dark: '#b8860b' },
    { color: '#4169e1', light: '#87ceeb', dark: '#191970' },
    { color: '#32cd32', light: '#90ee90', dark: '#006400' }
];
const mensajes = ['¡Feliz Navidad! 🎄✨', 'Que brille tu luz 💫', 'Paz y amor ❤️', 'Magia navideña ⭐'];

function crearArbol() {
    const secciones = [
        { top: 40, w: 140, h: 110 },
        { top: 125, w: 190, h: 110 },
        { top: 210, w: 240, h: 110 },
        { top: 295, w: 290, h: 110 },
        { top: 380, w: 340, h: 105 }
    ];
    
    secciones.forEach((s, i) => {
        const sec = document.createElement('div');
        sec.className = 'seccion';
        sec.style.top = s.top + 'px';
        sec.style.width = s.w + 'px';
        sec.style.height = s.h + 'px';
        sec.innerHTML = '<div class="rama"></div>';
        arbol.appendChild(sec);
        agregarDeco(s, i);
    });
    
    arbol.innerHTML += '<div class="tronco"></div><div class="estrella" onclick="explotarEstrella()"><div class="estrella-inner"></div></div>';
    crearRegalos();
}

function agregarDeco(s, nivel) {
    const numL = 8 + nivel * 3;
    const numB = 4 + nivel * 2;
    
    for (let i = 0; i < numL; i++) {
        const a = (i / numL) * 360;
        const r = s.w / 2 - 25;
        const x = 225 + Math.cos(a * Math.PI / 180) * r;
        const y = s.top + s.h - 35 + Math.sin(a * Math.PI / 180) * (r * 0.4);
        
        const luz = document.createElement('div');
        luz.className = 'luz';
        luz.style.cssText = `--color: ${colores[Math.floor(Math.random() * colores.length)]}; --x: ${x}px; --y: ${y}px; --delay: ${Math.random() * 2}s`;
        luz.onclick = () => quitar(luz, 'luz');
        arbol.appendChild(luz);
        contLuces++;
    }
    
    for (let i = 0; i < numB; i++) {
        const a = (i / numB) * 360 + 45;
        const r = s.w / 2 - 50;
        const x = 225 + Math.cos(a * Math.PI / 180) * r;
        const y = s.top + s.h - 50 + Math.sin(a * Math.PI / 180) * (r * 0.5);
        const cb = coloresBolas[Math.floor(Math.random() * coloresBolas.length)];
        
        const bola = document.createElement('div');
        bola.className = 'bola';
        bola.style.cssText = `--color: ${cb.color}; --light: ${cb.light}; --dark: ${cb.dark}; --size: ${20 + Math.random() * 15}px; --x: ${x}px; --y: ${y}px`;
        bola.onclick = () => quitar(bola, 'bola');
        arbol.appendChild(bola);
    }
    actualizar();
}

function crearRegalos() {
    const pos = [
        { x: 30, y: 580, w: 55, h: 50 },
        { x: 100, y: 580, w: 50, h: 45 },
        { x: 165, y: 580, w: 58, h: 52 },
        { x: 238, y: 580, w: 56, h: 50 },
        { x: 308, y: 580, w: 52, h: 48 },
        { x: 375, y: 580, w: 55, h: 50 }
    ];
    
    pos.forEach(p => {
        const r = document.createElement('div');
        r.className = 'regalo';
        const c = colores[Math.floor(Math.random() * colores.length)];
        const ci = colores[Math.floor(Math.random() * colores.length)];
        r.style.cssText = `--x: ${p.x}px; --y: ${p.y}px; --ancho: ${p.w}px; --alto: ${p.h}px; --color: ${c}; --cinta: ${ci}`;
        r.innerHTML = '<div class="cinta-h"></div><div class="cinta-v"></div><div class="mono"></div>';
        r.onclick = () => abrirRegalo(r);
        arbol.appendChild(r);
        contRegalos++;
    });
    actualizar();
}

function crearNieve() {
    for (let i = 0; i < 120; i++) {
        const c = document.createElement('div');
        const s = 3 + Math.random() * 7;
        const st = Math.random() * 100;
        c.className = 'nieve';
        c.style.cssText = `--size: ${s}px; --opacity: ${0.4 + Math.random() * 0.6}; --blur: ${s/3}px; --duration: ${7 + Math.random() * 10}s; --delay: ${Math.random() * 5}s; --start: ${st}vw; --end: ${st + (Math.random() - 0.5) * 50}vw; left: ${st}vw; top: -20px`;
        document.body.appendChild(c);
    }
}

function cambiarTema() {
    const temas = [
        { nombre: 'Clásico Verde', colores: ['#0d4d0d', '#1a661a', '#1e7a1e'] },
        { nombre: 'Azul Invernal', colores: ['#1a3d5c', '#2d5a7b', '#4a7ba7'] },
        { nombre: 'Morado Mágico', colores: ['#4d1a4d', '#662966', '#8b3a8b'] },
        { nombre: 'Dorado Festivo', colores: ['#4d3d0d', '#665a1a', '#8b7a1e'] },
        { nombre: 'Rojo Navideño', colores: ['#4d0d0d', '#661a1a', '#8b1e1e'] },
        { nombre: 'Turquesa Helado', colores: ['#0d4d4d', '#1a6666', '#1e8b8b'] },
        { nombre: 'Rosa Dulce', colores: ['#4d0d3d', '#661a5a', '#8b1e7a'] }
    ];
    
    if (!window.temaActual) window.temaActual = 0;
    window.temaActual = (window.temaActual + 1) % temas.length;
    
    const t = temas[window.temaActual].colores;
    document.querySelectorAll('.rama').forEach(r => {
        r.style.background = `linear-gradient(135deg, ${t[0]} 0%, ${t[1]} 20%, ${t[0]} 40%, ${t[2]} 60%, ${t[1]} 80%, ${t[0]} 100%)`;
    });
}

function sincronizarLuces() {
    document.querySelectorAll('.luz').forEach(l => {
        l.style.animation = 'none';
        setTimeout(() => l.style.animation = `parpadear ${1 + Math.random()}s infinite ${Math.random() * 0.5}s`, 50);
    });
}

function quitar(el, tipo) {
    el.style.transform = 'scale(0)';
    el.style.opacity = '0';
    setTimeout(() => {
        el.remove();
        if (tipo === 'luz') contLuces--;
        actualizar();
    }, 300);
}

function abrirRegalo(r) {
    r.style.transform = 'translateY(-100px) scale(0) rotate(360deg)';
    r.style.opacity = '0';
    document.getElementById('mensaje').textContent = mensajes[Math.floor(Math.random() * mensajes.length)];
    setTimeout(() => {
        r.remove();
        contRegalos--;
        actualizar();
    }, 500);
}

function explotarEstrella() {
    const e = document.querySelector('.estrella-inner');
    e.style.transform = 'scale(2.5)';
    e.style.filter = 'brightness(3)';
    setTimeout(() => {
        e.style.transform = 'scale(1)';
        e.style.filter = 'brightness(1)';
    }, 600);
}

function lanzarConfeti() {
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.style.cssText = `position: fixed; width: ${5 + Math.random() * 10}px; height: ${10 + Math.random() * 15}px; background: ${colores[Math.floor(Math.random() * colores.length)]}; left: ${Math.random() * 100}vw; top: -20px; border-radius: 3px; pointer-events: none; z-index: 999`;
            document.body.appendChild(c);
            c.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 50}px) rotate(${360 + Math.random() * 720}deg)`, opacity: 0 }
            ], { duration: 2000 + Math.random() * 2000, easing: 'linear' });
            setTimeout(() => c.remove(), 4000);
        }, i * 15);
    }
}

function actualizar() {
    document.getElementById('luces').textContent = contLuces;
    document.getElementById('regalos').textContent = contRegalos;
}

window.onload = () => {
    crearArbol();
    crearNieve();
    setInterval(() => {
        document.getElementById('mensaje').textContent = mensajes[Math.floor(Math.random() * mensajes.length)];
    }, 10000);
};