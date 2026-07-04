// DEFAULT PRE-LOADED BAKERY PRODUCTS
const defaultDishes = [
    { id: 1, title: "Premium Birthday Cakes", category: "bakery", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600", description: "Custom gourmet cakes crafted for birthdays and elite celebrations." },
    { id: 2, title: "Rich Cream Pastries", category: "bakery", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600", description: "Mouth-watering cream slices available in dense chocolate variants." },
    { id: 3, title: "Cheesy Pan Pizzas", category: "fastfood", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600", description: "Freshly pulled dough bases loaded with robust sauces and mozzarella." },
    { id: 4, title: "Gourmet Grilled Burgers", category: "fastfood", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600", description: "Crisp seasoned vegetable patties layered inside soft brioche buns." }
];

// INITIALIZATION PIPELINE
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({ once: true, mirror: false });
    
    // Clear Preloader Screen
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
        animateCounter("reviewCount", 0, 216, 2000);
    }, 800);

    // Initialize Local Storage Menu
    if (!localStorage.getItem('bakeryMenu')) {
        localStorage.setItem('bakeryMenu', JSON.stringify(defaultDishes));
    }
    
    renderMenuCardUI('all');
});

// CORE MENU DISPLAY RENDERING ENGINE
function renderMenuCardUI(filterCategory = 'all') {
    const container = document.getElementById('dynamic-menu-container');
    if (!container) return;
    
    const currentMenu = JSON.parse(localStorage.getItem('bakeryMenu')) || [];
    container.innerHTML = "";

    currentMenu.forEach(dish => {
        if (filterCategory === 'all' || dish.category === filterCategory) {
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
    });
    AOS.refresh();
}

// SECURE ADMIN POPUP PASSWORD TRIGGER
function triggerAdminLogin() {
    const accessKey = prompt("🔒 Enter Secure Admin Password Workspace Access:");
    
    // Master secret entry password code
    if (accessKey === "Bhopal78380") {
        alert("🔓 Access Granted. Opening Bakery Admin Dashboard Panel...");
        populateAdminTable();
        const controlPanel = new bootstrap.Modal(document.getElementById('adminControlPanelModal'));
        controlPanel.show();
    } else if (accessKey !== null) {
        alert("❌ Invalid Admin Password. Entry Request Terminated.");
    }
}

// DASHBOARD: ADD NEW DISH FUNCTION
function handleAdminAddDish(event) {
    event.preventDefault();
    
    const title = document.getElementById('adminDishTitle').value;
    const category = document.getElementById('adminDishCategory').value;
    const image = document.getElementById('adminDishImage').value;
    const description = document.getElementById('adminDishDesc').value;

    const currentMenu = JSON.parse(localStorage.getItem('bakeryMenu')) || [];
    
    const newDish = {
        id: Date.now(),
        title: title,
        category: category,
        image: image,
        description: description
    };

    currentMenu.push(newDish);
    localStorage.setItem('bakeryMenu', JSON.stringify(currentMenu));
    
    document.getElementById('adminAddDishForm').reset();
    populateAdminTable();
    renderMenuCardUI('all');
    alert("✨ Success! New dish appended live onto the public storefront.");
}

// DASHBOARD: DELETE DISH FUNCTION
function deleteMenuNode(id) {
    if (confirm("Are you sure you want to delete this menu product completely?")) {
        let currentMenu = JSON.parse(localStorage.getItem('bakeryMenu')) || [];
        currentMenu = currentMenu.filter(item => item.id !== id);
        localStorage.setItem('bakeryMenu', JSON.stringify(currentMenu));
        populateAdminTable();
        renderMenuCardUI('all');
    }
}

// POPULATE DASHBOARD GRID TABLE VIEW
function populateAdminTable() {
    const tbody = document.getElementById('adminDishTableBody');
    if (!tbody) return;
    
    const currentMenu = JSON.parse(localStorage.getItem('bakeryMenu')) || [];
    tbody.innerHTML = "";

    currentMenu.forEach(item => {
        const row = `
            <tr>
                <td class="fw-bold text-dark">${item.title}</td>
                <td><span class="badge bg-secondary text-uppercase">${item.category}</span></td>
                <td>
                    <button class="btn btn-sm btn-danger px-2 py-1" onclick="deleteMenuNode(${item.id})">
                        <i class="fa-solid fa-trash-can"></i> Remove
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// SITE NAVIGATION SCROLLING MECHANICS
window.onscroll = function() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('btnBackToTop');
    const scrollProgress = document.getElementById('scroll-progress');
    
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressPercent = (window.pageYOffset / totalHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = progressPercent + "%";

    if (window.pageYOffset > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    if (window.pageYOffset > 400) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
};

function filterMenu(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    renderMenuCardUI(category);
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function openLightbox(url) { document.getElementById('lightboxTargetImg').src = url; new bootstrap.Modal(document.getElementById('lightboxModal')).show(); }
function handleFormSubmit(e) { e.preventDefault(); alert("Inquiry sent successfully!"); document.getElementById('bakeryContactForm').reset(); }
function animateCounter(id,s,e,d){const o=document.getElementById(id);if(!o)return;let t=null;const step=(cp)=>{if(!t)t=cp;const p=Math.min((cp-t)/d,1);o.innerHTML=Math.floor(p*(e-s)+s)+"+";if(p<1)window.requestAnimationFrame(step);};window.requestAnimationFrame(step);}
