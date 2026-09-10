// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const html = document.documentElement;

// Check for saved dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    html.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '☀️';
}

darkModeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('darkMode', newTheme === 'dark');
    darkModeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
});

// Animated Counter for Stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 40);
}

// Intersection Observer for Counters
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll Animation - Fade in and slide up
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.querySelectorAll('.skill-card, .project-card, .education-item, .involvement-card, .focus-card, .interests-column, .about-content').forEach(el => {
    if (!el.style.opacity) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    observer.observe(el);
});

// Animated Skill Bars on Scroll
const skillBars = document.querySelectorAll('.skill-fill');
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillBarObserver.observe(bar));

// Create Floating Particles
function createParticles() {
    const container = document.querySelector('.particles-container');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const tx = (Math.random() - 0.5) * 100;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.bottom = '-10px';
        particle.style.setProperty('--duration', duration + 's');
        particle.style.setProperty('--tx', tx + 'px');

        container.appendChild(particle);
    }
}

createParticles();

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Add stagger to nav links on scroll
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach((link, index) => {
    link.style.setProperty('--stagger', index);
});
