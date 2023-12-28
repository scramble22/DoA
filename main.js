document.addEventListener('DOMContentLoaded', function() {
    const abbreviations = [
        { term: 'LOL', definition: 'Laugh Out Loud' },
        { term: 'BRB', definition: 'Be Right Back' },
        { term: 'IMO', definition: 'In My Opinion' },
        { term: 'ICYMI', definition: 'In Case You Missed It' },
        { term: 'FOMO', definition: 'Fear Of Missing Out' },
        { term: 'BTW', definition: 'By The Way' },
        { term: 'IDK', definition: 'I Don\'t Know' },
        { term: 'OMG', definition: 'Oh My God' },
        { term: 'FYI', definition: 'For Your Information' },
        { term: 'TTYL', definition: 'Talk To You Later' },
        { term: 'IMHO', definition: 'In My Humble Opinion' },
        { term: 'DIY', definition: 'Do It Yourself' },
        { term: 'TGIF', definition: 'Thank God It\'s Friday' },
        { term: 'BFF', definition: 'Best Friends Forever' },
        { term: 'NSFW', definition: 'Not Safe For Work' },
        { term: 'YOLO', definition: 'You Only Live Once' },
        { term: 'TL;DR', definition: 'Too Long; Didn\'t Read' },
        { term: 'ETA', definition: 'Estimated Time of Arrival' },
        { term: 'FAQ', definition: 'Frequently Asked Questions' },
        { term: 'VIP', definition: 'Very Important Person' }
        // Добавь больше сокращений, если нужно
    ];

    const sortedAbbreviations = abbreviations.sort((a, b) => a.term.localeCompare(b.term));

    const groupedAbbreviations = {};

    // Группировка сокращений по первой букве
    sortedAbbreviations.forEach(item => {
        const firstLetter = item.term.charAt(0).toUpperCase();
        if (!groupedAbbreviations[firstLetter]) {
            groupedAbbreviations[firstLetter] = [];
        }
        groupedAbbreviations[firstLetter].push(item);
    });

    const resultsContainer = document.getElementById('results');

    // Отображение сгруппированных сокращений
    for (const [letter, abbrevs] of Object.entries(groupedAbbreviations)) {
        const letterItem = document.createElement('li');
        letterItem.textContent = letter;
        letterItem.classList.add('header'); // Добавление класса для заголовков буквенных групп
        resultsContainer.appendChild(letterItem);

        abbrevs.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.term}: ${item.definition}`;
            listItem.classList.add('abbreviation'); // Добавление класса для сокращений внутри группы
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
            return item.term.toLowerCase().includes(searchQuery) || item.definition.toLowerCase().includes(searchQuery);
        });

        // Отображение отфильтрованных сокращений
        for (const item of filteredAbbreviations) {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.term}: ${item.definition}`;
            listItem.classList.add('abbreviation'); // Добавление класса для отфильтрованных сокращений
            resultsContainer.appendChild(listItem);
        }
    }
});
