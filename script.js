/**
 * Humberto Texis Garza - Sitio Web Profesional
 * JavaScript para interacciones y animaciones
 *
 * Animaciones mejoradas con enfoque en rendimiento y UX premium
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // COUNTER ANIMATION FUNCTION (Optimized)
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            start = target * easeOutQuart;

            if (progress < 1) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ========================================
    // HEADER SCROLL EFFECT (Enhanced)
    // ========================================
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleScroll() {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Add scrolled class when scrolled down
                if (lastScrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });

            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ========================================
    // MOBILE MENU
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // SCROLL ANIMATIONS (Enhanced Intersection Observer)
    // ========================================

    // Main fade-in observer with stagger support
    const fadeObserverOptions = {
        root: null,
        rootMargin: '-50px 0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // Observe service cards and sections
    document.querySelectorAll('.service-card, .service-card-extended, .about-content, .contact-item').forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // ========================================
    // SECTION TITLE ANIMATIONS
    // ========================================
    const titleObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.2
    };

    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                titleObserver.unobserve(entry.target);
            }
        });
    }, titleObserverOptions);

    document.querySelectorAll('.section-title').forEach(title => {
        titleObserver.observe(title);
    });

    // ========================================
    // STAT ITEMS ANIMATION (Benefits section)
    // ========================================
    const statObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                statObserver.unobserve(entry.target);
            }
        });
    }, statObserverOptions);

    document.querySelectorAll('.stat-item').forEach(stat => {
        statObserver.observe(stat);
    });

    // ========================================
    // VALUE ITEMS ANIMATION (About section)
    // ========================================
    const valueObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const valueObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                valueObserver.unobserve(entry.target);
            }
        });
    }, valueObserverOptions);

    document.querySelectorAll('.value-item').forEach(item => {
        valueObserver.observe(item);
    });

    // ========================================
    // CONTACT FORM ANIMATION
    // ========================================
    const formObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                formObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const contactFormWrapper = document.querySelector('.contact-form-wrapper');
    if (contactFormWrapper) {
        formObserver.observe(contactFormWrapper);
    }

    // ========================================
    // FOOTER ANIMATION
    // ========================================
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const footer = document.querySelector('.footer');
    if (footer) {
        footerObserver.observe(footer);
    }

    // ========================================
    // COUNTER ANIMATION FOR BENEFITS
    // ========================================
    const statsSection = document.querySelector('.benefits-stats');
    let statsAnimated = false;

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    const statNumbers = document.querySelectorAll('.stat-number');

                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateCounter(stat, target, 2000);
                    });
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ========================================
    // CONTACT FORM VALIDATION
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');

            // Clear previous errors
            clearErrors([name, email, phone, message]);

            // Validate Name
            if (!name.value.trim()) {
                showError(name, 'El nombre es requerido');
                isValid = false;
            } else if (name.value.trim().length < 2) {
                showError(name, 'El nombre debe tener al menos 2 caracteres');
                isValid = false;
            }

            // Validate Email
            if (!email.value.trim()) {
                showError(email, 'El correo electrónico es requerido');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Ingrese un correo electrónico válido');
                isValid = false;
            }

            // Validate Phone (optional but validate if present)
            if (phone.value.trim() && !isValidPhone(phone.value)) {
                showError(phone, 'Ingrese un teléfono válido');
                isValid = false;
            }

            // Validate Message
            if (!message.value.trim()) {
                showError(message, 'El mensaje es requerido');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'El mensaje debe tener al menos 10 caracteres');
                isValid = false;
            }

            // If valid, show success message
            if (isValid) {
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }

    // Helper: Clear errors
    function clearErrors(fields) {
        fields.forEach(field => {
            field.classList.remove('error', 'success');
            const existingError = field.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        });
    }

    // Helper: Show error
    function showError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }

    // Helper: Validate Email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Helper: Validate Phone (Mexican format)
    function isValidPhone(phone) {
        // Remove spaces and dashes
        const cleaned = phone.replace(/[\s\-]/g, '');
        // Check if it's 10 digits
        const re = /^\d{10}$/;
        return re.test(cleaned);
    }

    // Helper: Show success message
    function showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div style="background: #27ae60; color: white; padding: 20px 40px; border-radius: 8px; box-shadow: 0 4px 20px rgba(39, 174, 96, 0.4); text-align: center; position: fixed; top: 100px; left: 50%; transform: translateX(-50%); z-index: 9999; animation: slideDown 0.3s ease;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="margin: 0 auto 10px;">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="white" stroke-width="2"/>
                    <polyline points="22 4 12 14.01 9 11.01" stroke="white" stroke-width="2"/>
                </svg>
                <p style="font-weight: 600;">¡Mensaje enviado con éxito!</p>
                <p style="font-size: 0.9rem; opacity: 0.9;">Me pondré en contacto pronto.</p>
            </div>
        `;

        // Add animation styles if not present
        if (!document.getElementById('success-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'success-animation-styles';
            style.textContent = `
                @keyframes slideDown {
                    from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 1; transform: translateX(-50%) translateY(0); }
                    to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // ========================================
    // ACTIVE NAV LINK HIGHLIGHT
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleScroll();
        highlightNavLink();
    });

    // ========================================
    // LAZY LOADING FOR IMAGES (future use)
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========================================
    // CONSOLE LOGO (Easter Egg)
    // ========================================
    console.log('%c Humberto Texis Garza ', 'background: linear-gradient(135deg, #D4AF37, #F4D03F, #D4AF37); color: #0d1b2a; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Maestro en Impuestos | Cédula: 13353622 ', 'color: #D4AF37; font-size: 14px;');
    console.log('%c Sitio web desarrollado con estándares profesionales ', 'color: #8a8a8a; font-size: 12px;');

});

// ========================================
// PAGE LOAD ANIMATION
// ========================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ========================================
// TESTIMONIALS CAROUSEL
// Auto-rota la tarjeta destacada cada 5 s.
// En móvil muestra una sola tarjeta con fade.
// En desktop destaca con borde dorado + scale.
// ========================================
document.addEventListener('DOMContentLoaded', function () {

    const cards   = document.querySelectorAll('.testimonial-card');
    const dots    = document.querySelectorAll('.testimonials-dot');
    const wrapper = document.querySelector('.testimonials-wrapper');

    if (!cards.length) return; // Salir si no existe la sección

    let currentIndex = 0;
    let autoInterval  = null;

    /** Mueve el destacado a la tarjeta indicada */
    function goToTestimonial(index) {
        // Quitar estado actual
        cards[currentIndex].classList.remove('featured');
        dots[currentIndex].classList.remove('active');

        // Calcular nuevo índice con wrapping circular
        currentIndex = (index + cards.length) % cards.length;

        // Aplicar nuevo estado
        cards[currentIndex].classList.add('featured');
        dots[currentIndex].classList.add('active');
    }

    /** Inicia la rotación automática */
    function startAuto() {
        autoInterval = setInterval(function () {
            goToTestimonial(currentIndex + 1);
        }, 5000);
    }

    /** Detiene la rotación automática */
    function stopAuto() {
        clearInterval(autoInterval);
    }

    // Clic en dots: navegar y reiniciar timer
    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            goToTestimonial(i);
            stopAuto();
            startAuto();
        });
    });

    // Pausar en hover sobre el área de testimonios (desktop)
    if (wrapper) {
        wrapper.addEventListener('mouseenter', stopAuto);
        wrapper.addEventListener('mouseleave', startAuto);
    }

    // Arrancar auto-rotación
    startAuto();
});

// ========================================
// PREVENT DOUBLE SUBMISSION
// ========================================
let isSubmitting = false;

document.addEventListener('submit', function(e) {
    if (isSubmitting && e.target.id === 'contactForm') {
        e.preventDefault();
    }
    isSubmitting = true;
    setTimeout(() => { isSubmitting = false; }, 3000);
}, true);
