
        lucide.createIcons();

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const openIcon = document.getElementById('menu-open-icon');
        const closeIcon = document.getElementById('menu-close-icon');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });

        document.querySelectorAll('#mobile-menu a, #desktop-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    openIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            });
        });

        // Animate elements on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Animate skill bars
                    if (entry.target.querySelector('.skill-bar')) {
                        const skillBars = entry.target.querySelectorAll('.skill-bar');
                        skillBars.forEach(bar => {
                            const width = bar.getAttribute('data-width');
                            setTimeout(() => { bar.style.width = width; }, 200);
                        });
                    }
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-fade-in').forEach(el => {
            observer.observe(el);
        });

        // Typing animation
        const nameText = document.getElementById('name-text');
        const names = ['TAWHID', 'A DEVELOPER', 'AN ENGINEER', 'AN INNOVATOR'];
        let nameIndex = 0; let charIndex = 0; let isDeleting = false;

        function typeWriter() {
            const currentName = names[nameIndex];
            if (isDeleting) {
                nameText.textContent = currentName.substring(0, charIndex - 1); charIndex--;
            } else {
                nameText.textContent = currentName.substring(0, charIndex + 1); charIndex++;
            }
            let typeSpeed = isDeleting ? 100 : 200;
            if (!isDeleting && charIndex === currentName.length) {
                typeSpeed = 2000; isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false; nameIndex = (nameIndex + 1) % names.length; typeSpeed = 500;
            }
            setTimeout(typeWriter, typeSpeed);
        }

        // Interactive Terminal Logic
        const terminalWindow = document.getElementById('terminal-window');
        const terminalOutput = document.getElementById('terminal-output');
        const terminalInput = document.getElementById('terminal-input');
        const terminalBody = document.getElementById('terminal-body');

        const commands = {
            whoami: `<p class="text-blue-300">Tawhid Hasan</p><p>> 3rd Year Computer Science Engineering Student</p><p>> North South University</p><p>> Passionate about software development and creative design.</p>`,
            projects: `<p class="text-yellow-300">Fetching projects...</p><p>1. <a href="https://github.com/tawhid-88/CG_High" target="_blank" class="text-green-400 hover:underline">CGPA_Converter.js</a> - A tool to convert CGPA between NSU and AIUB.</p><p>2. <a href="https://github.com/tawhid-88/Hospital-management-system" target="_blank" class="text-green-400 hover:underline">HospitalSystem.java</a> - A desktop app for hospital management.</p>`,
            skills: `<p class="text-yellow-300">Loading skill modules...</p><p class="text-green-400">// Languages & Frameworks</p><p>> C/C++, Python, Java, JavaScript</p><p class="text-purple-400">// Design Tools</p><p>> Adobe Photoshop, Adobe Illustrator</p>`,
            contact: `<p class="text-yellow-300">Establishing connection protocols...</p><p>> <a href="mailto:tawhidhasan88@gmail.com" class="text-green-400 hover:underline">Email</a></p><p>> <a href="https://github.com/tawhid-88" target="_blank" class="text-green-400 hover:underline">GitHub</a></p><p>> <a href="https://www.facebook.com/tawhid.hasan.88/" target="_blank" class="text-green-400 hover:underline">Facebook</a></p><p>> <a href="https://www.instagram.com/hasan__tawhid/" target="_blank" class="text-green-400 hover:underline">Instagram</a></p>`,
            clear: () => { terminalOutput.innerHTML = ''; return ''; },
            help: `<p class="text-yellow-300">Available commands:</p><div class="grid grid-cols-2 gap-x-4"><div><p class="text-green-400">whoami</p><p class="text-green-400">projects</p><p class="text-green-400">skills</p></div><div><p>- Shows a brief bio.</p><p>- Lists my projects.</p><p>- Displays my technical skills.</p></div><div><p class="text-green-400">contact</p><p class="text-green-400">clear</p><p class="text-green-400">help</p></div><div><p>- Shows contact information.</p><p>- Clears the terminal screen.</p><p>- Shows this help message.</p></div></div>`
        };

        function printWelcomeMessage() {
            const welcome = `<p>Welcome to my interactive terminal!</p><p>Type 'help' to see the list of available commands.</p>`;
            terminalOutput.innerHTML += welcome;
        }

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                const output = document.createElement('div');
                output.innerHTML = `<p><span class="text-green-400">visitor@tawhid-portfolio:~$</span> ${command}</p>`;

                if (command in commands) {
                    const commandOutput = commands[command];
                    if (typeof commandOutput === 'function') {
                        output.innerHTML += commandOutput();
                    } else {
                        output.innerHTML += `<div class="text-gray-300">${commandOutput}</div>`;
                    }
                } else if (command !== '') {
                    output.innerHTML += `<p class="text-red-500">command not found: ${command}. Type 'help' for a list of commands.</p>`;
                }

                terminalOutput.appendChild(output);
                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });

        terminalWindow.addEventListener('click', () => { terminalInput.focus(); });

        window.onload = () => {
            setTimeout(typeWriter, 1000);
            printWelcomeMessage();
        };
