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
    const value13 = parseInt(document.getElementById("value13").value);
    return [value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11,value12, value13]
}
                                                                        // Массив для проверки
function proverka() {
    const huinya = [0, 1970, 855, 1100, 1875, 1590, 695, 405, 375, 335, 275, 200, 325];
    for (let i = 1; i < 14; i++) {
        document.getElementById(`value${i}`).value = huinya[i-1];
    }
}

function getAdmission() { // Выдаёт допуски в ПО
    const soilType = document.getElementById("soil").value;
    // В список включены ячейки, которые не учитываются в ГОСТ`е (просто продублировал предыдущие)
    if (soilType === "c1") {
        return [0, 0, 0, 10, 20, 40, 20, 40, 35, 60, 45, 70, 55, 80, 55, 80, 70, 90, 70, 90, 75, 92, 80, 93, 100, 100]
    }
    else if (soilType === "c2") {
        return [0, 0, 0, 0, 0, 10, 0, 10, 10, 35, 25, 50, 35, 65, 35, 65, 55, 80, 55, 80, 65, 90, 75, 92, 100, 100]
    }
    else if (soilType === "c4") {
        return [0, 10, 15, 35, 28, 55, 28, 55, 40, 70, 50, 80, 60, 85, 60, 85, 80, 95, 80, 95, 91, 97, 95, 100, 100, 100]
    }
    else if (soilType === "c5") {
        return [0, 0, 0, 10, 25, 60, 25, 60, 45, 80, 57, 85, 67, 88, 67, 88, 80, 95, 80, 95, 90, 97, 95, 100, 100, 100]
    }
    else if (soilType === "c10") {
        return [0, 0, 0, 10, 25, 60, 25, 60, 45, 80, 57, 85, 57, 85, 57, 85, 71, 91, 71, 91, 87, 97, 95, 100, 100, 100]
    }
}
function calculatePP(weight) { // Расчёт ПП
    weight = getWeight();
    const PP = [];
    for (let i = 0; i < 13; i++) {
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
function randomSieve(min, max, targetValue) {
    const target = Math.max(min, Math.min(max, targetValue));
    const maxDeviation = target * 0.02; // Отклонение от целевого рассева
    
    const effectiveMin = Math.max(min, target - maxDeviation);
    const effectiveMax = Math.min(max, target + maxDeviation);

    if (effectiveMin >= effectiveMax) {
        return parseFloat(target.toFixed(2));
    }
    let random = Math.random() * (effectiveMax - effectiveMin) + effectiveMin;
    random = Math.round(random * 20) / 20;
    random = Math.max(min, Math.min(max, random));
    
    return parseFloat(random.toFixed(2));
}

function calculateRandomSieve() { // Возвращает ПО для рандомного рассева
    const target = []; // Значение ПО целевого рассева
    for (let i = 0; i < 13; i++) {
        target.push(calculatePO(calculatePP(getWeight()))[i])
    }

    const admissionMax = []; // Верх по допуску по ГОСТ
    for (let i = 1; i < 26; i += 2) {
        admissionMax.push(getAdmission()[i]);
    }

    const admissionMin = []; // Низ по допуску по ГОСТ
    for (let i = 0; i < 26; i += 2) {
        admissionMin.push(getAdmission()[i]);
    }

    const sieve = []; // Значения ПО для рандомного рассева
    for (let i = 0; i < 13; i++) {
        let minValue = admissionMin[i];
        if (i > 0) {
            minValue = Math.max(admissionMin[i], sieve[i - 1]);
        }
        if (minValue > admissionMax[i]) {
            sieve.push(admissionMax[i]);
        }
        else {
            sieve.push(randomSieve(minValue, admissionMax[i], target[i]))
        }
    }
    sieve[12] = 100;
    return sieve
}

function calculatePoToPp() {
    const randomPP = [];
    const randomPO = calculateRandomSieve();
    randomPP.push(randomPO[0]);
    for (let i = 1; i < 13; i++) {
        let PoToPp = (randomPO[i] - randomPO[i-1]).toFixed(2);
        randomPP.push(PoToPp);
    }
    return randomPP
}

function calculatePpToWeight() {
    const randomWeight = [];
    const randomPP = calculatePoToPp();
    for (let i = 0; i < 13; i++) {
        let PoToPp = parseFloat(randomPP[i] * 100).toFixed(0);
        randomWeight.push(PoToPp)
    }
    return randomWeight
}

 function addSieve() {
    const main = document.querySelector("main");
    const quantityOfSieve = document.getElementById("quantity").value || 1; // Колличество рассевов

    for (let i = 0; i < quantityOfSieve; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = "randomSieve";

        // Добавляем заголовок с порядковым номером
        const number = document.createElement("h2");
        number.textContent = `Рассев: ${i + 1}`;
        newDiv.append(number);

        const table = document.createElement("table");

        // Создание таблицу
        for (let row = 1; row < 5; row++) {
            const tr = document.createElement("tr");
            for (let col = 1; col < 14; col++) {
                const td = document.createElement("td");
                td.className = `cell_${row}_${col}`;
                tr.appendChild(td);
            }
            table.append(tr);
        }
        newDiv.append(table);
        main.append(newDiv);

        // Заполнение данными
        const admissionValues = [70, 40, 20, 15, 10, 5, 2.5, 1.25, 0.63, 0.315, 0.16, 0.05, "<"];

        for (let j = 0; j < 13; j++) {
            const valueOfSieve = newDiv.querySelector(`.cell_1_${j+1}`);
            valueOfSieve.textContent = admissionValues[j];
        }

        for (let j = 0; j < 13; j++) {
            let valueOfWeight = newDiv.querySelector(`.cell_2_${j+1}`);
            valueOfWeight.textContent = calculatePpToWeight()[j];
        }

        for (let j = 0; j < 13; j++) {
            let valueOfPP = newDiv.querySelector(`.cell_3_${j+1}`);
            valueOfPP.textContent = calculatePoToPp()[j];
        }

        for (let j = 0; j < 13; j++) {
            let valueOfPO = newDiv.querySelector(`.cell_4_${j+1}`);
            valueOfPO.textContent = calculateRandomSieve()[j];
        }
    }
}
