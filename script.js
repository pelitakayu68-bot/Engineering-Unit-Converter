// Database of conversion factors relative to a base unit
const conversionFactors = {
    length: { meters: 1, kilometers: 1000, miles: 1609.34, feet: 0.3048, inches: 0.0254 },
    mass: { kilograms: 1, grams: 0.001, pounds: 0.453592, ounces: 0.0283495 },
    temp: "formula_based" // Temperature requires specific C++ style formulas
};

// Data Persistence: Load history from storage [Requirement: 35]
let historyLog = JSON.parse(localStorage.getItem('engHistory')) || [];

function updateUnits() {
    const type = document.getElementById('unitType').value;
    const fromSelect = document.getElementById('fromUnit');
    const toSelect = document.getElementById('toUnit');
    
    fromSelect.innerHTML = ""; toSelect.innerHTML = "";
    
    const units = type === 'temp' ? ['Celsius', 'Fahrenheit', 'Kelvin'] : Object.keys(conversionFactors[type]);
    
    units.forEach(unit => {
        fromSelect.add(new Option(unit.toUpperCase(), unit));
        toSelect.add(new Option(unit.toUpperCase(), unit));
    });
    convert();
}

function convert() {
    const type = document.getElementById('unitType').value;
    const inputVal = parseFloat(document.getElementById('inputValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const output = document.getElementById('outputValue');

    // Input Validation (Error Handling) [Requirement: 36]
    if (isNaN(inputVal)) {
        document.getElementById('err-msg').style.display = 'block';
        output.innerText = "0.0000";
        return;
    }
    document.getElementById('err-msg').style.display = 'none';

    let result;
    // Selection Logic for Unit Types [Requirement: 28]
    if (type === 'temp') {
        result = runThermalConversion(inputVal, fromUnit, toUnit);
    } else {
        // Calculation logic using factors
        const baseValue = inputVal * conversionFactors[type][fromUnit];
        result = baseValue / conversionFactors[type][toUnit];
    }

    output.innerText = result.toFixed(4);
}

// Dedicated function for thermal selection logic [Requirement: 28]
function runThermalConversion(val, from, to) {
    let celsius;
    if (from === "Celsius") celsius = val;
    else if (from === "Fahrenheit") celsius = (val - 32) * 5/9;
    else celsius = val - 273.15;

    if (to === "Celsius") return celsius;
    if (to === "Fahrenheit") return (celsius * 9/5) + 32;
    return celsius + 273.15;
}

function saveConversion() {
    const logEntry = {
        timestamp: new Date().toLocaleTimeString(),
        details: `${document.getElementById('inputValue').value} ${document.getElementById('fromUnit').value}`,
        target: `${document.getElementById('outputValue').innerText} ${document.getElementById('toUnit').value}`
    };
    
    // Array Storage [Requirement: 28]
    historyLog.unshift(logEntry);
    if(historyLog.length > 10) historyLog.pop(); // Keep only last 10 entries
    
    localStorage.setItem('engHistory', JSON.stringify(historyLog));
    renderLog();
}

function renderLog() {
    const body = document.getElementById('historyBody');
    body.innerHTML = '';
    
    // Loop for processing multiple entries [Requirement: 28]
    historyLog.forEach(item => {
        const row = `<tr>
            <td>${item.timestamp}</td>
            <td>${item.details.toUpperCase()}</td>
            <td style="color: var(--accent-blue); font-weight:bold">${item.target}</td>
        </tr>`;
        body.innerHTML += row;
    });
}

function clearHistory() {
    if(confirm("Wipe all historical calculation data?")) {
        historyLog = [];
        localStorage.removeItem('engHistory');
        renderLog();
    }
}

// Initialize system
updateUnits();
renderLog();
