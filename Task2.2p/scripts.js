var initialText = "SIT725_Task1.4P";

function fetchResult() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const operation = document.getElementById('operation').value;

    
    const num1Value = parseFloat(num1);
    const num2Value = parseFloat(num2);

    
    if (isNaN(num1Value) || isNaN(num2Value)) {
        alert('Please enter both numbers.');
        return;
    }

    
    fetch('http://localhost:3000/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            num1: num1Value,
            num2: num2Value,
            operation: operation
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result !== undefined) {
            document.getElementById('result').innerText = 'Result: ' + data.result;
        } else {
            document.getElementById('result').innerText = 'Error: ' + data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error occurred';
    });
}

function changeText() {
    var heading = document.getElementById("heading");
    heading.textContent = "Submission: Jay Kumar";
}

function resetText() {
    var heading = document.getElementById("heading");
    heading.textContent = initialText;
}
