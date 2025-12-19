const soilType = document.getElementById("soil").value; // Вид ЩГПС
const quantityOfSamples = document.getElementById("quantity").value; // Количнство требуемых рассевов

// Получаем каждую ячейку рассева
const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const value3 = document.getElementById("value3");
const value4 = document.getElementById("value4");
const value5 = document.getElementById("value5");
const value6 = document.getElementById("value6");
const value7 = document.getElementById("value7");
const value8 = document.getElementById("value8");
const value9 = document.getElementById("value9");
const value10 = document.getElementById("value10");
const value11 = document.getElementById("value11");

// Кнопка запуска расчёта
const start = document.getElementById("start");

function getRandomValue(min, max) { // Возвращает случайное число кратное 5.
    const minMultiple = Math.ceil(min/5) * 5;
    const maxMultiple = Math.ceil(max/5) * 5;
    // return Math.floor(Math.random() * (maxMultiple - minMultiple)) + minMultiple;
    const count = (maxMultiple - minMultiple) / 5 + 1;
    return minMultiple + Math.floor(Math.random() * count) * 5;
}

// 1. Задаём рандомное число
// 2. Проверяем какая у нас ЩГПС
// 3. Парсим значения из вставленного рассева
// 4. Определяем диапазон на сколько можно прибавлять или убавлять для каждой ячейки
// 5. Прибавляем к каждой ячейке число кратное 5
// 6. Проверка суммы полученного значения
// 7. Выдаём требуемое количнство рассевов



