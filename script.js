const container = document.querySelector(".container");
const btn = document.querySelectorAll("button");
const display = document.querySelector(".display");
let key = null;
let var1 = null;
let var2 = null;
let operand1 = null;
let operand2 = null;
let result = null;
let newInsert = null;
let len = 0;
let check = 0;
let displayValue = "0";
document.addEventListener("keydown",(e)=>{
    key = document.querySelector(`button[data-key = "${e.key}"]`);
    key.click();
});
function buttonclicked()
{    
    btn.forEach((button)=>
    {
        button.addEventListener("click",()=>{
            if(button.classList.contains("operand"))
            {
                inputOperand(button.dataset.key);
                updateDisplay();
            }
            else if(button.classList.contains("operator"))
            {
                inputOperator(button.dataset.key);
                updateDisplay();
            }
            else if(button.classList.contains("clear"))
            {
                clearDisplay();
            }
            else if(button.classList.contains("delete"))
            {
                deletePrevious();
                updateDisplay();
            }
            else if(button.classList.contains("plus/minus"))
            {
                allPlusOrMinus(displayValue);
                updateDisplay();
            }
            else if(button.classList.contains("dot")){
                dotOperator(button.dataset.key);
                updateDisplay();
            }
            else if(button.classList.contains("percent")){
                Percent(displayValue);
                updateDisplay();
            }
        });
    });
}
buttonclicked();

function updateDisplay()
{
    display.innerText = displayValue;
    if(displayValue.length>10)
    {
        display.innerText = displayValue.substring(0, 10);
    }
}
updateDisplay();

function inputOperand(value)
{
    if(operand1 === null && check == 0)
    {
        if(displayValue === "0"|| displayValue === 0)
        {
            displayValue = value;
        }
        else
        {
            displayValue = displayValue + value;
        }
    }
    else if(displayValue == var1 && check == 1 && operand1 == null)
    {
        displayValue = value;
        var1 = null;
        check = 0;
    }
    else if(displayValue == var1 && check == 1 && operand1 !=null)
    {
        displayValue = value;
        check = 0;
    }
    else{
        if(displayValue == var1 && check == 0)
        {
            displayValue = value;
        }
        else{
            displayValue = displayValue + value;
        }
    }
    newInsert = value;
    console.log(newInsert);
}
function inputOperator(value)
{
    if(value == "=")
    {
        if(operand1 == null)
        {
            displayValue = displayValue;
        }
        else if(operand2 != null)
        {
            var2 = displayValue;
            result = operate(operand2, parseFloat(var1), parseFloat(var2))
            if(result === "Error")
            {
                displayValue = "Error";
            }
            else
            {   
                displayValue = roundOff(result, 9).toString();
                var1 = displayValue;
                var2 = null;
                operand1 = null;
                operand2 = null;
                result = null;
            }
        }
        else{
            var2 = displayValue;
            result = operate(operand1, parseFloat(var1), parseFloat(var2))
            if(result === "Error")
            {
                displayValue = "Error";
            }
            else{
                displayValue = roundOff(result,9).toString();
                var1 = displayValue;
                var2 = null;
                operand1 = null;
                operand2 = null;
                result = null;
            }
        }
        check = 1;
    }
    else
    {
        if(operand1 === null)
        {
            var1 = displayValue;
            operand1 = value;
        }
        else if(operand1 != null && operand2 === null)
        {
            var2 = displayValue;
            operand2 = value;
            result = operate(operand1, parseFloat(var1), parseFloat(var2));
            displayValue = roundOff(result, 9).toString();
            var1 = displayValue;
            result = null;
        }
        else if(operand1 != null && operand2 != null)
        {
            var2 = displayValue;
            result = operate(operand2, parseFloat(var1), parseFloat(var2));
            displayValue = roundOff(result, 9).toString();
            var1 = displayValue;
            operand2 = value;
            result = null;
        }
        newInsert = value;
        console.log(newInsert);
    }
}
function operate(op, num1, num2)
{
    if(op == "+")
    {
        return num1+num2;
    }
    else if(op == "-")
    {
        return num1-num2;
    }
    else if(op == "*")
    {
        return num1*num2;
    }
    else if(op == "/")
    {
        if(num2 == 0)
        {
            return "Error";
        }
        else{
            return num1/num2;
        }
    }
    
}
function clearDisplay()
{
    var1 = null;
    var2 = null;
    displayValue = "0";
    operand1 = null;
    operand2 = null;
    result = null;
    key = null;
    check = 0;
    updateDisplay();
}
function deletePrevious()
{
    if(!isNaN(newInsert) && operand1 == null)
    {
        len = displayValue.length;
        newInsert = displayValue.substring(len-2,len-1);
        displayValue = displayValue.substring(0, len-1);
        if(displayValue == "")
        {
            displayValue = "0";
        }
    }
    else
    {
        if(operand1 != null && var2 == null)
        {
            operand1 = null;
            displayValue = var1;
            len = displayValue.length;
            newInsert = var1.substring(len-2,len-1);
            console.log("1");
        }
        else if(operand1 != null && operand2 != null)
        {
            if(!isNaN(newInsert) || newInsert == ".")
            {
                len = displayValue.length;
                newInsert = displayValue.substring(len-2,len-1);
                displayValue = displayValue.substring(0,len-1);
                if(displayValue == "")
                {
                    displayValue = "0";
                    newInsert = operand2;
                }
                
                console.log("2");
            }
            else if(operand2 != null)
            {
                operand2 = null;
                displayValue = var2;
                len = displayValue.length;
                newInsert = displayValue.substring(len-2,len-1);
                console.log("3");
            }
        }
        else if(operand1 != null && operand2 == null)
        {
            if(!isNaN(newInsert) || newInsert == "0")
            {
                len = displayValue.length;
                newInsert = displayValue.substring(len-2,len-1);
                displayValue = displayValue.substring(0,len-1);
                if(displayValue == "")
                {
                    newInsert = operand1;
                    displayValue = 0;
                    var2 = null;
                }
                console.log("4");
            }
        }
    }
}
function allPlusOrMinus(num)
{
    displayValue = (num*-1).toString();
}
function dotOperator(dot)
{
    if(displayValue === var1 || displayValue === var2)
    {
        displayValue = "0";
        displayValue = displayValue+ dot;
    }
    else if(!displayValue.includes(dot)){
        displayValue = displayValue + dot;
    }
}
function Percent(num)
{
    displayValue = (num/100).toString();
}
function roundOff(num, places)
{
    return parseFloat(Math.round(num+"e"+places)+"e-"+places);
}
