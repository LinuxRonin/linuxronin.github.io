// JavaScript improvements: modern syntax, command history
let terminalVisible = false;
const terminalOutput = document.getElementById('terminal-output');
const terminalInputArea = document.getElementById('terminal-input-area');
const terminalInput = document.getElementById('terminal-input');
const terminal = document.getElementById('terminal');
const terminalHeader = document.getElementById('terminal-header');
const navLinks = document.querySelector('.nav-links');
const logo = document.querySelector('.logo');
const trafficLights = document.querySelector('.traffic-lights');
let commandHistory = [];
let historyIndex = -1;

function toggleTerminal() {
    terminalVisible = !terminalVisible;
    terminal.style.display = terminalVisible ? 'flex' : 'none';
    if (terminalVisible) {
        terminalInput.focus();
    }
}

function printToTerminal(message, className = '') {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = message;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function handleTerminalInput(e) {
    if (e.key === 'Enter') {
        const input = e.target.value.trim().toLowerCase();
        if (input) {
            commandHistory.push(input);
            historyIndex = commandHistory.length;
        }
        printToTerminal(`<span style="color: var(--success);">➜</span> ${input}`);
        processCommand(input);
        e.target.value = '';
    } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else if (historyIndex === commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = '';
        }
    }
}

function processCommand(input) {
    switch (input) {
        case 'help':
            printToTerminal(`
                <div style="color: var(--text-secondary); display: grid; grid-template-columns: auto 1fr; gap: 0.5rem 1rem;">
                    <span style="color: var(--accent); font-weight: bold;">&gt; help</span> <span>Show this message</span>
                    <span style="color: var(--accent); font-weight: bold;">&gt; resume</span> <span>Download PDF resume</span>
                    <span style="color: var(--accent); font-weight: bold;">&gt; linkedin</span> <span>Open LinkedIn profile</span>
                    <span style="color: var(--accent); font-weight: bold;">&gt; github</span> <span>Open GitHub profile</span>
                    <span style="color: var(--accent); font-weight: bold;">&gt; about</span> <span>Scroll to About section</span>
                    <span style="color: var(--accent); font-weight: bold;">&gt; skills</span> <span>Scroll to Skills section</span>
                    <span style="color: var(--accent); font-weight: bold;">&gt; experience</span> <span>Scroll to Experience section</span>
                    <span style="color: var(--accent); font-weight: bold;">&gt; awards</span> <span>Scroll to Awards section</span>
                    <span style="color: var(--accent); font-weight: bold;">&gt; competitions</span> <span>Scroll to Competitions section</span>
                    <span style="color: var(--accent); font-weight: bold;">&gt; contact</span> <span>Scroll to Contact section</span>
                    <span style="color: var(--accent); font-weight: bold;">&gt; clear</span> <span>Clear terminal</span>
                </div>
            `);
            break;
        case 'resume':
            window.open('Juwon_Brunson_Cyber_4Yrs_Exp_Resume.pdf', '_blank');
            break;
        case 'linkedin':
            window.open('https://linkedin.com/in/juwonbrunson', '_blank');
            break;
        case 'github':
            window.open('https://github.com/LinuxRonin', '_blank');
            break;
        case 'about':
        case 'skills':
        case 'experience':
        case 'awards':
        case 'competitions':
        case 'contact':
            const section = document.getElementById(input);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                printToTerminal(`<div style="color: var(--text-secondary)">Scrolling to ${input} section...</div>`);
            } else {
                printToTerminal(`<div style="color: var(--danger)">zsh: no such section: ${input}</div>`);
            }
            break;
        case 'clear':
            terminalOutput.innerHTML = '';
            break;
        default:
            printToTerminal(`<div style="color: var(--danger)">zsh: command not found: ${input}</div>`);
    }
}

// Make the terminal draggable
let isDragging = false;
let offsetX, offsetY;

terminalHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - terminal.getBoundingClientRect().left;
    offsetY = e.clientY - terminal.getBoundingClientRect().top;
    terminal.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    terminal.style.left = `${e.clientX - offsetX}px`;
    terminal.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    terminal.style.cursor = 'grab';
});

// Basic form submission handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.className = 'form-message success';
                contactForm.reset();
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 3000);
            } else {
                formMessage.textContent = 'Failed to send message. Please try again.';
                formMessage.className = 'form-message error';
            }
        } catch (error) {
            console.error('Error sending form:', error);
            formMessage.textContent = 'An unexpected error occurred. Please try again later.';
            formMessage.className = 'form-message error';
        }
    });
}

function downloadResume() {
    window.open('Juwon_Brunson_Cyber_4Yrs_Exp_Resume', '_blank');
}

// Toggle mobile navigation
logo.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

const navLinkElements = document.querySelectorAll('.nav-links a');
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('show');
        }
    });
});

// Hide navigation on scroll down, show on scroll up
let lastScrollTop = 0;
window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        document.querySelector('header').style.top = '-100px';
    } else {
        // Scrolling up
        document.querySelector('header').style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // avoid negative
});
