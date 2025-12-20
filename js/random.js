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

function getRandomValue(min, max) { // Возвращает случайное число кратное 5 в указанном диапазоне.
    const minMultiple = Math.ceil(min/5) * 5;
    const maxMultiple = Math.ceil(max/5) * 5;
    const count = (maxMultiple - minMultiple) / 5 + 1;
    return minMultiple + Math.floor(Math.random() * count) * 5;
}
function admission() { // Выдаёт массив с допусками по грунтам
    const soilType = document.getElementById("soil").value;
    if (soilType === "c1") {
        return [0, 0, 0, 10, 20, 40, 35, 60, 45, 70, 75, 92, 80, 93]
    }
    else if (soilType === "c2") {
        return [0, 0, 0, 0, 0, 10, 10, 35, 25, 50, 35, 65, 55, 80, 65, 90, 75, 92]
    }
    else if (soilType === "c4") {
        return [0, 10, 15, 35, 28, 55, 40, 70, 50, 80, 60, 85, 80, 95, 91, 97, 95, 100]
    }
    else if (soilType === "c5") {
        return [0, 0, 0, 10, 25, 60, 45, 80, 57, 85, 67, 88, 80, 95, 90, 97, 95, 100]
    }
    else if (soilType === "c10") {
        return [0, 0, 0, 10, 25, 60, 45, 80, 57, 85, 71, 91, 87, 97, 95, 100]
    }
}
function getWeight() { // Получаем значения из примера рассева
    const value1 = parseInt(document.getElementById("value1").value);
    const value2 = parseInt(document.getElementById("value2").value);
    const value3 = parseInt(document.getElementById("value3").value);
    const value4 = parseInt(document.getElementById("value4").value);
    const value5 = parseInt(document.getElementById("value5").value);
    const value6 = parseInt(document.getElementById("value6").value);
    const value7 = parseInt(document.getElementById("value7").value);
    const value8 = parseInt(document.getElementById("value8").value);
    const value9 = parseInt(document.getElementById("value9").value);
    const value10 = parseInt(document.getElementById("value10").value);
    const value11 = parseInt(document.getElementById("value11").value);
    return [value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11]
}
function getMinMax() {// Расчитывает минимальное и максимальное значение для каждой ячейки
    const values = [];
    for (let i = 0; i < 11; i++) { 
            if (getWeight()[i] > 1000) {
                values.push(getWeight()[i] - (getWeight()[i] * 0.10));
                values.push(getWeight()[i] + (getWeight()[i] * 0.10));
            }
            else {
                values.push(getWeight()[i] - (getWeight()[i] * 0.20));
                values.push(getWeight()[i] + (getWeight()[i] * 0.20));
            }
    }

    for (let i = 0; i < 11; i++){ 
        values[i] = parseInt(values[i]);
    }
return values
}
// function calculatePasses() {
//     const fullPasses = [];
//     for (let i = 0; i < 11; i++) {

//     }
//     return fullPasses
// }
// function calculateBalances() {
//     const fullBalances = [];
//     for (let i = 0; i < 11; i++) {

//     }
//     return fullBalances
// }

function getAdmissionValue() {
    const admissionValues = [];
    for (let i = 0; i <= 11; i + 2) { //Задаём рандомные значения
        admissionValues.push(parseInt(getRandomValue(getMinMax()[i], getMinMax()[i++])));
    }
    return admissionValues
    // Добавь расчёт полных ПО и ПП
    // Проверяем подходит ли значение по допускам
}


// 1. Задаём рандомное число +
// 2.1 Проверяем какая у нас ЩГПС +
// 2.2 Задать список допустимых значений по гост +
// 3. Получаем значения из вставленного рассева  +
// 4. Определяем диапазон на сколько можно прибавлять или убавлять +
// 5. Создаём рандомное число в диапозоне (П.4) кратное 5 +
// 6. Проверка суммы полученного значения (пока хз как реализовать)
// 7. Выдаём требуемое количнство рассевов 

function check() {
    console.log("Допуски: " + admission());
    console.log("Массы: " + getWeight());
    console.log("Границы допусков: " + getMinMax());
    console.log("Придуманные значения: " + getAdmissionValue());
}



