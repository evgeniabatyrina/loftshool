/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var copyarr = [];
	
    for (var i=0; i < array.length; i++) {
        copyarr[i] = fn(array[i], i, array);
    }
	
    return copyarr;
}
/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var prev = initial ? initial : array[0];
    var i = initial ? 0 : 1;
	
    for (i; i < array.length; i++) {
        prev = fn(prev, array[i], i, array);
    }
	
    return prev;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var arrToUp = [];
	
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arrToUp.push(prop.toUpperCase());
        }
    }
	
    return arrToUp;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */

function slice(array, from, to) {
    var newarr = [],
        i = from >= 0 ? from : array.length+from >= 0 ? array.length+from : 0;
    
    if ( to !== undefined ) {
        array.length = to >= 0 ? to <= array.length ? to : array.length : array.length+to;
    }

    for (i; i < array.length; i++) {
        newarr.push(array[i]);
    }
	
    return newarr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    var x = new Proxy(obj, {
        set: function(obj, prop, value) {
            obj[prop] = value * value;
			
            return true;
        }
    });
	
    return x;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
