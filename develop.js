// develop.js

document.addEventListener('DOMContentLoaded', function () {
    // Получаем ссылки по ID
    const devLink = document.getElementById('dev-link');
    const analyticsLink = document.getElementById('analytics-link');

    // Обработчик для "Для разработчиков"
    if (devLink) {
        devLink.addEventListener('click', function (event) {
            event.preventDefault(); // Отменяем стандартное поведение ссылки
            window.location.href = 'tech.html'; // Переход на tech.html
        });
    }

    // Обработчик для "Аналитика"
    if (analyticsLink) {
        analyticsLink.addEventListener('click', function (event) {
            event.preventDefault(); // Отменяем стандартное поведение ссылки
            window.location.href = 'analytics.html'; // Переход на analitycs.html
        });
    }
});