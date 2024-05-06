const API_URL =
  "https://v6.exchangerate-api.com/v6/597d5d6a0f216af25ef4f361/latest/USD";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (select of dropdown) {
  for (let currcode in countryList) {
    // console.log(currcode, countryList[currcode]);
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    select.append(newOption);
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

updateFlag = (element) => {
  // console.log(element.value); //INR
  currcode = element.value;
  countryCode = countryList[currcode];
  // console.log(countryCode); //IN
  let img = element.parentElement.querySelector("img");
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  img.src = newSrc;
};

let updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  // console.log(amount);
  let amtVal = amount.value;
  // console.log(amtVal);
  // console.log(fromCurr.value);
  if ((amtVal = "" || amtVal < 1)) {
    amtVal = 1;
    amount.value = "1";
  }
  const API = `https://v6.exchangerate-api.com/v6/597d5d6a0f216af25ef4f361/latest/${fromCurr.value}`;
  let response = await fetch(API);
  let data = await response.json();
  let rate = data.conversion_rates[toCurr.value];
  let finalAmount = (amount.value * rate).toFixed(2);
  msg.innerText = `${amount.value}${fromCurr.value}=${finalAmount}${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  // console.log("btn is clicked");
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
