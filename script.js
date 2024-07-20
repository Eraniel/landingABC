//content for test
const contents = [
    {
        question: "Ваш пол:",
        type: "radio",
        options: ["Мужчина", "Женщина"]
    },
    {
        question: "Укажите ваш возраст:",
        type: "radio",
        options: ["До 18", "От 18 до 28", "От 29 до 35", "От 36"]
    },
    {
        question: "Выберите лишнее:",
        type: "radio",
        options: ["Дом", "Шалаш", "Бунгало", "Скамейка", "Хижина"]
    },
    {
        question: "Продолжите цифровой ряд: 18, 20, 24, 32",
        type: "radio",
        options: ["62", "48", "74", "57", "60", "77"]
    },
    {
        question: "Выберите цвет, который сейчас наиболее Вам приятен:",
        type: "color-grid",
        options:[ "#A8A8A8", "#0000A9", "#00A701", "#F60100", "#FDFF19", "#A95403", "#000000", "#850068", "#46B2AC"]
    },
    {
        question: "Отдохните пару секунд, еще раз выберите цвет, который сейчас наиболее Вам приятен:",
        type: "color-grid",
        options:[ "#A8A8A8", "#46B2AC", "#A95403", "#00A701", "#000000", "#F60100", "#850068", "#FDFF19", "#0000A9"]
    },
    {
        question: "Какой из городов лишний:",
        type: "radio",
        options: ["Вашингтон", "Лондон", "Париж", "Нью-Йорк", "Москва", "Оттава"]
    },
    {
        question: "Выберите правильную фигуру из четырёх пронумерованных.",
        type: "img-squares",
        img: "../img/figures.png",
        options: ["1", "2", "3", "4"]
    },
    {
        question: "Вам привычнее и важнее:",
        type: "radio",
        options: ["Наслаждаться каждой минутой проведенного времени", 
            "Быть устремленными мыслями в будущее", "Учитывать в ежедневной практике прошлый опыт"]
    },
    {
        question: "Какое определение, по-Вашему, больше подходит к этому геометрическому изображению:",
        type: "img-radio",
        img: "../img/piramid.png",
        options: ["Оно остроконечное", "Оно устойчиво", "Оно находится в состоянии равновесия"]
    },
    {
        question: "Вставьте подходящее число",
        type: "img-squares",
        img: "../img/star.png",
        options: ["34", "36", "53", "44", "66", "42"]
    }
];


//Menu nav button
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menuButton');
    const popupMenu = document.getElementById('popupMenu');
    const closeButton = document.getElementById('closeButton');
    const changeContentButton = document.getElementById('changeContentButton');
    const content = document.getElementById('content');

//nav
    menuButton.addEventListener('click', () => {
        popupMenu.style.display = 'block';
    });
    closeButton.addEventListener('click', () => {
        popupMenu.style.display = 'none';
    });

});

//test-quiz
document.addEventListener('DOMContentLoaded', () => {
    const changeContentButton = document.getElementById('changeContentButton');
    const content = document.getElementById('content');
    const progressBar = document.getElementById('progressBar');

    const totalSlides = contents.length;
    const progressIncrement = 100 / totalSlides;
    let currentIndex = 0;
    

    function loadContent(index) {
        const contentData = contents[index];
        let contentHTML = `<p class="test-question">${contentData.question}</p>`;
        
        switch (contentData.type) {
            case "radio":
                contentData.options.forEach((option, i) => {
                    contentHTML += `
                        <div class="option" data-index="${i}">
                            <div class="circle"></div>
                            <div class="opt-text">${option}</div>
                        </div>`;
                });
                break;
            case "color-grid":
                contentHTML += `<div class="color-grid">`;
                contentData.options.forEach((color, i) => {
                    contentHTML += `
                        <div class="color-square" data-index="${i}" style="background-color: ${color};"></div>`;
                });
                contentHTML += `</div>`;
                break;
            case "img-squares":
                contentHTML += `<img src="${contentData.img}" alt="figure" class="question-image"/><div class="option-container">`;
                contentData.options.forEach((option, i) => {
                    contentHTML += `
                        <div class="option-square" data-index="${i}">
                            <div class="opt-text">${option}</div>
                        </div>`;
                });
                contentHTML += `</div>`;
                break;
            case "img-radio":
                contentHTML += `<img src="${contentData.img}" alt="image" class="question-image"/>`;
                contentData.options.forEach((option, i) => {
                    contentHTML += `
                        <div class="option" data-index="${i}">
                            <div class="circle"></div>
                            <div class="opt-text">${option}</div>
                        </div>`;
                });
                break;
            default:
                break;
        }
        content.innerHTML = contentHTML;

        function addClickListeners(selector, selectedClass, extraClass = null) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.addEventListener('click', () => {
                    elements.forEach(el => {
                        el.classList.remove(selectedClass);
                        if (extraClass) {
                            el.querySelector(extraClass.target).classList.remove(extraClass.class);
                        }
                    });
                    element.classList.add(selectedClass);
                    if (extraClass) {
                        element.querySelector(extraClass.target).classList.add(extraClass.class);
                    }
                    changeContentButton.disabled = false;
                    changeContentButton.classList.remove('disabled');
                });
            });
        }
        
        const options = document.querySelectorAll('.option');
        addClickListeners('.option', 'selected', { target: '.circle', class: 'selected-circle' });
        
        if (contentData.type === "color-grid") {
            addClickListeners('.color-square', 'selected-square');
        } else if (contentData.type === "img-squares") {
            addClickListeners('.option-square', 'selected-square');
        }
        
    }

    loadContent(currentIndex);
    currentIndex++;

    changeContentButton.addEventListener('click', () => {

        if (currentIndex === totalSlides) {
            changeContentButton.disabled = true;
            changeContentButton.classList.add('disabled');
        
            const contentDiv = document.getElementById('content');
            const loadingDiv = document.getElementById('loading');
            contentDiv.style.display = "none";
            loadingDiv.style.display = "flex";
        
            setTimeout(() => {
                setTimeout(() => {
                    window.location.href = 'results.html';
                }, 100);
            }, 3000);
        } else {
            loadContent(currentIndex);
            progressBar.style.width = `${progressIncrement * (currentIndex + 1)}%`;
            changeContentButton.disabled = true;
            changeContentButton.classList.add('disabled');
            currentIndex++;
        }
        
    });
});

//timer
document.addEventListener('DOMContentLoaded', () => {
    let totalSeconds = 10 * 60;
    const timerElement = document.getElementById('timer');


    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${formatNumber(minutes)}:${formatNumber(secs)}`;
    }

    function formatNumber(number) {
        return number < 10 ? `0${number}` : number;
    }

    function updateTimer() {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00";
            return;
        }

        totalSeconds--;
        timerElement.textContent = formatTime(totalSeconds);
    }

    const timerInterval = setInterval(updateTimer, 1000);
    timerElement.textContent = formatTime(totalSeconds);
});

//fetch
document.getElementById('fetchButton').addEventListener('click', () => {
    const url = 'https://swapi.dev/api/people/1/';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response trouble');
            }
            return response.json();
        })
        .then(data => {
            //console.log(data);
            document.getElementById('dataDisplay').innerHTML = `
                <h3 class="data-display-item">${data.name}</h3>
                <p class="data-display-item">Height: ${data.height}</p>
                <p class="data-display-item">Mass: ${data.mass}</p>
                <p class="data-display-item">Hair Color: ${data.hair_color}</p>
                <p class="data-display-item">Skin Color: ${data.skin_color}</p>
                <p class="data-display-item">Eye Color: ${data.eye_color}</p>
                <p class="data-display-item">Birth Year: ${data.birth_year}</p>
                <p class="data-display-item">Gender: ${data.gender}</p>
            `;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});

