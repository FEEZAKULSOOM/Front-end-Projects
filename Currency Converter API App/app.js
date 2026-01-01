// ================= API CONFIG =================
const API_KEY = "6d6f9c41abe1cd52eb9196b2";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

// ================= DOM ELEMENTS =================
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// ================= DROPDOWN POPULATION =================
for (let select of dropDowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    }
    if (select.name === "to" && currCode === "PKR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// ================= FLAG UPDATE =================
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");

  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// ================= EXCHANGE RATE =================
const updateExchangeRate = async () => {
  try {
    let amount = document.querySelector(".amount input");
    let amtVal = Number(amount.value);

    if (amtVal < 1 || isNaN(amtVal)) {
      amtVal = 1;
      amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value}`;
    console.log("Fetching:", URL);

    let response = await fetch(URL);
    let data = await response.json();

    if (data.result !== "success") {
      throw new Error("API error");
    }

    let rate = data.conversion_rates[toCurr.value];
    let finalAmt = amtVal * rate;

    msg.innerText =
      `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;

  } catch (error) {
    msg.innerText = "Failed to fetch exchange rate ❌";
    console.error(error);
  }
};

// ================= EVENTS =================
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", updateExchangeRate);
