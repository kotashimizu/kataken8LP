// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Countdown timer
    function updateCountdown() {
        const earlyBirdEnd = new Date('2025-08-05T23:59:59');
        const now = new Date();
        const timeDiff = earlyBirdEnd - now;
        
        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            if (days > 0) {
                document.getElementById('countdown').textContent = `残り${days}日`;
            } else if (hours > 0) {
                document.getElementById('countdown').textContent = `残り${hours}時間`;
            } else {
                document.getElementById('countdown').textContent = '残りわずか';
            }
        } else {
            document.getElementById('countdown').textContent = '早割終了';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.benefit-card, .timeline-item, .pricing-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // CTA button click tracking
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track click event (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: 'Seminar Apply Button'
                });
            }
        });
    });

    // Banner image hover effect
    const bannerImage = document.querySelector('.banner-image');
    if (bannerImage) {
        bannerImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) rotateY(2deg)';
        });
        
        bannerImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('early-bird')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = '';
            }
        });
    });

    // Benefit cards stagger animation
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        benefitObserver.observe(card);
    });

    // Timeline item progressive reveal
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.8s ease';
        timelineObserver.observe(item);
    });


    // Form validation and enhancement (if form is added later)
    function enhanceFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Basic validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
        }
        
        // Update field appearance
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Loading animation for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = '読み込み中...';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    });

    // Keyboard navigation enhancements
    document.addEventListener('keydown', function(e) {
        // Escape key closes FAQ items
        if (e.key === 'Escape') {
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
        }
        
        // Enter key activates focused CTA buttons
        if (e.key === 'Enter' && document.activeElement.classList.contains('cta-button')) {
            document.activeElement.click();
        }
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
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

    // Optimize scroll performance
    const debouncedScroll = debounce(() => {
        // Any additional scroll-based animations can go here
    }, 16); // ~60fps

    window.addEventListener('scroll', debouncedScroll);

    // Preload critical images (if any are added)
    function preloadImages(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // Add loading states to buttons
    function addLoadingState(button) {
        button.classList.add('loading');
        button.setAttribute('disabled', 'disabled');
        
        const originalText = button.textContent;
        button.innerHTML = '<span class="spinner"></span> 処理中...';
        
        return () => {
            button.classList.remove('loading');
            button.removeAttribute('disabled');
            button.textContent = originalText;
        };
    }

    // Initialize any tooltips (if needed)
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.dataset.tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });

    function showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.top = rect.top - 40 + 'px';
        tooltip.style.left = rect.left + (rect.width / 2) + 'px';
        tooltip.style.transform = 'translateX(-50%)';
        
        document.body.appendChild(tooltip);
        
        // Animate in
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
        }, 10);
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Console log for development
    console.log('🏥 肩関節セミナーLP - JavaScript loaded successfully!');
    console.log('📅 Seminar Date: August 26, 2025');
    console.log('💰 Early Bird Price: ¥2,600');
});

// Additional utility functions
const utils = {
    // Format date
    formatDate: (date) => {
        return new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }).format(date);
    },
    
    // Format price
    formatPrice: (price) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY',
            maximumFractionDigits: 0
        }).format(price);
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Error handling
window.addEventListener('error', function(e) {
    console.warn('JavaScript error detected:', e.error);
});

// Service Worker registration (if needed for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}