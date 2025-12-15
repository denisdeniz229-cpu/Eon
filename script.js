// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery elements
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Show slide function
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        showSlide(index);
        resetInterval();
    }
    
    // Reset interval
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });
    
    // Indicator clicks
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
    
    // Initialize
    showSlide(0);
    slideInterval = setInterval(nextSlide, 4000);
    
    // Gender selection
    const genderOptions = document.querySelectorAll('.gender-option');
    
    genderOptions.forEach(option => {
        option.addEventListener('click', function() {
            const gender = this.getAttribute('data-gender');
            alert(`${gender.toUpperCase()} koleksiyonu için yönlendiriliyorsunuz...`);
            // Burada gerçek yönlendirme yapılabilir
            // window.location.href = `/${gender}-collection.html`;
        });
    });
});