// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Highlighting & Scroll Animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.25,
    rootMargin: "-100px 0px -50px 0px" // Adjust to trigger slightly earlier/later
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Active Nav Link
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
        
        // Scroll Animation
        if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
            elements.forEach(el => {
                el.classList.add('visible');
            });
            
            // Trigger Skills Animation if in Skills section
            if (entry.target.id === 'skills') {
                animateSkills();
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// One-time Skills Animation
let skillsAnimated = false;
function animateSkills() {
    if (skillsAnimated) return;
    
    const progressLines = document.querySelectorAll('.progress-line');
    progressLines.forEach(line => {
        const width = line.getAttribute('data-width');
        const span = line.querySelector('span');
        span.style.width = width;
    });
    skillsAnimated = true;
}

// Initial check for animations on load (for Hero section mainly)
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('#hero .fade-in');
    heroElements.forEach(el => el.classList.add('visible'));
});
