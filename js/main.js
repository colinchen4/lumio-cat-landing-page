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

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Google Sheets Email Collection
// IMPORTANT: Replace this URL with your Google Apps Script Web App URL
// See GOOGLE_SHEETS_SETUP.md for instructions
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzEvMitxne3jiCHTh6pGwlLeaulyBapj8nEvP2kr-Q3Kb-7z7Y_Mi2RC-rZ7dZpnVg7uQ/exec';

document.getElementById('emailForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const emailInput = document.getElementById('emailInput');
    const submitButton = document.querySelector('.email-submit');
    const successMessage = document.getElementById('successMessage');
    const email = emailInput.value;

    if (!email) return;

    // Disable button and show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        // Check if URL is configured
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            // Fallback to localStorage if not configured
            console.warn('Google Script URL not configured. Saving to localStorage.');
            localStorage.setItem('lumiocat_email', email);
        } else {
            // Send to Google Sheets
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });
        }

        // Show success
        successMessage.style.display = 'block';
        emailInput.value = '';

        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 8000);

    } catch (error) {
        console.error('Error submitting email:', error);
        alert('Something went wrong. Please try again.');
    } finally {
        // Restore button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// Sticky CTA visibility on scroll (show after scrolling past hero)
const stickyCta = document.querySelector('.sticky-cta');
const heroSection = document.querySelector('.hero');

if (stickyCta && heroSection) {
    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        if (window.scrollY > heroBottom - 100) {
            stickyCta.style.display = 'flex';
        } else {
            stickyCta.style.display = 'none';
        }
    });
}

// Lumio-themed particle effects (reduced for performance)
function createLumioParticle() {
    // Only create particles on larger screens
    if (window.innerWidth < 768) return;

    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        pointer-events: none;
        font-size: 24px;
        z-index: 9999;
        animation: lumioShine 4s ease-out forwards;
    `;

    const lumioEmojis = ['\u{1F4A1}', '\u{2728}', '\u{1F31F}', '\u{2B50}', '\u{1F4AB}'];
    particle.textContent = lumioEmojis[Math.floor(Math.random() * lumioEmojis.length)];
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 4000);
}

// Create Lumio particles occasionally (reduced frequency)
setInterval(createLumioParticle, 6000);

// Add brilliant glow effect on buttons
document.querySelectorAll('.glow-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create a temporary visual effect for "brilliance"
        const glow = document.createElement('div');
        glow.textContent = '\u{1F4A1}\u{2728}';
        glow.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            color: #ffb74d;
            pointer-events: none;
            z-index: 10000;
            animation: brilliantGlow 1s ease-out forwards;
        `;

        document.body.appendChild(glow);

        setTimeout(() => glow.remove(), 1000);
    });
});

// Video placeholder click handler
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        // Placeholder - replace with actual video embed when available
        alert('Demo video coming soon! Subscribe to get notified when it\'s ready.');
    });
}

// Pricing button click tracking
document.querySelectorAll('.pricing-button:not(.disabled)').forEach(button => {
    button.addEventListener('click', function(e) {
        // Track which reward tier was clicked
        const card = this.closest('.pricing-card');
        const tierName = card.querySelector('h3')?.textContent || 'Unknown';
        console.log('Reward tier clicked:', tierName);

        // You can add analytics tracking here
        // gtag('event', 'click', { event_category: 'CTA', event_label: tierName });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Initialize - make sure sticky CTA is hidden on load
if (stickyCta) {
    stickyCta.style.display = 'none';
}
