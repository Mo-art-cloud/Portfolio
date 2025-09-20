 // Cursor follower
        const cursorFollower = document.getElementById('cursorFollower');
        
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });

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

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.3)';
            }
        });

        // Animate skill bars on scroll
        const skillBars = document.querySelectorAll('.skill-progress');
        const animateSkills = () => {
            skillBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }
            });
        };

        window.addEventListener('scroll', animateSkills);
        window.addEventListener('load', animateSkills);

        // Add hover effects to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click effects to buttons
        const buttons = document.querySelectorAll('.btn, .project-link, .social-link');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('div');
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    left: ${x}px;
                    top: ${y}px;
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Parallax effect for floating orbs
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const orbs = document.querySelectorAll('.floating-orb');
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animations
        document.querySelectorAll('.project-card, .skill-item, .section-title').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });

        // Add fadeInUp animation
        const animationStyle = document.createElement('style');
        animationStyle.textContent += `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(animationStyle);

        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(0, 0, 0, 0.9)';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '1rem';
                navLinks.style.backdropFilter = 'blur(20px)';
            }
        });

     const heroTitle = document.querySelector('.hero h1');
const originalText = heroTitle.textContent;
heroTitle.textContent = '';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:',.<>/?";

let iteration = 0;
const maxIterations = 10; // how many random cycles before revealing each letter
let currentIndex = 0;

function hackerType() {
  if (currentIndex < originalText.length) {
    let displayText = '';

    for (let i = 0; i < originalText.length; i++) {
      if (i < currentIndex) {
        // letters already revealed
        displayText += originalText[i];
      } else if (i === currentIndex) {
        // current letter cycles through random chars
        displayText += letters.charAt(Math.floor(Math.random() * letters.length));
      } else {
        // letters not yet revealed show space or empty
        displayText += ' ';
      }
    }

    heroTitle.textContent = displayText;

    iteration++;

    if (iteration > maxIterations) {
      // reveal the actual letter and move to next
      currentIndex++;
      iteration = 0;
    }

    setTimeout(hackerType, 50); // speed of random letter cycling
  } else {
    // fully revealed text
    heroTitle.textContent = originalText;
  }
}

// start effect after page load
window.addEventListener('load', () => {
  setTimeout(hackerType, 500);
});

        // Add floating animation to social links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach((link, index) => {
            link.addEventListener('mouseenter', () => {
                link.style.animation = `float 0.5s ease-in-out`;
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.animation = '';
            });
        });

        // Scroll to top button
        const scrollToTop = document.createElement('div');
        scrollToTop.innerHTML = '↑';
        scrollToTop.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;

        document.body.appendChild(scrollToTop);

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTop.style.opacity = '1';
                scrollToTop.style.transform = 'translateY(0)';
            } else {
                scrollToTop.style.opacity = '0';
                scrollToTop.style.transform = 'translateY(20px)';
            }
        });

        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        scrollToTop.addEventListener('mouseenter', () => {
            scrollToTop.style.transform = 'translateY(-5px) scale(1.1)';
            scrollToTop.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
        });

        scrollToTop.addEventListener('mouseleave', () => {
            scrollToTop.style.transform = 'translateY(0) scale(1)';
            scrollToTop.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        });

        // Add particles effect
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.style.cssText = 'position: fixed; width: 4px; height: 4px; background: rgba(78, 205, 196, 0.6); border-radius: 50%; pointer-events: none; z-index: 1; animation: particle-float 3s linear forwards;';
            
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        };

        // Add particle animation
        const particleStyle = document.createElement('style');
        particleStyle.textContent = '@keyframes particle-float { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; } }';
        document.head.appendChild(particleStyle);

        // Create particles periodically
        setInterval(createParticle, 2000);

        // Add glitch effect to title on hover
        const title = document.querySelector('.hero h1');
        const originalTitle = title.textContent;
        
        title.addEventListener('mouseenter', () => {
            let iterations = 0;
            const glitchInterval = setInterval(() => {
                title.textContent = originalTitle
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalTitle[index];
                        }
                        return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                    })
                    .join('');
                
                iterations += 1/3;
                
                if (iterations >= originalTitle.length) {
                    clearInterval(glitchInterval);
                    title.textContent = originalTitle;
                }
            }, 30);
        });

        console.log('🎉 Portfolio loaded successfully!');

        function openCertificate(filePath) {
  document.getElementById('certificateFrame').src = filePath;
  document.getElementById('certificateModal').style.display = 'flex';
}

function closeCertificate() {
  document.getElementById('certificateModal').style.display = 'none';
  document.getElementById('certificateFrame').src = "";
}