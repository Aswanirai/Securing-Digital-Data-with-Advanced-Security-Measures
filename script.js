// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a nav link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Feature Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const featureInfos = document.querySelectorAll('.feature-info');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            
            // Remove active class from all buttons and feature info
            tabBtns.forEach(item => item.classList.remove('active'));
            featureInfos.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked button and corresponding feature info
            btn.classList.add('active');
            document.getElementById(id).classList.add('active');
        });
    });
    
    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Auto slide testimonials
    let testimonialInterval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(nextIndex);
    }, 5000);
    
    // Click on dots to change testimonial
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            showTestimonial(index);
            
            // Restart auto slide after user interaction
            testimonialInterval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % testimonialCards.length;
                showTestimonial(nextIndex);
            }, 5000);
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
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
    
    window.addEventListener('scroll', setActiveLink);
    
    // Form validation
    const securityForm = document.getElementById('securityForm');
    
    if (securityForm) {
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Form submission success (in real application, this would send data to a server)
            alert('Thank you for your message! Our security team will contact you shortly.');
            securityForm.reset();
        });
    }
    
    // Animation for security dashboard
    const dashboardRows = document.querySelectorAll('.dashboard-row');
    
    dashboardRows.forEach((row, index) => {
        row.style.animation = `shimmer ${2 + index * 0.5}s infinite`;
    });
    
    // Add scroll reveal animations
    function revealOnScroll() {
        const elements = document.querySelectorAll('.service-card, .feature-tabs, .feature-content, .about-content, .contact-wrapper, .testimonial-slider');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    
    // Add initial animation styles
    const animElements = document.querySelectorAll('.service-card, .feature-tabs, .feature-content, .about-content, .contact-wrapper, .testimonial-slider');
    
    animElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
    });
});