/* --- APPLICATION EXECUTION MODULES --- */

// Initialize AOS animations Framework
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        once: true,
        mirror: false
    });
    
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
        animateCounter("reviewCount", 0, 216, 2000);
    }, 800);
});

// Sticky Navbar Transformation Framework Hook
window.onscroll = function() {
    handleWindowScrollPhysics();
};

function handleWindowScrollPhysics() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('btnBackToTop');
    const scrollProgress = document.getElementById('scroll-progress');
    
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressPercent = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.width = progressPercent + "%";

    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Menu Tab Category Sorting Module Engine
function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        if(btn.setAttribute('onclick', `filterMenu('${category}')`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    event.target.classList.add('active');

    items.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
        } else {
            if (item.classList.contains(category)) {
                item.style.display = 'block';
                setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => { item.style.display = 'none'; }, 300);
            }
        }
    });
}

// Live Numerical Counter Engine
function animateCounter(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + "+";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Custom Modal Image Lightbox Core Actions Logic
function openLightbox(imgUrl) {
    const targetImg = document.getElementById('lightboxTargetImg');
    targetImg.src = imgUrl;
    const myModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    myModal.show();
}

// Simple Form Submission Event Simulation Catch handler
function handleFormSubmit(event) {
    event.preventDefault();
    alert("Thank you for your submission! Our representative will reach out shortly.");
    document.getElementById('bakeryContactForm').reset();
}

// Load CMS Dishes dynamically
async function loadCMSDishes() {
    const container = document.getElementById('dynamic-menu-container');
    const repoOwner = "YOUR_GITHUB_USERNAME"; // Change this
    const repoName = "YOUR_REPO_NAME";       // Change this
    
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/dishes`);
        if (!response.ok) throw new Error("Failed to scan dishes directory");
        const files = await response.json();
        
        container.innerHTML = "";

        for (let file of files) {
            if (file.name.endsWith('.json')) {
                const dataResponse = await fetch(file.download_url);
                const dish = await dataResponse.json();
                
                const cardHTML = `
                    <div class="col-lg-3 col-md-6 menu-item ${dish.category}" data-aos="zoom-in" data-aos-duration="800">
                        <div class="product-card">
                            <div class="product-img-wrapper">
                                <img src="${dish.image}" alt="${dish.title}" class="product-img">
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">${dish.title}</h3>
                                <p class="product-desc">${dish.description}</p>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHTML;
            }
        }
        
        AOS.refresh();

    } catch (error) {
        console.error("Error loading CMS data:", error);
        container.innerHTML = `<div class="text-center col-12"><p class="text-danger">Failed to load the live menu.</p></div>`;
    }
}

// Call CMS load function
document.addEventListener("DOMContentLoaded", function() {
    loadCMSDishes();
});
