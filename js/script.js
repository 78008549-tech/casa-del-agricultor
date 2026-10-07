document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800); 
    });

    AOS.init({
        once: true,
        offset: 100,
        duration: 800
    });

    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const mobileMenu = document.getElementById("mobile-menu");
    const navBar = document.getElementById("navbar");

    mobileMenu.addEventListener("click", () => {
        navBar.classList.toggle("active");
    });

    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            navBar.classList.remove("active"); 
            const targetId = this.getAttribute("href").substring(1);
            if(targetId === "inicio") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    const textToType = "Desde 2020 impulsando el desarrollo del campo en la región central del país.";
    const typewriterElement = document.getElementById('typewriter');
    let i = 0;
    
    function typeWriter() {
        if (i < textToType.length) {
            typewriterElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 50); 
        }
    }
    
    setTimeout(typeWriter, 1500);

    const counters = document.querySelectorAll('.counter');
    const speed = 100;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target + (target > 100 ? "+" : ""); 
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 }); 

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});