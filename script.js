document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
        AMBIENT BACKGROUND (LESS BUSY, SOFTER ORBS)
       ========================================= */
    const canvas = document.getElementById('ambient-canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let orbs = [];
    
    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    
    class Orb {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // INCREASED RADIUS FURTHER for a softer, cloud-like appearance
            this.radius = Math.random() * 400 + 300; // Even larger, making them more subtle
            // SLOWER MOVEMENT for less busyness
            this.vx = (Math.random() - 0.5) * 0.1; // Reduced from 0.3 to 0.1
            this.vy = (Math.random() - 0.5) * 0.1; // Reduced from 0.3 to 0.1
            
            // REDUCED OPACITY FURTHER for a more ethereal, less bright effect
            this.color = Math.random() > 0.5 
                ? 'rgba(56, 189, 248, 0.08)'  // Sky Blue, reduced from 0.15
                : 'rgba(139, 92, 246, 0.06)'; // Violet, reduced from 0.12
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < -this.radius || this.x > width + this.radius) this.vx *= -1; // Bounce from further off-screen
            if (this.y < -this.radius || this.y > height + this.radius) this.vy *= -1; // Bounce from further off-screen
        }
        
        draw() {
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // REDUCED ORB COUNT for less busyness
    for(let i=0; i<4; i++) { // Reduced from 6 to 4 orbs
        orbs.push(new Orb());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'screen'; 
        
        orbs.forEach(orb => {
            orb.update();
            orb.draw();
        });
        
        requestAnimationFrame(animate);
    }
    animate();

    /* =========================================
        SCROLL REVEAL
       ========================================= */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .reveal-up').forEach(el => {
        observer.observe(el);
    });

    /* =========================================
        SMOOTH NAV SCROLL
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
