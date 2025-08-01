// Variáveis globais
let currentLang = 'pt';
const translations = {
    pt: {
        'Desenvolvedor Full Stack': 'Desenvolvedor Full Stack',
        'Criador de Soluções': 'Criador de Soluções',
        'Apaixonado por Código': 'Apaixonado por Código',
        'Estudante Dedicado': 'Estudante Dedicado'
    },
    en: {
        'Desenvolvedor Full Stack': 'Full Stack Developer',
        'Criador de Soluções': 'Solution Creator',
        'Apaixonado por Código': 'Code Enthusiast',
        'Estudante Dedicado': 'Dedicated Student'
    }
};

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Language toggle
const langToggle = document.getElementById('lang-toggle');
const langText = langToggle.querySelector('.lang-text');

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    langText.textContent = currentLang === 'pt' ? 'EN' : 'PT';
    document.documentElement.setAttribute('lang', currentLang === 'pt' ? 'pt-br' : 'en');
    
    // Update all translatable elements
    updateLanguage();
});

function updateLanguage() {
    const elements = document.querySelectorAll('[data-pt][data-en]');
    elements.forEach(element => {
        const text = currentLang === 'pt' ? element.getAttribute('data-pt') : element.getAttribute('data-en');
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.innerHTML = text;
        }
    });
    
    // Update typing animation texts
    updateTypingTexts();
}

function updateTypingTexts() {
    const currentTexts = Object.keys(translations[currentLang]);
    texts.length = 0;
    texts.push(...Object.values(translations[currentLang]));
    
    // Reset typing animation
    textIndex = 0;
    charIndex = 0;
    typingText.textContent = '';
    typeText();
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Typing animation
const typingText = document.querySelector('.typing-text');
let texts = Object.values(translations[currentLang]);
let textIndex = 0;
let charIndex = 0;

function typeText() {
    if (charIndex < texts[textIndex].length) {
        typingText.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typingText.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 500);
    }
}

// Start typing animation
typeText();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and elements with animation classes
document.querySelectorAll('section, .fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        const alertMsg = currentLang === 'pt' ? 'Por favor, preencha todos os campos.' : 'Please fill in all fields.';
        alert(alertMsg);
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const loadingText = currentLang === 'pt' ? '<span>Enviando...</span>' : '<span>Sending...</span>';
    
    submitBtn.innerHTML = loadingText;
    submitBtn.disabled = true;
    
    setTimeout(() => {
        const successMsg = currentLang === 'pt' ? 
            'Mensagem enviada com sucesso! Entrarei em contato em breve.' : 
            'Message sent successfully! I will get in touch soon.';
        alert(successMsg);
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.hero-text', {
            delay: 300,
            duration: 1000,
            origin: 'left',
            distance: '50px'
        });
        
        ScrollReveal().reveal('.code-window', {
            delay: 600,
            duration: 1000,
            origin: 'right',
            distance: '50px'
        });
        
        ScrollReveal().reveal('.project-card', {
            delay: 200,
            duration: 800,
            interval: 200,
            origin: 'bottom',
            distance: '30px'
        });
        
        ScrollReveal().reveal('.skill-category', {
            delay: 300,
            duration: 800,
            interval: 200,
            origin: 'bottom',
            distance: '30px'
        });
    }
});

// Add some interactive hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    highlightNavLink();
}, 100));

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

console.log('🚀 Portfólio carregado com sucesso!');
console.log('🌙 Modo escuro disponível!');
console.log('🌍 Versão em inglês disponível!');