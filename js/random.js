const quantityOfSamples = document.getElementById("quantity").value; // Количнство требуемых рассевов

// Кнопка запуска расчёта
const start = document.getElementById("start");

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
    const value12 = parseInt(document.getElementById("value12").value);
    return [value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11,value12]
}
function admission() { // Выдаёт допуски в ПО
    const soilType = document.getElementById("soil").value;
    // В список включены ячейки, которые не учитываются в ГОСТ`е (просто продублировал предыдущие)
    if (soilType === "c1") {
        return [0, 0, 0, 10, 20, 40, 20, 40, 35, 60, 45, 70, 55, 80, 55, 80, 70, 90, 75, 92, 80, 93, 93, 100]
    }
    else if (soilType === "c2") {
        return [0, 0, 0, 0, 0, 10, 0, 10, 10, 35, 25, 50, 35, 65, 35, 65, 55, 80, 65, 90, 75, 92, 92, 100]
    }
    else if (soilType === "c4") {
        return [0, 10, 15, 35, 28, 55, 28, 55, 40, 70, 50, 80, 60, 85, 60, 85, 80, 95, 91, 97, 95, 100, 95, 100]
    }
    else if (soilType === "c5") {
        return [0, 0, 0, 10, 25, 60, 25, 60, 45, 80, 57, 85, 67, 88, 67, 88, 80, 95, 90, 97, 95, 100, 95, 100]
    }
    else if (soilType === "c10") {
        return [0, 0, 0, 10, 25, 60, 25, 60, 45, 80, 57, 85, 57, 85, 57, 85, 71, 91, 87, 97, 95, 100, 95, 100]
    }
}
function calculatePP(weight) { // Расчёт ПП
    const PP = [];
    for (let i = 0; i < 12; i++) {
        PP.push(weight[i] / 100);
    }
    return PP
}
function calculatePO(PP) { // Расчёт ПО
    const PO = [];
    PO.push(PP[0]);
    for (let i = 1; i < PP.length; i++) {
            PO.push(PO[i-1] + PP[i]);
    }
    return PO
}
function devation(min, max) { // Расчёт допустимого отклонения для придумывания рассева
    const minValue = min;
    const maxValue = max;

    const target = [];
    const random = [];

    for (let i = 0; i < 12; i++) {
        target.push(calculatePO(calculatePP(getWeight()))[i])
    }
    for (let i = 0; i < 12; i++) {
        random.push(admission()[i * 2]);
    }

    // Проверка 
    // const check = [];
    // for (let i = 0; i < 12; i++) {
    //     check.push(target[i]);
    //     check.push(random[i]);
    // }
    // return check

    // Расчитать допуски по ГОСТу и задать для каждой ячейки индивидуальное максимальное
    //  и минимальное значение для отклонения
}