// Ģenerē ievades laukus
function generateInputs() {
    // Iegūstam ievadīto gadu skaitu no lietotāja
    var years = parseInt(document.getElementById('years').value);
    // Iegūstam ievades lauku konteineri
    var cashFlowInputs = document.getElementById('cashFlowInputs');
    // Notīra iepriekšējos ievades laukus
    cashFlowInputs.innerHTML = '';

    // Izveido ievades laukus katram gadam
    for (var i = 1; i <= years; i++) {
        // Izveido teksta elementu un pievieno tekstu
        var label = document.createElement('label');
        label.innerHTML = "Gads " + i + " naudas plūsma:";

        // Izveido ievades lauku
        var input = document.createElement('input');
        input.type = 'number';
        input.id = 'cashFlowYear' + i;
        input.required = true;

        // Pievieno ievades laukus HTML
        cashFlowInputs.appendChild(label);
        cashFlowInputs.appendChild(input);
    }
}

// Aprēķina ieguldījuma atmaksas periodu
function calculateROI() {
    // Iegūstam sākotnējo ieguldījumu
    var initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    // Iegūstam izvēlēto valūtu
    var currency = document.getElementById('currency').value;
    // Iegūstam ievadīto gadu skaitu
    var years = parseInt(document.getElementById('years').value);

    // Pārbauda, vai ievadītie dati ir skaitļi
    if (isNaN(initialInvestment) || isNaN(years)) {
        alert("Lūdzu, ievadiet derīgus datus.");
        return;
    }

    // Inicializē mainīgos
    var totalCashFlow = 0;
    var cashFlows = [];

    // Aprēķina kopējo naudas plūsmu un ievada to masīvā
    for (var i = 1; i <= years; i++) {
        var cashFlow = parseFloat(document.getElementById('cashFlowYear' + i).value);
        // Pārbauda, vai ievadītais datu ir skaitlis
        if (isNaN(cashFlow)) {
            alert("Lūdzu, ievadiet derīgus datus visiem gadiem.");
            return;
        }
        cashFlows.push(cashFlow);
        totalCashFlow += cashFlow;
    }

    // Aprēķina vidējo gada naudas plūsmu un atmaksas periodu
    var averageAnnualCashFlow = totalCashFlow / years;
    var paybackPeriod = initialInvestment / averageAnnualCashFlow;

    // Izveido rezultātu tekstu
    var resultText = "Atmaksas periods: " + paybackPeriod.toFixed(2) + " gadi<br>";
    resultText += "Vidējā gada naudas plūsma: " + averageAnnualCashFlow.toFixed(2) + " " + currency + "<br>";
    resultText += "Naudas plūsma pēc gadiem: " + cashFlows.map(flow => flow + " " + currency).join(', ');

    // Ievada rezultātu HTML
    document.getElementById('result').innerHTML = resultText;

    // !!! Postroenie grafika
    var ctx = document.getElementById('cashFlowChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: years }, (_, i) => 'Gads ' + (i + 1)),
            datasets: [{
                label: 'Gada naudas plūsma',
                data: cashFlows,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white', // Baltā krāsa teksta vērtībām Y asi
                        font: {
                            weight: 'bold' // Treknais fonta stils teksta vērtībām Y asi
                        }
                    },
                    grid: {
                        color: 'white', // Baltā krāsa galvenajām tīkla līnijām Y asi
                        lineWidth: 2 // Treknas līnijas galvenajām tīkla līnijām Y asi
                    }
                },
                x: {
                    ticks: {
                        color: 'white' // Baltā krāsa teksta vērtībām X asi
                    }
                }
            },
            responsive: false, // Izslēdz automātisko pielāgošanos izmēriem
            maintainAspectRatio: false, // Izslēdz proporciju saglabāšanu
            animation: false, // Izslēdz animāciju
            plugins: {
                legend: {
                    labels: {
                        color: 'white' // Baltā krāsa teksta leģendai
                    }
                }
            }
        }
    });
}

// Atiestata formas vērtības
function resetForm() {
    document.getElementById('initialInvestment').value = '';
    document.getElementById('years').value = '';

    // Atjauno lapu
    location.reload();
}

// !!! Maina fona attēlu
var backgroundImages = [
    'image2.jpg', /*https://www.pexels.com/*/
    'image3.jpg', /*https://www.pexels.com/*/
    'image4.jpg', /*https://www.pexels.com/*/
    'image5.jpg', /*https://www.pexels.com/*/
    'image6.jpg', /*https://www.pexels.com/*/
    'image7.jpg'  /*https://www.pexels.com/*/
];

var currentBackgroundIndex = 0;

function changeBackground() {
    document.body.style.backgroundImage = 'url(' + backgroundImages[currentBackgroundIndex] + ')';
    
    // Palielina indeksu, lai izvēlētos nākamo attēlu nākamajā nospiešanā
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
}
