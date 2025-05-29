// auth.js - Скрипт для обработки аутентификации и взаимодействия с UI

document.addEventListener('DOMContentLoaded', function() {
    // Элементы формы входа
    const loginForm = document.getElementById('login-form');
    const loginEmail = document.getElementById('email');
    const loginPassword = document.getElementById('password');
    
    // Элементы формы регистрации
    const registerForm = document.getElementById('register-form');
    const regName = document.getElementById('reg-name');
    const regEmail = document.getElementById('reg-email');
    const regPassword = document.getElementById('reg-password');
    const regConfirm = document.getElementById('reg-confirm');
    
    // Элементы переключения между формами
    const switchLink = document.getElementById('switch-link');
    const switchText = document.getElementById('switch-text');
    
    // Состояние аутентификации (в реальном приложении должно быть на сервере)
    let isAuthenticated = false;
    let currentUser = null;
    
    // Инициализация при загрузке
    init();
    
    function init() {
        // Проверяем, авторизован ли пользователь (в реальном приложении - проверка токена)
        checkAuthStatus();
        
        // Навешиваем обработчики событий
        setupEventListeners();
    }
    
    function checkAuthStatus() {
        // В реальном приложении здесь была бы проверка localStorage/cookie на наличие токена
        const token = localStorage.getItem('tripcraft_token');
        //if (token) {
            // Здесь должен быть запрос к серверу для проверки токена
            // Для демонстрации просто имитируем успешную проверку
            //isAuthenticated = True;
            //currentUser = JSON.parse(localStorage.getItem('tripcraft_user'));
            
            // Перенаправляем на dashboard
            //window.location.href = 'dashboard.html';
        //}
        
    }
    
    function setupEventListeners() {
        // Переключение между формами входа и регистрации
        switchLink.addEventListener('click', function(e) {
            e.preventDefault();
            toggleForms();
        });
        
        // Обработка отправки формы входа
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
        
        // Обработка отправки формы регистрации
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegistration();
        });
    }
    
    function toggleForms() {
        if (loginForm.style.display === 'none') {
            // Показываем форму входа
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            switchText.textContent = 'Нет аккаунта? ';
            switchLink.textContent = 'Зарегистрироваться';
        } else {
            // Показываем форму регистрации
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            switchText.textContent = 'Уже есть аккаунт? ';
            switchLink.textContent = 'Войти';
        }
    }
    
    function handleLogin() {
        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();
        
        // Валидация
        if (!email || !password) {
            showAlert('Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        // Здесь должен быть реальный запрос к серверу
        // Для демонстрации используем mock
        mockLogin(email, password)
            .then(user => {
                // Сохраняем данные пользователя (в реальном приложении - токен)
                localStorage.setItem('tripcraft_token', 'mock_token');
                localStorage.setItem('tripcraft_user', JSON.stringify(user));
                
                // Перенаправляем на основную страницу
                window.location.href = 'dashboard.html';
            })
            .catch(error => {
                showAlert(error.message, 'error');
            });
    }
    
    function handleRegistration() {
        const name = regName.value.trim();
        const email = regEmail.value.trim();
        const password = regPassword.value.trim();
        const confirm = regConfirm.value.trim();
        
        // Валидация
        if (!name || !email || !password || !confirm) {
            showAlert('Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        if (password !== confirm) {
            showAlert('Пароли не совпадают', 'error');
            return;
        }
        
        if (password.length < 6) {
            showAlert('Пароль должен содержать минимум 6 символов', 'error');
            return;
        }
        
        // Здесь должен быть реальный запрос к серверу
        // Для демонстрации используем mock
        mockRegister(name, email, password)
            .then(user => {
                showAlert('Регистрация прошла успешно! Теперь вы можете войти.', 'success');
                toggleForms(); // Переключаем на форму входа
                
                // Очищаем форму регистрации
                regName.value = '';
                regEmail.value = '';
                regPassword.value = '';
                regConfirm.value = '';
            })
            .catch(error => {
                showAlert(error.message, 'error');
            });
    }
    
    function showAlert(message, type) {
        // Удаляем предыдущие уведомления
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Создаем элемент уведомления
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        // Стили для уведомления
        alert.style.position = 'fixed';
        alert.style.top = '20px';
        alert.style.left = '50%';
        alert.style.transform = 'translateX(-50%)';
        alert.style.padding = '10px 20px';
        alert.style.borderRadius = '5px';
        alert.style.color = 'white';
        alert.style.zIndex = '1000';
        alert.style.animation = 'fadeIn 0.3s';
        
        // Цвета в зависимости от типа
        if (type === 'error') {
            alert.style.backgroundColor = '#ff4444';
        } else {
            alert.style.backgroundColor = '#00C851';
        }
        
        // Добавляем в DOM
        document.body.appendChild(alert);
        
        // Удаляем через 5 секунд
        setTimeout(() => {
            alert.style.animation = 'fadeOut 0.3s';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
        
        // Добавляем CSS анимации
        addAlertAnimations();
    }
    
    function addAlertAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; top: 0; }
                to { opacity: 1; top: 20px; }
            }
            @keyframes fadeOut {
                from { opacity: 1; top: 20px; }
                to { opacity: 0; top: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Mock функции для демонстрации (в реальном приложении должны быть запросы к серверу)
    function mockLogin(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Проверяем mock данные
                const users = JSON.parse(localStorage.getItem('tripcraft_users')) || [];
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    resolve({
                        id: user.id,
                        name: user.name,
                        email: user.email
                    });
                } else {
                    reject(new Error('Неверный email или пароль'));
                }
            }, 500); // Имитация задержки сети
        });
    }
    
    function mockRegister(name, email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Проверяем, не занят ли email
                const users = JSON.parse(localStorage.getItem('tripcraft_users')) || [];
                const emailExists = users.some(u => u.email === email);
                
                if (emailExists) {
                    reject(new Error('Пользователь с таким email уже существует'));
                } else {
                    // Создаем нового пользователя
                    const newUser = {
                        id: Date.now().toString(),
                        name,
                        email,
                        password // В реальном приложении пароль должен хешироваться на сервере
                    };
                    
                    // Сохраняем в "базу данных"
                    users.push(newUser);
                    localStorage.setItem('tripcraft_users', JSON.stringify(users));
                    
                    resolve(newUser);
                }
            }, 500); // Имитация задержки сети
        });
    }
});

