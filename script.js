let apiKey = "3deb5d8b4961c92beeb93c74";
let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;


const dropList = document.querySelectorAll(".drop-list select");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
let getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code) {
        //for selecting USD and NPR as a default selected currency
        let selected;
        if(i == 0) {
            selected = currency_code == "AED" ? "selected" : "";
        }else if(i == 1) {
            selected = currency_code == "INR" ? "selected" : ""; 
        }
        //for creating a currency code as a value and text
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`
        //inserting options tags inside a select tag 
        dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }   
}
window.addEventListener("load", () => {
    getExchangeRate(); //to show getting exchange rate.. while loading
});

getButton.addEventListener("click", e => {
    e.preventDefault();  //To prevent form from submitting
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    let exchangeratetxt = document.querySelector(".exchange-rate");
    let amountval = amount.value;
    if(amountval == "" || amountval == "0") {  // to update a input field as 1 if the field is empty and zero
        amount.value = "1";
        amountval = 1;
    }
    exchangeratetxt.innerHTML = "Getting Exchange rate....";
    url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`; //fetching the data from url
    fetch(url).then(response => response.json().then(result=> {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountval*exchangeRate).toFixed(2);     
        exchangeratetxt.innerHTML = `${amountval} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`; }//update the DOM with retrived data
        ));
};
