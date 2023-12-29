// languageRedirect.js

document.addEventListener('DOMContentLoaded', function () {
    const supportLink = document.getElementById('supportLink');

    if (supportLink) {
        supportLink.addEventListener('click', function (event) {
            event.preventDefault();

            // Проверяем, есть ли язык в localStorage
            const savedLanguage = localStorage.getItem('language');

            // Если язык уже выбран, используем его
            if (savedLanguage) {
                redirectToSupportPage(savedLanguage);
            } else {
                // В противном случае используем язык из заголовка Accept-Language
                const userLanguage = navigator.language || navigator.userLanguage;
                const preferredLanguage = userLanguage.toLowerCase().includes('ru') ? 'ru' : 'en';
                document.documentElement.lang = preferredLanguage;
                localStorage.setItem('language', preferredLanguage);

                // Перенаправляем на страницу поддержки
                redirectToSupportPage(preferredLanguage);
            }
        });
    }

    function redirectToSupportPage(language) {
        // Перенаправляем на страницу поддержки с учетом выбранного языка
        const supportPage = language === 'ru' ? 'support_ru.html' : 'support.html';
        window.location.href = supportPage;
    }
});