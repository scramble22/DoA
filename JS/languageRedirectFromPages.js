document.addEventListener('DOMContentLoaded', function () {
    const supportLink = document.getElementById('supportLink');

    if (supportLink) {
        supportLink.addEventListener('click', function (event) {
            event.preventDefault();

            // Проверяем, есть ли язык в localStorage
            const savedLanguage = localStorage.getItem('isRussian');

            // Если язык уже выбран, используем его
            if (savedLanguage) {
                redirectToSupportPage(savedLanguage);
            } else {
                // Ждем, пока загрузится текущий язык из localStorage (асинхронная операция)
                setTimeout(function () {
                    const savedLanguage = localStorage.getItem('isRussian') || 'false';
                    document.documentElement.lang = savedLanguage;

                    // Перенаправляем на страницу поддержки
                    redirectToSupportPage(savedLanguage);
                }, 0);
            }
        });
    }

    function redirectToSupportPage(language) {
        // Перенаправляем на страницу поддержки с учетом выбранного языка
        const supportPage = language === 'true' ? 'support_ru.html' : 'support.html';
        window.location.href = "../" + supportPage;
    }
});
