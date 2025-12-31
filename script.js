const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
const loveMessage = `Doorva Garg, Happy New Year!!! You are actually the Sweetest person I have ever known in my whole life. The way you uplift my mood with a couple minutes is actually INSANE. I am so impressed that you broke through the walls I put up and am just so happy that You choose me still after seeing my imperfections, hehehehe you will still think I'm "perfect" LOLLLL.

Doorva Garg, You are genuinely the Sweetest, most ADOORABLE, Cutie Patootie EVERRRR. You are just SOOO KUCHU PUCHUUUUUU I don't know what more can describe You. The words don't exist because they cannot begin to describe How Great You areeee Doorva.

Doorva Garg. My Girlfriend. My Sweetie. My Sugar Plum. My Darling. My Kuchu Puchuuuuuuu. My Door. My Girl. My Woman. My. Wife.

HAPPY NEW YEAR BABYYYYYY AND I AMMM SOOOO SOOOO SOOOOOOOOO HAPPY AND HONORED THAT I GET TO START THE NEW YEAR WITH YOUUUUUUUU.

I LOVE YOUUUUU DOORVA 😘💋`;


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.sx = Math.random() * 3 - 1.5;
        this.sy = Math.random() * -3 - 3;
        this.size = Math.random() * 2 + 1;

        const c = Math.floor(Math.random() * 0xffffff);
        this.r = c >> 16;
        this.g = (c >> 8) & 255;
        this.b = c & 255;

        this.shouldExplode = false;
    }

    update() {
        this.sy += 0.01;
        this.x += this.sx;
        this.y += this.sy;
        this.shouldExplode = this.sy >= -2 || this.y <= 100;
    }

    draw() {
        ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Particle {
    constructor(x, y, r, g, b) {
        this.x = x;
        this.y = y;
        this.sx = Math.random() * 3 - 1.5;
        this.sy = Math.random() * 3 - 1.5;
        this.life = 100;
        this.size = Math.random() * 2 + 1;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    update() {
        this.x += this.sx;
        this.y += this.sy;
        this.life--;
    }

    draw() {
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.life / 100})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const fireworks = [];
const particles = [];
let running = false;

function animate() {
    if (!running) return;

    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.25) fireworks.push(new Firework());

    fireworks.forEach((f, i) => {
        f.update();
        f.draw();

        if (f.shouldExplode) {
            for (let j = 0; j < 50; j++) {
                particles.push(new Particle(f.x, f.y, f.r, f.g, f.b));
            }
            fireworks.splice(i, 1);
        }
    });

    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

function typeText(element, text, speed = 30) {
    let i = 0;
    element.textContent = "";
    element.style.display = "block";

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });

            setTimeout(type, speed);
        }
    }
    type();
}

document.getElementById("startBtn").addEventListener("click", () => {
    if (!running) {
        running = true;
        animate();
    }

    document.getElementById("hT2").style.display = "none";

    document.getElementById("nyImage").style.display = "block";

    const textEl = document.getElementById("nyText");
    typeText(textEl, loveMessage, 25);
});
