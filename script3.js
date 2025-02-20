const apiKey = 'kAJUeWzJJvFhuXZqS9gwYdIZC0KoGEScgau99ZW4'; 
        const apiUrl = 'https://api.nasa.gov/planetary/apod';

        document.addEventListener('DOMContentLoaded', () => {
            getCurrentImageOfTheDay();
            loadSearchHistory();
        });

        document.getElementById('search-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const selectedDate = document.getElementById('search-input').value;
            getImageOfTheDay(selectedDate);
        });

        function getCurrentImageOfTheDay() {
            const currentDate = new Date().toISOString().split("T")[0];
            fetch(`${apiUrl}?api_key=${apiKey}&date=${currentDate}`)
                .then(response => response.json())
                .then(data => displayImage(data))
                .catch(error => console.error('Error fetching current image:', error));
        }

        function getImageOfTheDay(date) {
            fetch(`${apiUrl}?api_key=${apiKey}&date=${date}`)
                .then(response => response.json())
                .then(data => {
                    displayImage(data);
                    saveSearch(date);
                    addSearchToHistory(date);
                })
                .catch(error => console.error('Error fetching image:', error));
        }

        function displayImage(data) {
            const container = document.getElementById('current-image-container');
            container.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;
        }

        function saveSearch(date) {
            let searches = JSON.parse(localStorage.getItem('searches')) || [];
            if (!searches.includes(date)) {
                searches.push(date);
                localStorage.setItem('searches', JSON.stringify(searches));
            }
        }

        function addSearchToHistory(date) {
            const historyList = document.getElementById('search-history');
            const listItem = document.createElement('li');
            listItem.textContent = date;
            listItem.addEventListener('click', () => getImageOfTheDay(date));
            historyList.appendChild(listItem);
        }

        function loadSearchHistory() {
            const searches = JSON.parse(localStorage.getItem('searches')) || [];
            searches.forEach(date => addSearchToHistory(date));
        }