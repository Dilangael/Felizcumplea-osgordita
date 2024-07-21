let clicks = 0;
let isOpen = false;

function openGift() {
    clicks++;
    const gift = document.getElementById('gift');
    const container = document.getElementById('container');
    const containerRect = container.getBoundingClientRect();
    const giftRect = gift.getBoundingClientRect();

    const maxX = containerRect.width - giftRect.width;
    const maxY = containerRect.height - giftRect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    gift.style.transform = `translate(${randomX}px, ${randomY}px) scale(${1 - clicks * 0.1})`;

    if (clicks >= 8) {
        gift.style.display = 'none';
        document.getElementById('message').style.display = 'block';
        document.getElementById('title').style.transform = 'translateY(-100px)';
        setTimeout(() => {
            document.getElementById('envelope').style.pointerEvents = 'auto'; // Permitir clics después de 15 segundos
        }, 20000); // 15 segundos
        launchConfettiAndBalloons();
    }
}

function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const envelopeBack = document.querySelector('.envelope-back');

    if (!isOpen) {
        envelope.classList.add('open');
        isOpen = true;
        setTimeout(function() {
            envelopeBack.style.display = 'block';
        }, 500);
    }
}

function launchConfettiAndBalloons() {
    launchConfetti();
    launchBalloons();
    playAudio();
    setTimeout(() => {
        stopConfettiAndBalloons();
    }, 20000); // 20 segundos
}

function launchConfetti() {
    confetti({
        particleCount: 500,
        spread: 160,
        origin: { y: 0.6 }
    });
}

function launchBalloons() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createBalloon();
        }, i * 200);
    }
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.animationDuration = `${Math.random() * 3 + 2}s`;
    balloon.style.backgroundColor = getRandomColor();
    document.body.appendChild(balloon);

    setTimeout(() => {
        balloon.remove();
    }, 5000);
}

function getRandomColor() {
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6F91', '#B983FF', '#FF5F00', '#00C1D4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function playAudio() {
    const audio = document.getElementById('audio');
    audio.play();
}

function stopConfettiAndBalloons() {
    // Detener confeti (simplemente deja de lanzarlo)
    // No es necesario detener globos, ya que se eliminan después de 5 segundos
}
