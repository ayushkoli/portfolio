
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(15, 15, 35, 0.95)';
        } else {
            nav.style.background = 'rgba(15, 15, 35, 0.9)';
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Timeline bar fill on scroll
    function updateTimelineBar() {
        const timelineSection = document.querySelector('#projects .timeline');
        const bar = document.querySelector('.timeline-bar-fill');
        if (!timelineSection || !bar) return;
        const rect = timelineSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalHeight = rect.height;
        // Calculate how much of the timeline is visible
        let visible = 0;
        if (rect.top < windowHeight && rect.bottom > 0) {
            const visibleStart = Math.max(0, windowHeight - rect.bottom);
            const visibleEnd = Math.min(windowHeight, windowHeight - rect.top);
            visible = visibleEnd - visibleStart;
        }
        let percent = Math.max(0, Math.min(1, (windowHeight - rect.top) / (totalHeight + windowHeight)));
        if (rect.top > windowHeight) percent = 0;
        if (rect.bottom < 0) percent = 1;
        bar.style.height = (percent * 100) + '%';
    }
    window.addEventListener('scroll', updateTimelineBar);
    window.addEventListener('resize', updateTimelineBar);
    updateTimelineBar();

    // Nav progress bar scroll
    function updateNavProgressBar() {
        const bar = document.querySelector('.nav-progress-bar-fill');
        if (!bar) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) : 0;
        bar.style.width = (percent * 100) + '%';
    }
    window.addEventListener('scroll', updateNavProgressBar);
    window.addEventListener('resize', updateNavProgressBar);
    updateNavProgressBar();

    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, idx) => {
        card.classList.remove('slide-in-left', 'slide-in-right'); // reset
        // Alternate left/right
        card.dataset.slide = (idx % 2 === 0) ? 'left' : 'right';
        card.style.animationDelay = `${idx * 0.12}s`;
    });

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                if (card.dataset.slide === 'left') {
                    card.classList.add('slide-in-left');
                } else {
                    card.classList.add('slide-in-right');
                }
                projectObserver.unobserve(card); // Animate only once
            }
        });
    }, { threshold: 0.15 });

    projectCards.forEach(card => projectObserver.observe(card));

    // Light/Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const sunIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    const moonIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 0 1 12.21 3a7 7 0 1 0 8.79 9.79z" stroke="currentColor" stroke-width="2" fill="none"/></svg>';

    function setTheme(mode) {
        if (mode === 'light') {
            document.body.classList.add('light-mode');
            themeToggleIcon.innerHTML = moonIcon;
        } else {
            document.body.classList.remove('light-mode');
            themeToggleIcon.innerHTML = sunIcon;
        }
    }
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'light' ? 'light' : 'dark');

    themeToggle.addEventListener('click', function() {
        const isLight = document.body.classList.toggle('light-mode');
        setTheme(isLight ? 'light' : 'dark');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}); 