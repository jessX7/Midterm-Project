document.addEventListener('DOMContentLoaded', function () {
    const musicToggle = document.getElementById('musicToggle');
    const muteIcon = document.getElementById('muteIcon');

    const backgroundMusic = new Audio('assets/horror-background-music.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;

    // New music for Scene 10
    const escapeMusic = new Audio('assets/suspense.mp3');
    escapeMusic.loop = true;
    escapeMusic.volume = 0.3;

    let isMuted = false;
    let currentScene = 1;

    musicToggle.addEventListener('click', function () {
        if (isMuted) {
            if (currentScene === 10) {
                escapeMusic.play();
            } else {
                backgroundMusic.play();
            }
            muteIcon.textContent = '🔊';
        } else {
            backgroundMusic.pause();
            escapeMusic.pause();
            muteIcon.textContent = '🔇';
        }
        isMuted = !isMuted;
    });

    function goToScene(sceneNumber) {
        // Hide all scenes
        const scenes = document.querySelectorAll('div[id^="scene-"]');
        scenes.forEach(scene => {
            scene.classList.add('hidden');
            scene.classList.remove('active');
        });

        // Show the target scene
        const targetScene = document.getElementById(`scene-${sceneNumber}`);
        targetScene.classList.remove('hidden');
        targetScene.classList.add('active');

        // Handle music transitions
        if (sceneNumber === 10) {
            if (!isMuted) {
                backgroundMusic.pause();  // Stop background music
                escapeMusic.play();       // Start escape music
            }
        } else {
            escapeMusic.pause();          // Stop escape music when leaving Scene 10
            if (!isMuted && sceneNumber !== 10) {
                backgroundMusic.play();   // Resume background music if not muted
            }
        }

        // Update current scene number
        currentScene = sceneNumber;
    }

    const startGameButton = document.getElementById('startGameButton');
    startGameButton.addEventListener('click', function () {
        if (!isMuted) {
            backgroundMusic.play();  // Start background music when the game begins
        }
        document.getElementById('start-screen').classList.add('hidden');
        goToScene(1);
    });

    // Scene transition handling
    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', function () {
            const sceneNumber = parseInt(this.getAttribute('onclick').match(/\d+/)[0], 10);
            goToScene(sceneNumber);
        });
    });
});
