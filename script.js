document.addEventListener('DOMContentLoaded', () => {
    const roseContainer = document.getElementById('rose-container');
    const roseImg = document.getElementById('rose');
    const tulipImg = document.getElementById('tulip');
    const message = document.getElementById('message');
    const instruction = document.querySelector('.instruction');

    // Initial State: Rose is visible
    roseImg.classList.add('visible-flower');
    tulipImg.classList.add('hidden'); // Ensure CSS class structure handles this
    tulipImg.classList.remove('visible-flower');

    // Reveal Tulip on click
    let isTulip = false;

    roseContainer.addEventListener('click', () => {
        if (!isTulip) {
            // Transform!
            isTulip = true;

            // Hide Rose
            roseImg.classList.remove('visible-flower');
            roseImg.classList.add('hidden');

            // Show Tulip with delay for swap effect
            setTimeout(() => {
                tulipImg.classList.remove('hidden');
                tulipImg.classList.add('visible-flower');
            }, 100); // Slight overlap possibility, but CSS transition handles scale

            // Show Message
            message.classList.remove('hidden'); // Fix: Remove display:none
            setTimeout(() => {
                message.classList.add('visible'); // Trigger opacity fade-in
            }, 10); // Small delay to ensure display:block applies first for transition

            instruction.style.display = 'none';

            // Change Text to be specific
            const msgParagraphs = message.querySelectorAll('p');
            if (msgParagraphs.length >= 2) {
                msgParagraphs[0].innerHTML = "I know it's a <strong>Rose Day</strong>...";
                msgParagraphs[1].innerHTML = "But for you, Bebo, only your favorite <strong>Tulips</strong> will do! 🌷✨";
                msgParagraphs[2].innerHTML = "A rose speaks of love silently, in a language known only to the heart.";
                msgParagraphs[3].innerHTML = "You are my beautiful rose. Happy Rose Day, my bebo! ❤️";
            }

            // Play Music
            const audio = document.getElementById('bg-music');
            if (audio) {
                audio.volume = 1;
                audio.play().catch(e => console.log("Audio play failed:", e));
            }

            // Explosion of sparkles and tulips
            createBurst();
        } else {
            // Clicking again just bursts more joy
            createBurst();
        }
    });

    // Advanced Falling System
    function createFallingElement() {
        const element = document.createElement('div');

        // Probabilities: 
        // If Tulip mode: 60% Tulip, 20% Petal, 20% Sparkle
        // If Rose mode: 10% Tulip (rare), 80% Petal, 10% Sparkle
        const rand = Math.random();
        let type = 'petal';

        if (isTulip) {
            if (rand < 0.6) type = 'tulip';
            else if (rand < 0.8) type = 'petal';
            else type = 'sparkle';
        } else {
            if (rand < 0.8) type = 'petal';
            else type = 'sparkle'; // Keep tulips hidden until reveal? Or rare tease. Let's keep hidden.
        }

        if (type === 'tulip') {
            element.classList.add('falling-tulip');
            element.innerHTML = '🌷'; // Use Emoji for falling element or small SVG
            element.style.fontSize = (Math.random() * 20 + 20) + 'px';
            element.style.position = 'absolute';
            element.style.zIndex = '5';
        } else if (type === 'sparkle') {
            element.classList.add('sparkle');
        } else {
            element.classList.add('petal');
        }

        // Randomize properties
        const startLeft = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 4; // 4-7s

        element.style.left = startLeft + 'vw';

        // Custom animation for emojis to fall
        if (type === 'tulip') {
            element.style.top = '-50px';
            // We need to inject a falling animation for these text/emoji elements if not using the 'petal' CSS
            // Let's reuse 'fall' animation but apply it via JS logic or add a class that uses it
            element.style.animation = `fall ${animationDuration}s linear infinite`;
        } else if (type === 'petal') {
            element.style.animationDuration = animationDuration + 's';
            // Random color variation for petals
            const colors = ['#ffb7c5', '#ff9eaa', '#ffc0cb', '#DC143C'];
            element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            // Random size
            const size = Math.random() * 10 + 10;
            element.style.width = size + 'px';
            element.style.height = size + 'px';
        }

        document.body.appendChild(element);

        // Remove after animation
        setTimeout(() => {
            element.remove();
        }, animationDuration * 1000);
    }

    // Spawn rate
    setInterval(createFallingElement, 200);

    // Burst effect
    function createBurst() {
        for (let i = 0; i < 30; i++) {
            setTimeout(createFallingElement, i * 50); // Staggered burst
        }
    }
});


