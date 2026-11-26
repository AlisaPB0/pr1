document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const menuToggle = document.getElementById('menu-toggle');
    const themeToggle = document.getElementById('theme-toggle');

    // 1. Мобильное меню (буyththuргер)
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });

    // 2. Плавная прокрутка по якорным ссылкам
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Закрываем мобильноfdgdgdgе меню при клике на пункт
                nav.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    });

    // 3. Переключение светлой и темной темы
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggle.textContent = isLight ? '🌙' : '☀️';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // 4. Анимация появления карточек при прокрутке
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));

    // 5. Эффект печатной машинки в заголовке
    const heroSpan = document.querySelector('.hero h1 span');
    const words = ['Алексей', 'Веб-разработчик', 'Фрилансер'];
    let wordIndex = 0;
    let charIndex = words.length;
    let isDeleting = true;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            heroSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 80 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }
    setTimeout(typeEffect, 2000);

    // 6. Обработка формы обратной связи
    const form = document.getElementById('form');
    const status = document.getElementById('status');
    const submitBtn = form.querySelector('button');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();

        if (name.length < 2) {
            showStatus('Введите корректное имя (минимум 2 символа)', '#f87171');
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        setTimeout(() => {
            showStatus(`Спасибо, ${name}! Заявка принята. Ответ придет на ${email}.`, '#4ade80');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1200);
    });

    function showStatus(message, color) {
        status.style.color = color;
        status.textContent = message;
        setTimeout(() => { status.textContent = ''; }, 5000);
    }
});
