document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const isRussian = localStorage.getItem('isRussian') === 'true';
        performSearch(isRussian);
    }
});
function performSearch(isRussian) {
    const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
    
    // Формируем имя страницы в зависимости от текущего языка
    const pageName = isRussian ? 'main_ru' : 'main';
    const destinationPage = `${pageName}.html?q=${encodeURIComponent(searchQuery)}`;
    
    // Переходим на страницу с результатами поиска
    window.location.href = destinationPage;
}
