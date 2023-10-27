"use strict";
const cardNumber = document.getElementById("cardNumber");
const expirationdate = document.getElementById("expirationdate");
const inputElement = document.getElementById("expirationdate");
const paymentIcon = document.getElementById("paymentIcon");
const planSection = document.getElementById("plans");
const body = document.getElementById("body");
const planPrice = document.querySelector(".planPrice");
const priceAfterTax = document.querySelector(".priceAfterTax");
const methods = document.querySelectorAll(".method_checkbox")
const paybutton = document.querySelector(".paybutton")
const popup = document.querySelector(".popup")
const closebutton = document.querySelector(".div-9-congrats")
let currentPlan = 250;

paybutton.addEventListener("click", () => {
  popup.style.display = "flex"
  body.style.overflow = "hidden"
  window.scrollTo(0, 0)
})
closebutton.addEventListener("click", () => {
  body.style.overflow = "scroll"

  popup.style.display = "none"
})

function checkPlan() {
    planSection.style.display = "flex"
    planPrice.innerHTML = currentPlan
    priceAfterTax.innerHTML = currentPlan * (0.20) + currentPlan;

}

window.onload = checkPlan()

methods.forEach(method => {
  method.addEventListener('click', () => {
    // Active current checkbox
    method.checked = true;
 
    // Loop all checkboxes and disable all except current
    methods.forEach(othermethods => {
      if (othermethods !== method) {
        othermethods.checked = false;
       }
    });
  });
 });

// format expiration date

function formatString(event) {
    var inputChar = String.fromCharCode(event.keyCode);
    var code = event.keyCode;
    var allowedKeys = [8];
  
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }
  
    var inputValue = event.target.value;
    
    // Define the regular expressions for formatting
    var regexPatterns = [
      { pattern: /^([1-9]\/|[2-9])$/, replacement: '0$1/' },
      { pattern: /^(0[1-9]|1[0-2])$/, replacement: '$1/' },
      { pattern: /^([0-1])([3-9])$/, replacement: '0$1/$2' },
      { pattern: /^(0?[1-9]|1[0-2])([0-9]{2})$/, replacement: '$1/$2' },
      { pattern: /^([0]+)\/|[0]+$/, replacement: '0' },
      { pattern: /[^\d\/]|^[\/]*$/, replacement: '' },
      { pattern: /\/\//g, replacement: '/' }
    ];
  
    // Apply the formatting based on the regex patterns
    for (var i = 0; i < regexPatterns.length; i++) {
      inputValue = inputValue.replace(regexPatterns[i].pattern, regexPatterns[i].replacement);
    }
  
    // Update the input value
    event.target.value = inputValue;
  }
  
  inputElement.addEventListener("input", formatString);
  
      
  
// check credit card type
 function creditCardType(cc) {
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');  
    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');
  
    if (visa.test(cc)) {
      return 'Visa';
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
      return 'Mastercard';
    }
    return undefined;
  }
  cardNumber.addEventListener("change", () => {
      if (creditCardType(cardNumber.value) === "Visa") {
        paymentIcon.style.display = "initial";
        paymentIcon.src = "../assets/visa.png";
      }
      else if(creditCardType(cardNumber.value) === "Mastercard") {
        paymentIcon.src = "../assets/mastercard.png";
        paymentIcon.style.display = "initial";
      }
      else {
        paymentIcon.style.display = "none";
      }
})