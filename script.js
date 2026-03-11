// script.js
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typography & Text Effects ---
    const subtitle = document.getElementById('main-subtitle');
    const text = subtitle.innerText;
    subtitle.innerHTML = '';

    // Split text into individual spans for character-level hovers/bounces
    [...text].forEach((char) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.innerText = char === ' ' ? '\u00A0' : char; // preserve spaces

        // Random subtle bounce occasionally
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance every interval
                span.classList.add('bounce');
                setTimeout(() => span.classList.remove('bounce'), 500);
            }
        }, 1000);

        subtitle.appendChild(span);
    });

    // Replace random letters with a banana emoji occasionally
    setInterval(() => {
        const chars = document.querySelectorAll('.char');
        if (chars.length === 0) return;

        const idx = Math.floor(Math.random() * chars.length);
        const originalChar = chars[idx].innerText;

        if (originalChar !== '\u00A0' && originalChar !== '🍌') {
            chars[idx].innerText = '🍌';
            chars[idx].classList.add('bounce');

            setTimeout(() => {
                chars[idx].innerText = originalChar;
                chars[idx].classList.remove('bounce');
            }, 800);
        }
    }, 3500);


    // --- 2. Dynamic Banana Ecosystem Engine ---
    const container = document.getElementById('floating-elements');
    let rainModeActive = false;
    let clickedBananasCount = 0;

    // A. Background Dust Particles
    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}vw`;
        p.style.top = `${Math.random() * 100}vh`;
        const duration = Math.random() * 20 + 10;
        p.style.transition = `transform ${duration}s linear`;
        container.appendChild(p);

        requestAnimationFrame(() => {
            setTimeout(() => {
                setInterval(() => {
                    p.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
                }, duration * 1000);
                p.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
            }, 50);
        });
    }

    // B. Banana Classes
    class FloatingBanana {
        constructor(isFalling = false, isTrail = false) {
            this.el = document.createElement('div');
            this.el.className = 'dynamic-banana';
            if (isTrail) this.el.classList.add('trail');
            this.el.innerText = '🍌';

            this.size = Math.random() * 2 + 1.5; // 1.5rem to 3.5rem
            this.el.style.fontSize = `${this.size}rem`;

            this.x = Math.random() * window.innerWidth;
            this.y = isFalling ? -100 : Math.random() * window.innerHeight;

            this.rotation = Math.random() * 360;
            this.rotSpeed = (Math.random() - 0.5) * 2;

            this.isFalling = isFalling;
            this.vy = isFalling ? (Math.random() * 2 + 1) : (Math.random() - 0.5) * 0.5;
            this.vx = (Math.random() - 0.5) * 1;

            this.updateTransform();
            this.addInteractions();

            container.appendChild(this.el);
        }

        updateTransform() {
            this.el.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotSpeed;

            // Screen wrapping / resetting
            if (this.x < -100) this.x = window.innerWidth + 50;
            if (this.x > window.innerWidth + 100) this.x = -50;

            if (this.y > window.innerHeight + 100) {
                if (this.isFalling && !rainModeActive) { // Fallers reset to top
                    this.y = -100;
                    this.x = Math.random() * window.innerWidth;
                } else if (!this.isFalling) { // Floaters bounce
                    this.vy *= -1;
                }
            }
            if (this.y < -100 && !this.isFalling) {
                this.y = window.innerHeight + 50;
            }

            this.updateTransform();
        }

        addInteractions() {
            // Hover: Spin wildly
            this.el.addEventListener('mouseenter', () => {
                this.rotSpeed = (Math.random() > 0.5 ? 1 : -1) * 15; // fast spin
                // occasionally juggles up
                if (Math.random() > 0.5) this.vy -= 3;
            });

            this.el.addEventListener('mouseleave', () => {
                this.rotSpeed = (Math.random() - 0.5) * 2;
            });

            // Click: Explode into slices!
            this.el.addEventListener('mousedown', () => {
                this.explode();
                clickedBananasCount++;
                if (clickedBananasCount === 5 && !rainModeActive) {
                    startRainMode();
                }
            });
        }

        explode() {
            // Create 5-8 slices
            const numSlices = Math.floor(Math.random() * 4) + 5;
            for (let i = 0; i < numSlices; i++) {
                const slice = document.createElement('div');
                slice.className = 'explode-slice';
                slice.innerText = ['🍌', '💥', '✨'][Math.floor(Math.random() * 3)];
                slice.style.left = `${this.x + (this.size * 16) / 2}px`;
                slice.style.top = `${this.y + (this.size * 16) / 2}px`;

                // CSS variables for animation endpoint
                const dx = (Math.random() - 0.5) * 200;
                const dy = (Math.random() - 0.5) * 200;
                const r = (Math.random() - 0.5) * 720;
                slice.style.setProperty('--dx', `${dx}px`);
                slice.style.setProperty('--dy', `${dy}px`);
                slice.style.setProperty('--r', `${r}deg`);

                container.appendChild(slice);
                setTimeout(() => slice.remove(), 1000);
            }
            // Remove the actual banana and spawn a new one later
            this.el.remove();
            bananas = bananas.filter(b => b !== this);

            setTimeout(() => {
                if (bananas.length < (rainModeActive ? 60 : 25)) {
                    bananas.push(new FloatingBanana(Math.random() > 0.5, Math.random() > 0.8));
                }
            }, 2000);
        }
    }

    let bananas = [];

    // Spawn initial ecosystem
    for (let i = 0; i < 15; i++) {
        bananas.push(new FloatingBanana(false, false)); // Floaters
    }
    for (let i = 0; i < 10; i++) {
        bananas.push(new FloatingBanana(true, Math.random() > 0.7)); // Fallers (some with trails)
    }

    function animateEcosystem() {
        bananas.forEach(b => b.update());
        requestAnimationFrame(animateEcosystem);
    }
    animateEcosystem();

    // --- 3. Easter Eggs ---
    // A. B Key Spawns Bananas
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'b' && document.activeElement.tagName !== 'INPUT') {
            bananas.push(new FloatingBanana(true, true));
            createRippleEffect(window.innerWidth / 2, 0);
        }
    });

    // B. Rain Mode
    const rainOverlay = document.createElement('div');
    rainOverlay.className = 'rain-overlay';
    document.body.appendChild(rainOverlay);

    function startRainMode() {
        rainModeActive = true;
        rainOverlay.classList.add('active');
        // Spawn 40 fallers rapidly
        let count = 0;
        const interval = setInterval(() => {
            const b = new FloatingBanana(true, true);
            b.vy = Math.random() * 5 + 5; // Fast!
            bananas.push(b);
            count++;
            if (count > 40) clearInterval(interval);
        }, 50);

        setTimeout(() => {
            rainModeActive = false;
            rainOverlay.classList.remove('active');
        }, 10000); // 10 seconds of rain
    }

    // C. Giant Meteor (Randomly every 15-30 seconds)
    function launchMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'giant-meteor';
        meteor.innerText = '🍌';
        container.appendChild(meteor);
        setTimeout(() => meteor.remove(), 3000);

        // Schedule next
        setTimeout(launchMeteor, Math.random() * 15000 + 15000);
    }
    setTimeout(launchMeteor, Math.random() * 10000 + 5000); // initial


    // --- 4. Interactions ---
    // Parallax
    const wrapper = document.getElementById('parallax-wrapper');
    const textContentArea = document.getElementById('text-content');

    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;

        wrapper.style.transform = `rotateX(${y / 2}deg) rotateY(${-x / 2}deg)`;
        textContentArea.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    });

    // Warp Button
    const warpBtn = document.getElementById('warp-btn');
    warpBtn.addEventListener('click', () => {
        warpBtn.classList.add('warp-anim');
        createRippleEffect(window.innerWidth / 2, window.innerHeight / 2, true);

        // Sucks all bananas to the center momentarily!
        bananas.forEach(b => {
            const dx = (window.innerWidth / 2) - b.x;
            const dy = (window.innerHeight / 2) - b.y;
            b.vx = dx * 0.05;
            b.vy = dy * 0.05;
        });

        setTimeout(() => warpBtn.classList.remove('warp-anim'), 800);
    });

    function createRippleEffect(x, y, huge = false) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'transparent';
        ripple.style.border = '2px solid var(--electric-blue)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = `warp-drive ${huge ? '1.5s' : '0.5s'} ease-out forwards`;
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '100';
        container.appendChild(ripple);
        setTimeout(() => ripple.remove(), huge ? 1500 : 500);
    }
});
