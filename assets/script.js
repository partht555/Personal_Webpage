document.addEventListener('DOMContentLoaded', function() {

    // ── Matrix rain background ───────────────────────────
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    const chars = '01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()#@$%^&*;:'.split('');
    let cols, drops;

    function initCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        cols  = Math.floor(canvas.width / 18);
        drops = Array(cols).fill(1);
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(6, 6, 16, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '13px Fira Code, monospace';
        drops.forEach((y, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const gradient = ctx.createLinearGradient(0, (y - 1) * 18, 0, y * 18);
            gradient.addColorStop(0, 'rgba(0, 245, 255, 1.0)');
            gradient.addColorStop(1, 'rgba(157, 78, 221, 0.55)');
            ctx.fillStyle = gradient;
            ctx.fillText(char, i * 18, y * 18);
            if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }

    initCanvas();
    setInterval(drawMatrix, 60);
    window.addEventListener('resize', initCanvas);

    // ── Typed.js ─────────────────────────────────────────
    new Typed('#typing', {
        strings: [
            'MTS @ Nutanix',
            'MCS @ UIUC',
            'Software Engineer',
            'ML/AI Enthusiast'
        ],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
        showCursor: false
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});