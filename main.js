// define items 
let input = document.getElementById("screen-input");
let calculate = document.getElementById("calculate");
let multi = document.getElementById("multiplate");
let change_sign = document.getElementById("change-sign");
let clear = document.getElementById("clear-c");
let clear_entry = document.getElementById("clear-entry");
// get number when click it 
let nums = document.querySelectorAll(".number");

nums.forEach(num => {
  num.addEventListener("click", function () {

    input.value += this.innerText;
  });
});
// get operator when click it
let operators = document.querySelectorAll(".operator");

operators.forEach(operator => {
  operator.addEventListener("click", function () {
    if (operator.innerText == "=" || operator.innerText === "C" || operator.innerText === "CE" || operator.innerText === "±") {
      return;
    }
    // i can use nested but it makes it diffcult to read (idk) - give me feedback
    input.value += this.innerText;

  });
});

// clear entry-c and clear-c
clear.addEventListener("click", function () {
  input.value = null;
});
clear_entry.addEventListener("click", function () {
  input.value = input.value.slice(0, -1);
});

// change sign button
change_sign.addEventListener("click", function () {
  let temp_value = input.value;
  let num = Number(input.value);
  input.value = -num;
  if (isNaN(input.value)) {
    input.value = temp_value;
    // i will make another version that take last number and convert sign  
    console.warn("Wait for another version")
  }

});

// calculate button 
calculate.addEventListener("click", function () {
  let value = input.value;

  try {
    // replace operators with real ones
    value = value.replace(/×/g, "*").replace(/÷/g, "/").replace(/%/g, "/100").replace(/x²/g, "** 2").replace(/√(\d+)/g, "Math.sqrt($1)");
    let result = Function("return " + value)();
    input.value = result;

  } catch (e) {
    // error 
    input.value = "Syntax Error";
  }


});


// keyboard allow function 

input.addEventListener("keydown", function (e) {
  const allowed = "0123456789+-*/×÷.%";
  
  if (["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    return;
  }

  if (!allowed.includes(e.key)) {
    e.preventDefault();
  }
});

