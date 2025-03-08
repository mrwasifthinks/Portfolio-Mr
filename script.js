// Mobile Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !navbar.contains(e.target)) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});

// Close menu when clicking on a nav link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Initialize EmailJS
emailjs.init("1VhiAP0LG1F_aXTOQ");

// Enhanced Form Submission with Animation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const loader = submitBtn.querySelector('.button-loader');
    const buttonText = submitBtn.querySelector('span');
    
    // Show loading animation
    buttonText.style.opacity = '0';
    loader.style.display = 'block';
    submitBtn.disabled = true;

    try {
        await emailjs.sendForm('service_h8lpqdx', 'template_gn0p3ex', this, '1VhiAP0LG1F_aXTOQ');
        
        // Success animation
        submitBtn.classList.add('success');
        showMessage('Message sent successfully! 🎉', 'success');
        this.reset();
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        submitBtn.classList.remove('success');
    } catch (error) {
        // Error animation
        submitBtn.classList.add('error');
        showMessage('Failed to send message. Please try again. 😕', 'error');
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        submitBtn.classList.remove('error');
    } finally {
        // Reset button state
        buttonText.style.opacity = '1';
        loader.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Enhanced message display with animation
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Add slide and fade animation
    formMessage.animate([
        { transform: 'translateY(100px)', opacity: 0 },
        { transform: 'translateY(-10px)', opacity: 0.7 },
        { transform: 'translateY(0)', opacity: 1 }
    ], {
        duration: 600,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    formMessage.classList.add('show');
    
    setTimeout(() => {
        formMessage.classList.remove('show');
        formMessage.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(100px)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
    }, 5000);
}

// Enhanced hover effects
document.querySelectorAll('.icon-sphere').forEach(sphere => {
    const canvas = sphere.querySelector('canvas');
    
    sphere.addEventListener('mouseenter', () => {
        gsap.to(canvas, {
            scale: 1.2,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    sphere.addEventListener('mouseleave', () => {
        gsap.to(canvas, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Handle icon clicks
document.querySelector('.email-sphere').addEventListener('click', () => {
    window.location.href = 'mailto:your.email@example.com';
});

document.querySelector('.phone-sphere').addEventListener('click', () => {
    window.location.href = 'tel:9153077332';
});

document.querySelector('.linkedin-sphere').addEventListener('click', () => {
    window.open('https://www.linkedin.com/in/wasif-azim-390a3434a', '_blank');
});

// Text Animation Configuration
const TEXT_CONFIG = {
    texts: [
        "Frontend Developer",
        "Video Editor",
        "UI/UX Designer",
        "AI ML Enthusiast",
        "Backend Developer"
    ],
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000
};

class TypingAnimation {
    constructor(config) {
        this.config = config;
        this.element = null;
        this.currentIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.timeoutId = null;
        this.isAnimating = false;
    }

    init(elementSelector) {
        this.element = document.querySelector(elementSelector);
        if (!this.element) {
            console.error('Required element not found:', elementSelector);
            return false;
        }
        return true;
    }

    type() {
        if (!this.isAnimating) return;

        const currentFullText = this.config.texts[this.currentIndex];
        
        if (this.isDeleting) {
            this.currentText = currentFullText.substring(0, this.currentText.length - 1);
            this.element.textContent = this.currentText;
            
            if (this.currentText === '') {
                this.isDeleting = false;
                this.currentIndex = (this.currentIndex + 1) % this.config.texts.length;
                this.timeoutId = setTimeout(() => this.type(), this.config.typingSpeed);
            } else {
                this.timeoutId = setTimeout(() => this.type(), this.config.deletingSpeed);
            }
        } else {
            this.currentText = currentFullText.substring(0, this.currentText.length + 1);
            this.element.textContent = this.currentText;
            
            if (this.currentText === currentFullText) {
                this.timeoutId = setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, this.config.pauseDuration);
            } else {
                this.timeoutId = setTimeout(() => this.type(), this.config.typingSpeed);
            }
        }
    }

    start() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.type();
    }

    stop() {
        this.isAnimating = false;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typingAnimation = new TypingAnimation(TEXT_CONFIG);
    if (typingAnimation.init('.dynamic-text')) {
        typingAnimation.start();
    }
});

// Remove all typography-related JavaScript code

// Skills Progress Bar Animation
const skillsSection = document.querySelector('.skills');
const skillBoxes = document.querySelectorAll('.skill-box');

// Create progress bars for each skill
skillBoxes.forEach(box => {
    const percentage = box.querySelector('.skill-percentage').textContent;
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressBar.appendChild(progressFill);
    box.querySelector('.skill-info').appendChild(progressBar);
});

// Animate progress bars when in view (only once)
function animateProgressBars() {
    skillBoxes.forEach(box => {
        if (!box.dataset.animated) {  // Only animate if not already animated
            const percentage = parseInt(box.querySelector('.skill-percentage').textContent);
            const progressFill = box.querySelector('.progress-fill');
            progressFill.style.width = '0%';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            progressFill.style.width = `${percentage}%`;
                            box.dataset.animated = 'true';  // Mark as animated
                        }, 200);
                        observer.unobserve(box);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(box);
        }
    });
}

// Initialize progress bars animation only once when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateProgressBars();
});

// Navbar active state
function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Update active section on scroll
window.addEventListener('scroll', updateActiveSection);

// Update active section on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveSection();
});

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .zoom-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Theme Toggler
const themeToggler = document.querySelector('.theme-toggler');
const html = document.querySelector('html');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.dataset.theme = savedTheme;
    updateThemeIcon(savedTheme);
}

themeToggler.addEventListener('click', () => {
    const currentTheme = html.dataset.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggler.querySelector('i');
    if (theme === 'light') {
        icon.className = 'bx bxs-sun';
    } else {
        icon.className = 'bx bxs-moon';
    }
}

// Chatbot Configuration
const BACKEND_URL = 'https://portfolio-mr.onrender.com';  // Update this with your actual Render backend URL

async function sendMessage(message) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error('Failed to get response from server');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

// Chatbot Functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotDialog = document.querySelector('.chatbot-dialog');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const closeBtn = document.querySelector('.close-btn');
    const chatMessages = document.querySelector('.chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.querySelector('.send-btn');

    if (!chatbotToggle || !chatbotDialog) {
        console.error('Chatbot elements not found!');
        return;
    }

    // Toggle chatbot dialog
    chatbotToggle.addEventListener('click', () => {
        console.log('Chatbot toggle clicked');
        chatbotDialog.classList.add('active');
        chatbotToggle.style.display = 'none';
    });

    // Minimize chatbot
    minimizeBtn.addEventListener('click', () => {
        chatbotDialog.classList.remove('active');
        chatbotToggle.style.display = 'flex';
    });

    // Close chatbot
    closeBtn.addEventListener('click', () => {
        chatbotDialog.classList.remove('active');
        chatbotToggle.style.display = 'flex';
    });

    // Add message to chat
    function addMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        messageDiv.innerHTML = `
            ${type === 'bot' ? `<img src="images/chatbot_logo.webp" alt="Bot" class="message-avatar">` : ''}
            <div class="message-content">
                <p>${text}</p>
            </div>
            ${type === 'user' ? `<img src="images/user-avatar.png" alt="User" class="message-avatar">` : ''}
        `;
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message on button click
    sendBtn.addEventListener('click', async () => {
        const message = userInput.value.trim();
        if (message !== '') {
            // Add user message
            addMessage('user', message);
            
            // Clear input
            userInput.value = '';
            
            try {
                // Show typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'message bot-message typing';
                typingIndicator.innerHTML = `
                    <img src="images/chatbot_logo.webp" alt="Bot" class="message-avatar">
                    <div class="message-content">
                        <div class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                `;
                chatMessages.appendChild(typingIndicator);
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Make API call to Flask server
                const botResponse = await sendMessage(message);
                
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);
                
                // Add bot response
                addMessage('bot', botResponse);
            } catch (error) {
                console.error('Error:', error);
                addMessage('bot', 'I apologize, but I encountered an error. Please try again.');
            }
        }
    });

    // Send message on Enter key
    userInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message !== '') {
                await sendMessage(message);
            }
        }
    });

    console.log('Chatbot initialized successfully');
});

// Mobile Animation Handlers
function handleMobileAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe skill boxes
    document.querySelectorAll('.skill-box').forEach(box => {
        observer.observe(box);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

// Enhanced Mobile Menu
function enhanceMobileMenu() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
        
        // Animate links sequentially
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `slideInRight 0.3s ease forwards ${index * 0.1}s`;
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuIcon.contains(e.target) && !navbar.contains(e.target)) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });

    // Handle active state on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scroll with offset
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const offset = window.innerWidth <= 768 ? 80 : 100;
            
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
            
            window.scrollTo({
                top: targetSection.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });
}

// Initialize mobile features
document.addEventListener('DOMContentLoaded', () => {
    enhanceMobileMenu();
    if (window.innerWidth <= 768) {
        handleMobileAnimations();
    }
});

// Handle resize events
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        handleMobileAnimations();
    }
});
