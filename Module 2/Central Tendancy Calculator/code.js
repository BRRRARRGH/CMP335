let List = ""
let numbers = []

function validateAndAdd(){
    let minimum = document.getElementById("minValue").value;
    let maximum = document.getElementById("maxValue").value;
    let number = document.getElementById("number").value;
    if(minimum === "")
    {
        alert("Please enter a minimum value");
    }
    else if(maximum === "")
    {
        alert("Please enter a maximum value");
    }
    else if(number === "")
    {
        alert("Please enter a number to add");
    }
    else if(isNaN(minimum) || isNaN(maximum) || isNaN(number))
    {
        alert("Please enter valid numbers");
    }
    else if(parseInt(minimum) > parseInt(maximum))
    {
        alert("Minimum value cannot be greater than maximum value");
    }
    else if(parseInt(number) < parseInt(minimum) || parseInt(number) > parseInt(maximum))
    {
        alert("Number must be between minimum and maximum values");
    }
    else
    {
        document.getElementById("minValue").disabled = true;
        document.getElementById("maxValue").disabled = true;
        numbers.push(parseInt(number));
        numbers.sort(function(a, b){return a-b});
        List += number + '<br>';
        document.getElementById("List-Text").innerHTML = List;
        document.getElementById("number").value = "";
        mean()
        median()
        mode()
    }
}

function mean()
{
    let sum = 0;
    for (let i = 0; i < numbers.length; i++)
    {
        sum += numbers[i];
    } 
    let mean = sum / numbers.length;
    document.getElementById("mean").innerHTML = "mean: " + mean;
}
function median()
{
    if(numbers.length % 2 == 0)
    {
        let median = (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2;
        document.getElementById("median").innerHTML = "median: " + median;
    }
    else
    {
        let median = numbers[Math.floor(numbers.length / 2)];
        document.getElementById("median").innerHTML = "median: " + median;
    }

    console.log(numbers);
}
function mode()
{
    let dict = new Map();
    for (num of numbers)
    {
        dict.set(num, (dict.get(num) || 0) + 1);
    }
    let max = 0;
    for (let [key, value] of dict)
    {
        if (value > max)
        {
            max = value;
        }
    }

    let modes = [];
    for (let [key, value] of dict)
    {
        if (value == max)
        {
            modes.push(key);
        }
    }
    document.getElementById("mode").innerHTML = "mode: " + modes.join(", ");
}

function clearList()
{
    List = "";
    numbers.length = 0;
    document.getElementById("List-Text").innerHTML = List;
    document.getElementById("minValue").disabled = false;
    document.getElementById("maxValue").disabled = false;
    document.getElementById("minValue").value = "";
    document.getElementById("maxValue").value = "";
    document.getElementById("mean").innerHTML = "mean: ";
    document.getElementById("median").innerHTML = "median: ";
    document.getElementById("mode").innerHTML = "mode: ";
}
