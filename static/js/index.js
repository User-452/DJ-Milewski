document.addEventListener('DOMContentLoaded', function() {
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('active-flash');
            setTimeout(() => {
                this.classList.remove('active-flash');
            }, 1000);
        });
    });

    const rotatingText = document.getElementById('rotating-text');
    if (rotatingText) {
        const words = ["Urodziny", "Wesela", "Bale", "Imprezy Firmowe"];
        let index = 0;

        const updateText = () => {
            rotatingText.style.opacity = 0;
            setTimeout(() => {
                index = (index + 1) % words.length;
                rotatingText.textContent = words[index];
                rotatingText.style.opacity = 1;
            }, 500);
        };

        rotatingText.textContent = words[index];
        rotatingText.style.opacity = 1;

        setInterval(updateText, 2500);
    }

    const reservationButtons = document.querySelectorAll('a[href="#contact"]');
    const contactInfo = document.querySelector('.contact-info');

    if (reservationButtons.length > 0 && contactInfo) {
        reservationButtons.forEach(button => {
            button.addEventListener('click', () => {
                contactInfo.classList.add('shine-effect');

                setTimeout(() => {
                    contactInfo.classList.remove('shine-effect');
                }, 1500);
            });
        });
    }

    const discoTrigger = document.getElementById('disco-trigger');
    const discoAudio = document.getElementById('disco-audio');
    const pageContainer = document.getElementById('page-container');
    let discoModeActive = false;
    let nextStepIndex = 0;

    const discoSteps = [
        0, 0.4, 0.8, 1.2, 1.6, 2, 2.4, 2.9, 3.3, 3.7, 4.1, 4.5, 4.9, 5.3, 5.8,
        6.2, 6.6, 7, 7.4, 7.8, 8.3, 8.7, 9.1, 9.5, 9.9, 10.3, 10.7, 11.2, 11.6,
        12, 12.4, 12.8
    ];

    const colors = ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0000', '#00FF00', '#0000FF'];
    const lightBeams = [];

    function createLightBeams() {
        const numBeams = 15;
        for (let i = 0; i < numBeams; i++) {
            const beam = document.createElement('div');
            beam.className = 'light-beam';

            beam.style.left = `${45 + Math.random() * 10}%`;
            const angle = (Math.random() - 0.5) * 60;
            beam.style.transform = `rotate(${angle}deg)`;

            pageContainer.appendChild(beam);
            lightBeams.push(beam);
        }
    }

    function triggerVisuals() {
        const beam = lightBeams[Math.floor(Math.random() * lightBeams.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        beam.style.background = `linear-gradient(to top, ${color}40 0%, ${color}00 100%)`;

        beam.classList.add('active');

        setTimeout(() => {
            beam.classList.remove('active');
        }, 500);
    }

    function discoLoop() {
        if (!discoModeActive) return;

        const currentTime = discoAudio.currentTime;

        if (nextStepIndex < discoSteps.length && currentTime >= discoSteps[nextStepIndex]) {
            triggerVisuals();
            nextStepIndex++;
        }

        if (discoAudio.ended) {
            toggleDiscoMode();
        } else {
            requestAnimationFrame(discoLoop);
        }
    }

    function toggleDiscoMode() {
        discoModeActive = !discoModeActive;
        document.body.classList.toggle('disco-mode');

        if (discoModeActive) {
            if (lightBeams.length === 0) {
                createLightBeams();
            }
            discoAudio.currentTime = 0;
            discoAudio.play();
            nextStepIndex = 0;
            discoLoop();
        } else {
            discoAudio.pause();
        }
    }

    discoTrigger.addEventListener('click', toggleDiscoMode);
});