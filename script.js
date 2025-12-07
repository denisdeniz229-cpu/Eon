// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const header = document.getElementById('main-header');

menuToggle.addEventListener('click', function() {
    header.classList.toggle('menu-expanded');
});

// Logo click to scroll to top
document.getElementById('eon-logo').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Close menu if expanded
    if (header.classList.contains('menu-expanded')) {
        header.classList.remove('menu-expanded');
    }
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const carouselWrapper = document.querySelector('.carousel-wrapper');

// Function to show slide
function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active class
    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Animate slide elements
    setTimeout(animateSlideElements, 100);
}

// Add animation classes to carousel elements when slide changes
function animateSlideElements() {
    const activeSlide = document.querySelector('.carousel-slide.active');
    const title = activeSlide.querySelector('h2');
    const button = activeSlide.querySelector('.explore-btn');
    
    // Reset animations
    title.style.animation = 'none';
    button.style.animation = 'none';
    
    // Trigger reflow
    void title.offsetWidth;
    void button.offsetWidth;
    
    // Reapply animations
    title.style.animation = null;
    button.style.animation = null;
}

// Auto slide change
let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Next button
document.querySelector('.next-btn').addEventListener('click', function() {
    clearInterval(slideInterval);
    showSlide(currentSlide + 1);
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// Previous button
document.querySelector('.prev-btn').addEventListener('click', function() {
    clearInterval(slideInterval);
    showSlide(currentSlide - 1);
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// Gender selection
const genderButtons = document.querySelectorAll('.gender-btn');
const productsGrid = document.getElementById('products-grid');

// Sample product data
const productsData = {
    male: [
        { id: 1, name: "Premium Siyah Sweatshirt", category: "Erkek Sweatshirt", price: "299 ₺" },
        { id: 2, name: "Konforlu Gri Eşofman", category: "Erkek Eşofman", price: "349 ₺" },
        { id: 3, name: "Sade Beyaz T-Shirt", category: "Erkek T-Shirt", price: "199 ₺" },
        { id: 4, name: "Dar Kesim Mavi Jean", category: "Erkek Jean", price: "399 ₺" },
        { id: 5, name: "Klasik Siyah Şapka", category: "Erkek Aksesuar", price: "149 ₺" },
        { id: 6, name: "Deri Detaylı Spor Çanta", category: "Erkek Aksesuar", price: "449 ₺" }
    ],
    female: [
        { id: 1, name: "Rengarenk Sweatshirt", category: "Kadın Sweatshirt", price: "299 ₺" },
        { id: 2, name: "Şık Siyah Eşofman", category: "Kadın Eşofman", price: "349 ₺" },
        { id: 3, name: "Desenli Beyaz T-Shirt", category: "Kadın T-Shirt", price: "199 ₺" },
        { id: 4, name: "Yüksek Bel Mavi Jean", category: "Kadın Jean", price: "399 ₺" },
        { id: 5, name: "Çiçek Desenli Şapka", category: "Kadın Aksesuar", price: "149 ₺" },
        { id: 6, name: "Omuzdan Asmalı Çanta", category: "Kadın Aksesuar", price: "399 ₺" }
    ],
    unisex: [
        { id: 1, name: "Üniseks Siyah Sweatshirt", category: "Unisex Sweatshirt", price: "299 ₺" },
        { id: 2, name: "Rahat Gri Eşofman", category: "Unisex Eşofman", price: "349 ₺" },
        { id: 3, name: "Minimalist Beyaz T-Shirt", category: "Unisex T-Shirt", price: "199 ₺" },
        { id: 4, name: "Standart Kesim Jean", category: "Unisex Jean", price: "399 ₺" },
        { id: 5, name: "Klasik Şapka", category: "Unisex Aksesuar", price: "149 ₺" },
        { id: 6, name: "Pratik Spor Çantası", category: "Unisex Aksesuar", price: "449 ₺" }
    ]
};

// Function to render products
function renderProducts(gender) {
    const products = productsData[gender];
    productsGrid.innerHTML = '';
    
    // Reset animation
    productsGrid.style.animation = 'none';
    void productsGrid.offsetWidth;
    productsGrid.style.animation = null;
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.name}</div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">${product.price}</p>
                <button class="view-product-btn">Ürünü İncele <i class="fas fa-search"></i></button>
            </div>
        `;
        
        // Add animation delay for staggered effect
        productCard.style.animationDelay = `${index * 0.1}s`;
        productsGrid.appendChild(productCard);
    });
}

// Set initial products
renderProducts('male');

// Gender button click events
genderButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        genderButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get gender data attribute
        const gender = this.getAttribute('data-gender');
        
        // Render products for selected gender
        renderProducts(gender);
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('E-posta adresiniz başarıyla kaydedildi!');
            emailInput.value = '';
        }
    });
}