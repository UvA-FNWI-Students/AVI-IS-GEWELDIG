"use strict";
// Generate stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer)
        return;
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}
// Create floating emojis
function createFloatingEmojis() {
    const emojis = ['🚀', '⭐', '🌟', '✨', '💫', '🪐', '🌙', '☄️', '👽', '🛸', '🌈', '💥', '🔥', '⚡'];
    for (let i = 0; i < 30; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.top = Math.random() * 100 + '%';
        emoji.style.fontSize = (2 + Math.random() * 3) + 'rem';
        // Random durations for each animation to create chaos
        const floatDuration = (1 + Math.random() * 3) + 's';
        const rotateDuration = (1 + Math.random() * 2) + 's';
        const scaleDuration = (0.5 + Math.random() * 2) + 's';
        const colorDuration = (2 + Math.random() * 4) + 's';
        // Random delays for each animation
        const floatDelay = Math.random() * 3 + 's';
        const rotateDelay = Math.random() * 2 + 's';
        const scaleDelay = Math.random() * 1.5 + 's';
        const colorDelay = Math.random() * 4 + 's';
        emoji.style.animation = `
            glitchFloat ${floatDuration} infinite ease-in-out ${floatDelay},
            glitchRotate ${rotateDuration} infinite linear ${rotateDelay},
            glitchScale ${scaleDuration} infinite ease-in-out ${scaleDelay},
            glitchColor ${colorDuration} infinite ${colorDelay}
        `;
        document.body.appendChild(emoji);
    }
}
// Create shooting stars
function createShootingStars() {
    setInterval(() => {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.top = Math.random() * 50 + '%';
        shootingStar.style.animationDuration = (2 + Math.random() * 2) + 's';
        document.body.appendChild(shootingStar);
        setTimeout(() => {
            shootingStar.remove();
        }, 3000);
    }, 1000);
}
// Create planets
function createPlanets() {
    const planets = [
        { size: 50, color: '#ff6b6b', orbit: 250, duration: 25 },
        { size: 70, color: '#4ecdc4', orbit: 350, duration: 35 },
        { size: 40, color: '#ffe66d', orbit: 180, duration: 20 }
    ];
    planets.forEach((planet, index) => {
        const planetDiv = document.createElement('div');
        planetDiv.className = 'planet';
        planetDiv.style.width = planet.size + 'px';
        planetDiv.style.height = planet.size + 'px';
        planetDiv.style.background = `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}dd)`;
        planetDiv.style.boxShadow = `0 0 30px ${planet.color}`;
        planetDiv.style.left = '50%';
        planetDiv.style.top = '50%';
        planetDiv.style.animationDuration = planet.duration + 's';
        planetDiv.style.animationDelay = index * 3 + 's';
        document.body.appendChild(planetDiv);
    });
}
// Button evasion logic
function setupButtonEvasion() {
    const eensButton = document.getElementById('eens');
    const oneensButton = document.getElementById('oneens');
    if (!eensButton || !oneensButton)
        return;
    // Set initial position for "oneens" button
    const containerRect = document.querySelector('.button-container')?.getBoundingClientRect();
    if (containerRect) {
        oneensButton.style.left = '50%';
        oneensButton.style.top = '50%';
        oneensButton.style.transform = 'translate(-50%, -50%)';
    }
    let isEvading = false;
    let evasionCount = 0;
    // Make the "oneens" button run away
    function evadeButton(event) {
        if (isEvading)
            return;
        isEvading = true;
        const rect = oneensButton.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        // Calculate distance
        const distance = Math.sqrt(Math.pow(mouseX - buttonCenterX, 2) +
            Math.pow(mouseY - buttonCenterY, 2));
        // If mouse is getting close, move the button
        if (distance < 150) {
            evasionCount++;
            // Calculate escape direction (away from mouse)
            const angle = Math.atan2(buttonCenterY - mouseY, buttonCenterX - mouseX);
            // Random extra angle for unpredictability
            const randomAngle = angle + (Math.random() - 0.5) * Math.PI / 2;
            // Increase escape distance over time
            const escapeDistance = 150 + evasionCount * 20;
            const newX = buttonCenterX + Math.cos(randomAngle) * escapeDistance;
            const newY = buttonCenterY + Math.sin(randomAngle) * escapeDistance;
            // Keep within viewport bounds
            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height;
            const boundedX = Math.max(rect.width / 2, Math.min(newX, maxX));
            const boundedY = Math.max(rect.height / 2, Math.min(newY, maxY));
            oneensButton.style.left = boundedX + 'px';
            oneensButton.style.top = boundedY + 'px';
            oneensButton.style.transform = 'translate(-50%, -50%) rotate(' + (Math.random() * 360) + 'deg)';
            // Add some fun effects
            if (evasionCount % 3 === 0) {
                oneensButton.style.transform += ' scale(1.2)';
                setTimeout(() => {
                    oneensButton.style.transform = oneensButton.style.transform.replace('scale(1.2)', 'scale(1)');
                }, 200);
            }
        }
        setTimeout(() => {
            isEvading = false;
        }, 100);
    }
    // Track mouse movement
    document.addEventListener('mousemove', evadeButton);
    // If somehow they click "oneens", make it even harder
    oneensButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Teleport to random location
        oneensButton.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        oneensButton.style.top = Math.random() * (window.innerHeight - 100) + 'px';
        // Make it smaller and harder to click
        oneensButton.style.transform = 'translate(-50%, -50%) scale(0.5)';
        alert('Bijna! Probeer het nog eens! 😈');
    });
    // "Eens" button redirects to success page
    eensButton.addEventListener('click', () => {
        // Add dramatic effect before redirect
        document.body.style.animation = 'none';
        document.body.style.background = '#000';
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.background = '#fff';
        flash.style.zIndex = '9999';
        flash.style.animation = 'flash 0.5s';
        document.body.appendChild(flash);
        setTimeout(() => {
            window.location.href = 'success.html';
        }, 500);
    });
}
// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createFloatingEmojis();
    createShootingStars();
    createPlanets();
    setupButtonEvasion();
});
