// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });
    
    // Intersection Observer for card animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.fact-card, .species-card, .myth-card');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Add random spider facts that appear on scroll
    const spiderFacts = [
        "🕷️ Did you know? Some spiders can live for over 20 years!",
        "🕸️ Amazing fact: Spider webs can capture particles smaller than their strand width!",
        "👀 Incredible: Jumping spiders have better color vision than many mammals!",
        "🌟 Fun fact: Some spiders can change color to match their environment!",
        "💨 Wow: Ballooning spiders can travel hundreds of miles through the air!"
    ];
    
    let factIndex = 0;
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Show random fact every 500px of scrolling
        if (currentScrollY > lastScrollY + 500) {
            showRandomFact();
            lastScrollY = currentScrollY;
            factIndex++;
        }
    });
    
    function showRandomFact() {
        if (factIndex >= spiderFacts.length) return;
        
        const fact = spiderFacts[factIndex];
        const factElement = document.createElement('div');
        factElement.className = 'floating-fact';
        factElement.textContent = fact;
        factElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 107, 107, 0.95);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            z-index: 2000;
            transform: translateX(100%);
            transition: transform 0.5s ease;
            max-width: 300px;
            font-size: 0.9rem;
        `;
        
        document.body.appendChild(factElement);
        
        // Animate in
        setTimeout(() => {
            factElement.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            factElement.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (factElement.parentNode) {
                    factElement.parentNode.removeChild(factElement);
                }
            }, 500);
        }, 4000);
    }
    
    // Add click effect to cards
    const allCards = document.querySelectorAll('.fact-card, .species-card, .myth-card');
    allCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Konami code easter egg for spider lovers
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            spiderEasterEgg();
            konamiCode = [];
        }
    });
    
    function spiderEasterEgg() {
        // Create multiple animated spiders
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createAnimatedSpider();
            }, i * 200);
        }
        
        // Show special message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            z-index: 3000;
            font-size: 1.2rem;
        `;
        message.innerHTML = `
            <h3>🕷️ SPIDER MASTER! 🕷️</h3>
            <p>You've unlocked the secret spider appreciation mode!</p>
            <small>You clearly love spiders as much as we do!</small>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 1s ease';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 1000);
        }, 3000);
    }
    
    function createAnimatedSpider() {
        const spider = document.createElement('div');
        spider.textContent = '🕷️';
        spider.style.cssText = `
            position: fixed;
            font-size: 2rem;
            z-index: 2500;
            pointer-events: none;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            animation: spiderMove 3s linear forwards;
        `;
        
        document.body.appendChild(spider);
        
        setTimeout(() => {
            if (spider.parentNode) {
                spider.parentNode.removeChild(spider);
            }
        }, 3000);
    }
    
    // Add CSS for spider animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spiderMove {
            0% {
                transform: rotate(0deg) translateY(0px);
            }
            100% {
                transform: rotate(360deg) translateY(-100px);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation-play-state: running !important;
        }
    `;
    document.head.appendChild(style);
});

// Add some spider web cursor trail effect
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) { // Only occasionally create web points
        const webPoint = document.createElement('div');
        webPoint.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: webFade 2s ease-out forwards;
        `;
        
        document.body.appendChild(webPoint);
        
        setTimeout(() => {
            if (webPoint.parentNode) {
                webPoint.parentNode.removeChild(webPoint);
            }
        }, 2000);
    }
});

// CSS for web fade animation
const webStyle = document.createElement('style');
webStyle.textContent = `
    @keyframes webFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(3);
        }
    }
`;
document.head.appendChild(webStyle);