document.addEventListener('DOMContentLoaded', function() {
    const abbreviations = [
        { term: 'ASAP', definition: 'As Soon As Possible', rus: 'Как можно скорее' },
        { term: 'LOL', definition: 'Laugh Out Loud', rus: 'Смех вслух' },
        { term: 'BRB', definition: 'Be Right Back', rus: 'Сейчас вернусь' },
        { term: 'IMO', definition: 'In My Opinion', rus: 'По моему мнению' },
        { term: 'ICYMI', definition: 'In Case You Missed It', rus: 'В случае, если вы пропустили' },
        { term: 'FOMO', definition: 'Fear Of Missing Out', rus: 'Страх пропустить что-то важное' },
        { term: 'BTW', definition: 'By The Way', rus: 'Кстати' },
        { term: 'IDK', definition: 'I Don\'t Know', rus: 'Я не знаю' },
        { term: 'OMG', definition: 'Oh My God', rus: 'О мой Бог' },
        { term: 'FYI', definition: 'For Your Information', rus: 'Для вашей информации' },
        { term: 'TTYL', definition: 'Talk To You Later', rus: 'Поговорим позже' },
        { term: 'IMHO', definition: 'In My Humble Opinion', rus: 'По моему скромному мнению' },
        { term: 'DIY', definition: 'Do It Yourself', rus: 'Сделай сам' },
        { term: 'TGIF', definition: 'Thank God It\'s Friday', rus: 'Слава Богу, это пятница' },
        { term: 'BFF', definition: 'Best Friends Forever', rus: 'Лучшие друзья навсегда' },
        { term: 'NSFW', definition: 'Not Safe For Work', rus: 'Не безопасно на работе' },
        { term: 'YOLO', definition: 'You Only Live Once', rus: 'Живешь только раз' },
        { term: 'TL;DR', definition: 'Too Long; Didn\'t Read', rus: 'Слишком длинно, не читал' },
        { term: 'ETA', definition: 'Estimated Time of Arrival', rus: 'Ожидаемое время прибытия' },
        { term: 'FAQ', definition: 'Frequently Asked Questions', rus: 'Часто задаваемые вопросы' },
        { term: 'VIP', definition: 'Very Important Person', rus: 'Очень важная личность' },
        { term: 'LMAO', definition: 'laughing my ass off', rus: 'дико смеяться' },
        { term: 'WTF ', definition: 'What The F***', rus: 'что за..? ' },
        { term: 'BB', definition: 'Bye-bye', rus: 'Пока!' },
        { term: 'BBS', definition: 'be back soon', rus: 'Cкоро буду, скоро вернусь' },
        { term: 'Bgg', definition: 'Bu-ga-ga', rus: 'сокращение от Бу-га-га, что значит сильный смех' },
        { term: 'BRB', definition: 'be right back', rus: 'скоро вернусь (вернусь через минуту)' },
        { term: 'BSoD', definition: 'Blue Screen of Death', rus: 'синий экран смерти. Экран с сообщением о невосстановимой ошибке ядра, после которой можно только перезагрузить компьютер кнопкой «Reset». В операционных системах семейства Windows он синего цвета.' }
        // Добавь больше сокращений, если нужно
    ];


// Так же вы можете посмотреть еще некоторые сокращения: 
// * Black magic — работающий программный код неясного устройства
// * BOFH — Bastard Operator From Hell (Адский Оператор-ублюдок) , герой одноименной серии рассказов.

    const isRussian = localStorage.getItem('isRussian') === 'true';
    const sortedAbbreviations = abbreviations.sort((a, b) => a.term.localeCompare(b.term));

    const groupedAbbreviations = groupAbbreviations(sortedAbbreviations);

    const resultsContainer = document.getElementById('results');

    for (const [letter, abbrevs] of Object.entries(groupedAbbreviations)) {
        const letterItem = document.createElement('li');
        letterItem.textContent = letter;
        letterItem.classList.add('headerr');
        resultsContainer.appendChild(letterItem);

        abbrevs.forEach(item => {
            const listItem = document.createElement('li');
            const definition = isRussian ? `${item.definition} (${item.rus})` : item.definition;
            listItem.textContent = `${item.term}: ${definition}`;
            listItem.classList.add('abbreviation');

            // Добавим обработчик события клика на каждую строку
            listItem.addEventListener('click', function() {
                redirectToTermPage(item.term);
            });

            resultsContainer.appendChild(listItem);
        });
    }

    document.getElementById('searchInput').addEventListener('input', function() {
        performSearch();
    });

    document.getElementById('searchInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch();
        }
    });

    function performSearch() {
        const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
        resultsContainer.innerHTML = '';

        if (searchQuery === '') {
            // Восстанавливаем исходный вид, если поисковый запрос пуст
            for (const [letter, abbrevs] of Object.entries(groupedAbbreviations)) {
                const letterItem = document.createElement('li');
                letterItem.textContent = letter;
                letterItem.classList.add('headerr');
                resultsContainer.appendChild(letterItem);

                abbrevs.forEach(item => {
                    const listItem = document.createElement('li');
                    const definition = isRussian ? `${item.definition} (${item.rus})` : item.definition;
                    listItem.textContent = `${item.term}: ${definition}`;
                    listItem.classList.add('abbreviation');

                    listItem.addEventListener('click', function() {
                        redirectToTermPage(item.term);
                    });

                    resultsContainer.appendChild(listItem);
                });
            }
        } else {
            // В противном случае выполняем поиск и отображаем результаты
            const filteredAbbreviations = sortedAbbreviations.filter(item => {
                const term = item.term.toLowerCase();
                const definition = item.definition.toLowerCase();
                const rus = item.rus.toLowerCase();

                // Ограничиваем поиск только английскими словами
                return term.includes(searchQuery) || definition.includes(searchQuery);
            });

            for (const item of filteredAbbreviations) {
                const listItem = document.createElement('li');
                const definition = isRussian ? `${item.definition} (${item.rus})` : item.definition;
                listItem.textContent = `${item.term}: ${definition}`;
                listItem.classList.add('abbreviation');

                listItem.addEventListener('click', function() {
                    redirectToTermPage(item.term);
                });

                resultsContainer.appendChild(listItem);
            }
        }
    }

    function groupAbbreviations(abbreviations) {
        const groupedAbbreviations = {};

        abbreviations.forEach(item => {
            const firstLetter = item.term.charAt(0).toUpperCase();
            if (!groupedAbbreviations[firstLetter]) {
                groupedAbbreviations[firstLetter] = [];
            }
            groupedAbbreviations[firstLetter].push(item);
        });

        return groupedAbbreviations;
    }

    // Функция для перенаправления на страницу с названием
    function redirectToTermPage(term) {
        const destinationPage = 'Pages/' + term.toLowerCase() + '.html';

        // Проверяем существование файла перед перенаправлением
        checkFileExists(destinationPage)
            .then(fileExists => {
                if (fileExists) {
                    window.location.href = destinationPage;
                } else {
                    // Если файла нет, перенаправляем на страницу ошибки 404
                    window.location.href = '404.html';
                }
            })
            .catch(error => {
                console.error('Error checking file existence:', error);
            });
    }

    // Функция для проверки существования файла
    function checkFileExists(file) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', file, true);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    resolve(xhr.status === 200);
                }
            };

            xhr.onerror = function() {
                reject(new Error('Network error while checking file existence'));
            };

            xhr.send();
        });
    }
});