/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

homeworkContainer.style.width = '100%';
homeworkContainer.style.height = '100vh';
homeworkContainer.style.position = 'relative';

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    var div = document.createElement('div');

    div.classList.add('draggable-div');

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // generating random color
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);

    div.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';

    // generating random size
    var width = getRandomInt(0, 1000);
    var height = getRandomInt(0, 1000);

    div.style.width = width + 'px';
    div.style.height = height + 'px';

    // generating random coordinate
    var top = getRandomInt(0, (homeworkContainer.clientHeight - height));
    var left = getRandomInt(0, (homeworkContainer.clientWidth - width));

    div.style.position = 'absolute';
    div.style.top = top + 'px';
    div.style.left = left + 'px';

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.onmousedown = function(e) {
        var coords = target.getBoundingClientRect();
        var coordtop = coords.top + pageYOffset;
        var coordleft = coords.left + pageXOffset;
        var X = e.pageX - coordleft;
        var Y = e.pageY - coordtop;

        function goMoveTo(e) {
            target.style.left = e.pageX - X + 'px';
            target.style.top = e.pageY - Y + 'px';
        }

        document.onmousemove = function(e) {
            goMoveTo(e);
        };

        target.onmouseup = function() {
            document.onmousemove = null;
            target.onmouseup = null;
        };

        target.ondragstart = function() {
            return false;
        };
    };
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
