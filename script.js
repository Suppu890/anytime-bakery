/* --- APPLICATION EXECUTION MODULES --- */

// Initialize Framework Components on Page Load
document.addEventListener("DOMContentLoaded", function() {
    // 1. Trigger Animation Library Framework
    AOS.init({
        once: true,
        mirror: false
    });
    
    // 2. Clear Screen Preloader Sequence Cleanly
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => { 
            preloader.style.display = 'none'; 
        }, 500);
        
        // 3. Initiate Live Incremental Counter Modules
        animateCounter("reviewCount", 0, 216, 2000);
    }, 800);

    // 4. Load JSON Content via CMS Portal Hook Automatically
    loadCMSDishes();
});

// Window Scroll Animation Tracking Engine
window.onscroll = function() {
    handleWindowScrollPhysics();
};

function handleWindowScrollPhysics() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('btnBackToTop');
    const scrollProgress = document.getElementById('scroll-progress');
    
    // Calculate page visibility progress height percentages
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressPercent = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.width = progressPercent + "%";

    // Toggle scroll configurations on Glassmorphism Nav Header
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Toggle view states on Back-to-Top trigger button
    if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Back to Top smooth scroll sequence execution
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Menu Tab Category Filtering Controller
function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Sync Button Selection Indicators
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Toggle card scale layouts dynamically
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

// Live Graphical Value Increment Engine
function animateCounter(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
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

// Modal Lightbox Preview Handler Logic
function openLightbox(imgUrl) {
    const targetImg = document.getElementById('lightboxTargetImg');
    if (!targetImg) return;
    targetImg.src = imgUrl;
    const myModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    myModal.show();
}

// Client Form Submission Event Route Capture
function handleFormSubmit(event) {
    event.preventDefault();
    alert("Thank you for your submission! Our team will reach out shortly regarding your custom bakery inquiry.");
    document.getElementById('bakeryContactForm').reset();
}

// Dynamic Fetch Integration mapping files straight from GitHub CMS Folders
async function loadCMSDishes() {
    const container = document.getElementById('dynamic-menu-container');
    if (!container) return;

    // REMINDER: Replace these placeholders with your real handles to activate the live feed
    const repoOwner = "suppu890"; 
    const repoName = "anytime-bakery";       
    
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/dishes`);
        if (!response.ok) throw new Error("Target collection directory initialization failed");
        
        const files = await response.json();
        container.innerHTML = ""; // Wipe loading placeholder layouts cleanly

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
        
        // Instruct AOS to re-scan layout depth for new structural nodes
        AOS.refresh();

    } catch (error) {
        console.error("Error fetching dynamic CMS nodes:", error);
        container.innerHTML = `
            <div class="text-center col-12 my-4">
                <p class="text-muted">Enter active dish files into your dashboard data folder to display dynamic dishes here.</p>
            </div>`;
    }
}
