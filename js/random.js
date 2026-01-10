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
        return [0, 0, 0, 10, 20, 40, 20, 40, 35, 60, 45, 70, 55, 80, 55, 80, 70, 90, 75, 92, 80, 93, 100, 100]
    }
    else if (soilType === "c2") {
        return [0, 0, 0, 0, 0, 10, 0, 10, 10, 35, 25, 50, 35, 65, 35, 65, 55, 80, 65, 90, 75, 92, 100, 100]
    }
    else if (soilType === "c4") {
        return [0, 10, 15, 35, 28, 55, 28, 55, 40, 70, 50, 80, 60, 85, 60, 85, 80, 95, 91, 97, 95, 100, 100, 100]
    }
    else if (soilType === "c5") {
        return [0, 0, 0, 10, 25, 60, 25, 60, 45, 80, 57, 85, 67, 88, 67, 88, 80, 95, 90, 97, 95, 100, 100, 100]
    }
    else if (soilType === "c10") {
        return [0, 0, 0, 10, 25, 60, 25, 60, 45, 80, 57, 85, 57, 85, 57, 85, 71, 91, 87, 97, 95, 100, 100, 100]
    }
}
function calculatePP(weight) { // Расчёт ПП
    weight = getWeight();
    const PP = [];
    for (let i = 0; i < 12; i++) {
        PP.push(weight[i] / 100);
    }
    return PP
}
function calculatePO(PP) { // Расчёт ПО
    PP = calculatePP()
    const PO = [];
    PO.push(PP[0]);
    for (let i = 1; i < PP.length; i++) {
            PO.push(PO[i-1] + PP[i]);
            PO[i].toFixed(2);
    }
    return PO
}
function randomSieve(min, max) {
    let random = Math.random() * (max - min) + min;
    random = random - (random % 0.05);
    return parseFloat(random.toFixed(2))
}

function calculateRandomSieve() { // Возвращает ПО для рандомного рассева
    const target = []; // Значение ПО целевого рассева
    for (let i = 0; i < 12; i++) {
        target.push(calculatePO(calculatePP(getWeight()))[i])
    }

    const admissionMax = []; // Верх по допуску по ГОСТ
    for (let i = 1; i < 24; i += 2) {
        admissionMax.push(admission()[i]);
    }

    const admissionMin = []; // Низ по допуску по ГОСТ
    for (let i = 0; i < 24; i += 2) {
        admissionMin.push(admission()[i]);
    }

    const sieve = []; // Значения ПО для рандомного рассева
    for (let i = 0; i < 12; i++) {
        let minValue = admissionMin[i];
        if (i > 0) {
            minValue = Math.max(admissionMin[i], sieve[i - 1]);
        }
        if (minValue > admissionMax[i]) {
            sieve.push(admissionMax[i]);
        }
        else {
            sieve.push(randomSieve(minValue, admissionMax[i]))
        }
        // sieve.push(randomSieve(admissionMin[i], admissionMax[i]));
    }
    sieve[11] = 100;
    return sieve
}

function calculatePoToPp() {
    const randomPP = [];
    const randomPO = calculateRandomSieve();
    // const randomPO = [1, 3, 5, 7, 9, 10, 17, 18, 29, 31, 51, 122];
    randomPP.push(randomPO[0]);
    for (let i = 1; i < 12; i++) {
        randomPP.push(randomPO[i] - randomPO[i-1]);
    }
    console.log(randomPO); // Проверка
    return randomPP
}

function calculatePpToWeight() {
    const randomWeight = [];
    const randomPP = calculatePoToPp();
    for (let i = 0; i < 12; i++) {
        randomWeight.push(parseFloat(randomPP[i] * 100));
    }
    return randomWeight
}

 
function addSieve() { //Функция для добавления блока с выводом значений
    const main = document.querySelector("main");
    const newDiv = document.createElement("div");
    newDiv.className = "randomSieve";
    const quantityOfSieve = document.getElementById("quantity").value;

    for (let i = 0; i < quantityOfSieve; i++) {
    const table = document.createElement("table");
    // Добавляем саму таблицу
        for (let row = 1; row < 5; row++) { 
            const tr = document.createElement("tr");

            for (let col = 1; col < 13; col++) {
                const td = document.createElement("td");
                const cellId = `cell_${row}_${col}`;
                td.className = cellId;
                tr.appendChild(td);
            }
            table.append(tr);
        }
            newDiv.append(table);
            main.append(newDiv);

            // Заполнение данными
            const admissionValues = [70, 40, 20, 15, 10, 5, 2.5, 1.25, 0.63, 0.16, 0.05, "<"];

            for (let i = 0; i < 12; i++) { //Номер сита
                const cellValue = document.querySelector(`.cell_1_${i+1}`);
                    cellValue.textContent = admissionValues[i];
            }
            // for (let i = 0; i < 12; i++) { //Значения массы
            //     const cellValue = document.getElementById(`cell_2_${i+1}`);
            //     cellValue.textContent = 
            // }
            // for (let i = 0; i < 12; i++) { //Значения ПО
            //     const cellValue = document.getElementById(`cell_3_${i+1}`);
            //     cellValue.textContent = 
            // }
            // for (let i = 0; i < 12; i++) { //Значения ПП
            //     const cellValue = document.getElementById(`cell_4_${i+1}`);
            //     cellValue.textContent = 
            // }
    }
}