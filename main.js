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
        { term: 'VIP', definition: 'Very Important Person', rus: 'Очень важная личность' }
        // Добавь больше сокращений, если нужно
    ];

    const languageChosen = localStorage.getItem('languageChosen');

    if (!languageChosen) {
        const languagePrompt = document.getElementById('languagePrompt');
        languagePrompt.style.display = 'block';
    } else {
        initializeApp();
    }

    function setLanguage(isRussian) {
        localStorage.setItem('languageChosen', true);
        localStorage.setItem('isRussian', isRussian);
        const languagePrompt = document.getElementById('languagePrompt');
        languagePrompt.style.display = 'none';
        initializeApp();
    }

    function initializeApp() {
        const isRussian = localStorage.getItem('isRussian') === 'true';
        const abbreviationsData = getAbbreviations(isRussian);
        const sortedAbbreviations = abbreviationsData.sort((a, b) => a.term.localeCompare(b.term));
        const groupedAbbreviations = groupAbbreviations(sortedAbbreviations);

        const resultsContainer = document.getElementById('results');

        for (const [letter, abbrevs] of Object.entries(groupedAbbreviations)) {
            const letterItem = document.createElement('li');
            letterItem.textContent = letter;
            letterItem.classList.add('header');
            resultsContainer.appendChild(letterItem);

            abbrevs.forEach(item => {
                const listItem = document.createElement('li');
                const definition = isRussian ? item.rus : item.definition;
                listItem.textContent = `${item.term}: ${definition}`;
                listItem.classList.add('abbreviation');
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
            const searchQuery = document.getElementById('searchInput').value.toLowerCase();
            resultsContainer.innerHTML = '';

            const filteredAbbreviations = sortedAbbreviations.filter(item => {
                const term = isRussian ? item.rus.toLowerCase() : item.term.toLowerCase();
                const definition = isRussian ? item.rus.toLowerCase() : item.definition.toLowerCase();
                return term.includes(searchQuery) || definition.includes(searchQuery);
            });

            for (const item of filteredAbbreviations) {
                const listItem = document.createElement('li');
                const definition = isRussian ? item.rus : item.definition;
                listItem.textContent = `${item.term}: ${definition}`;
                listItem.classList.add('abbreviation');
                resultsContainer.appendChild(listItem);
            }
        }
    }

    function getAbbreviations(isRussian) {
        return abbreviations.map(item => ({ ...item, definition: isRussian ? item.rus : item.definition }));
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
});
