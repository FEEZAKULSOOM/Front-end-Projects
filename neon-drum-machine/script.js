        // Sound banks
        const soundBanks = {
            'heater-kit': {
                Q: { name: 'Heater 1', url: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-1.mp3' },
                W: { name: 'Heater 2', url: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-2.mp3' },
                E: { name: 'Heater 3', url: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-3.mp3' },
                A: { name: 'Heater 4', url: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-4_1.mp3' },
                S: { name: 'Clap', url: 'https://cdn.freecodecamp.org/curriculum/drum/Heater-6.mp3' },
                D: { name: 'Open HH', url: 'https://cdn.freecodecamp.org/curriculum/drum/Dsc_Oh.mp3' },
                Z: { name: "Kick n' Hat", url: 'https://cdn.freecodecamp.org/curriculum/drum/Kick_n_Hat.mp3' },
                X: { name: 'Kick', url: 'https://cdn.freecodecamp.org/curriculum/drum/RP4_KICK_1.mp3' },
                C: { name: 'Closed HH', url: 'https://cdn.freecodecamp.org/curriculum/drum/Cev_H2.mp3' }
            },
            'piano-kit': {
                Q: { name: 'C4 Piano', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
                W: { name: 'D4 Piano', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
                E: { name: 'E4 Piano', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
                A: { name: 'F4 Piano', url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
                S: { name: 'G4 Piano', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
                D: { name: 'A4 Piano', url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
                Z: { name: 'B4 Piano', url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
                X: { name: 'C5 Piano', url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
                C: { name: 'D5 Piano', url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }
            }
        };

        // DOM Elements
        const padBank = document.getElementById('pad-bank');
        const display = document.getElementById('display');
        const volumeSlider = document.getElementById('volume-slider');
        const soundBankBtns = document.querySelectorAll('.sound-btn');
        
        let currentSoundBank = 'heater-kit';
        let volume = 0.5;

        // Create drum pads
        const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
        
        keys.forEach(key => {
            const pad = document.createElement('button');
            pad.className = 'drum-pad neon-border';
            pad.id = `pad-${key}`;
            pad.innerHTML = `
                <div class="key-label">${key}</div>
                <div class="sound-name">${soundBanks[currentSoundBank][key].name}</div>
                <audio class="clip" id="${key}" src="${soundBanks[currentSoundBank][key].url}"></audio>
            `;
            
            pad.addEventListener('click', () => playSound(key));
            padBank.appendChild(pad);
        });

        // Function to play sound
        function playSound(key) {
            const audio = document.getElementById(key);
            const pad = document.getElementById(`pad-${key}`);
            
            if (!audio) return;
            
            // Reset audio and set volume
            audio.currentTime = 0;
            audio.volume = volume;
            
            // Play audio
            audio.play();
            
            // Update display
            display.textContent = soundBanks[currentSoundBank][key].name;
            
            // Add active class for animation
            pad.classList.add('active');
            setTimeout(() => pad.classList.remove('active'), 150);
        }

        // Keyboard event listener
        document.addEventListener('keydown', (e) => {
            const key = e.key.toUpperCase();
            if (keys.includes(key)) {
                playSound(key);
            }
        });

        // Volume control
        volumeSlider.addEventListener('input', (e) => {
            volume = parseFloat(e.target.value);
            // Update all audio elements volume
            document.querySelectorAll('audio').forEach(audio => {
                audio.volume = volume;
            });
        });

        // Sound bank switching
        soundBankBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                soundBankBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Update sound bank
                currentSoundBank = btn.id;
                
                // Update all drum pads with new sounds
                keys.forEach(key => {
                    const audio = document.getElementById(key);
                    const soundName = document.querySelector(`#pad-${key} .sound-name`);
                    
                    if (audio && soundName) {
                        audio.src = soundBanks[currentSoundBank][key].url;
                        soundName.textContent = soundBanks[currentSoundBank][key].name;
                    }
                });
                
                // Update display
                display.textContent = `${btn.textContent} loaded!`;
            });
        });

        // Initialize display
        display.textContent = 'Heater Kit loaded - Ready to play!';