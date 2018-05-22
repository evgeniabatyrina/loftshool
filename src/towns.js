/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения
 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
import { loadAndSortTowns as loadTowns } from '../src/index';

loadResult();

var towns = [];

function loadResult() {
    loadTowns()
        .then((response) => {
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';
            towns = response;
        },
        (error) => {
            reloadButton.style.display = 'block';
            loadingBlock.textContent = error;
        });
}
/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов
 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

var reloadButton = document.createElement('button');

reloadButton.textContent = 'Повторить';
reloadButton.style.display = 'none';
homeworkContainer.appendChild(reloadButton);

reloadButton.addEventListener('click', () => {
    reloadButton.style.display = 'none';
    loadResult();
});

filterInput.addEventListener('keyup', function () {
    const input = filterInput.value;

    filterResult.innerHTML = '';

    if (input) {
        towns.forEach((town) => {
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';

            if (isMatching(town.name, input)) {
                const townDiv = createTownNode(town);

                filterResult.appendChild(townDiv);
            }
        })
    }
});

function createTownNode(town) {
    const div = document.createElement('div');

    div.innerText = town.name;

    return div;
}

export {
    loadTowns,
    isMatching
};
