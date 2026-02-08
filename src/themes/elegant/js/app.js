import { Analytics, FormSubmitter, AppConfig } from "@hashtagcms/web-sdk";


window.HashtagCms = window.HashtagCms || { configData: {} };
window.HashtagCms.FormSubmitter = new FormSubmitter();
window.HashtagCms.Newsletter = window.HashtagCms.FormSubmitter; // Legacy support
window.HashtagCms.Subscribe = window.HashtagCms.FormSubmitter; // Legacy support
window.HashtagCms.Analytics = new Analytics();
window.HashtagCms.AppConfig = new AppConfig();

/**
 * Elegant Theme - Modern Tech Aesthetic
 * 
 * Features:
 * - Smooth scroll animations
 * - Parallax effects
 * - Modern card interactions
 * - Dynamic Navbar
 */

class ElegantTheme {
    constructor() {
        this.initNewsletter();
        this.initSmoothScroll();
        this.initParallax();
        this.initCardAnimations();
        this.initNavbar();
        console.log('Elegant Theme loaded');
    }

    initNewsletter() {
        // Newsletter is already initialized globally as window.HashtagCms.Newsletter
    }

    initNavbar() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
            // Initial check
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            }
        }
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href !== '#' && href !== '#!') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');

        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;

                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        }
    }

    initCardAnimations() {
        const cards = document.querySelectorAll('.feature-card, .tech-card, .card'); // Added generic .card

        if (cards.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target); // Only animate once
                    }
                });
            }, {
                threshold: 0.1
            });

            cards.forEach(card => observer.observe(card));
        }
    }
}

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ElegantTheme());
} else {
    new ElegantTheme();
}
