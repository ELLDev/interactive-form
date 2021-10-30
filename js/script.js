const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const emailHint = document.querySelector("#email-hint");
const occupationSelect = document.querySelector('[name="user-title"]');
const otherOccupationTextField = document.querySelector(
  "input.other-occupation"
);
const designSelect = document.querySelector('[id="shirt-designs"]');
const colorSelect = document.querySelector('[id="color"]');
const ratsInCostumesColors = document.querySelectorAll(
  '[data-theme="rat costumes"]'
);
const iLoveRatsColors = document.querySelectorAll('[data-theme="heart rats"]');
const activities = document.querySelector("fieldset.activities");
const checkBoxes = document.querySelectorAll('[type="checkbox"]');
const registrationCostDisplay = document.querySelector("p.activities-cost");
let registrationCost = 0;
const paymentMethods = document.querySelector("fieldset.payment-methods");
const paymentSelect = document.querySelector('[id="payment"]');
const creditCardSection = document.querySelector("div.credit-card");
const payPalSection = document.querySelector("div.paypal");
const bitcoinSection = document.querySelector("div.bitcoin");
const creditCardNumber = document.querySelector("#cc-num");
const creditCardCVV = document.querySelector("#cvv");
const zipCode = document.querySelector("#zip");
const registrationButton = document.querySelector("form button");
const form = document.querySelector("form");

const displayShirtColors = (shirtTheme) => {
  for (let index = 0; index < ratsInCostumesColors.length; index++) {
    if (shirtTheme === "rat costumes") {
      ratsInCostumesColors[index].hidden = false;
      iLoveRatsColors[index].hidden = true;
    } else {
      ratsInCostumesColors[index].hidden = true;
      iLoveRatsColors[index].hidden = false;
    }
  }
};

const highlightNameInput = () => {
  if (!validateName()) {
    nameInput.parentElement.className = "not-valid";
    nameInput.nextElementSibling.style.display = "block";
  } else {
    nameInput.parentElement.className = "valid";
    nameInput.nextElementSibling.style.display = "none";
  }
};

const highlightEmailInput = () => {
  if (!validateEmail()) {
    emailInput.parentElement.className = "not-valid";
    emailInput.nextElementSibling.style.display = "block";
  } else {
    emailInput.parentElement.className = "valid";
    emailInput.nextElementSibling.style.display = "none";
  }
};

const highlightActivitiesFieldset = () => {
  if (!validateActivities()) {
    activities.firstElementChild.className = "not-valid";
    activities.className = "activities not-valid";
  } else {
    activities.firstElementChild.className = "valid";
    activities.className = "activities valid";
  }
};

const highlightCCNumberInput = () => {
  if (!validateCCNumber()) {
    paymentMethods.className = "payment-methods not-valid";
    creditCardNumber.nextElementSibling.style.display = "block";
  } else {
    creditCardNumber.nextElementSibling.style.display = "none";
  }
  if (validateCreditCard()) {
    paymentMethods.className = "payment-methods valid";
  } else {
    paymentMethods.className = "payment-methods not-valid";
  }
};

const highlightZipCodeInput = () => {
  if (!validateZipCode()) {
    paymentMethods.className = "payment-methods not-valid";
    zipCode.nextElementSibling.style.display = "block";
  } else {
    zipCode.nextElementSibling.style.display = "none";
  }
  if (validateCreditCard()) {
    paymentMethods.className = "payment-methods valid";
  } else {
    paymentMethods.className = "payment-methods not-valid";
  }
};

const highLightCVVInput = () => {
  if (!validateCVV()) {
    paymentMethods.className = "payment-methods not-valid";
    creditCardCVV.nextElementSibling.style.display = "block";
  } else {
    creditCardCVV.nextElementSibling.style.display = "none";
  }
  if (validateCreditCard()) {
    paymentMethods.className = "payment-methods valid";
  } else {
    paymentMethods.className = "payment-methods not-valid";
  }
};

const highlightFields = () => {
  highlightNameInput();
  highlightEmailInput();
  highlightActivitiesFieldset();
  highlightCCNumberInput();
  highlightZipCodeInput();
  highLightCVVInput();
};

const validateName = () => {
  return /\w{1,}\s*?$/.test(nameInput.value);
};

const validateEmail = () => {
  if (emailInput.value.trim().length === 0) {
    emailHint.innerText = "Email field cannot be blank";
  } else {    
    emailHint.innerText = "Email address must be formatted correctly";
  }
  // RFC 5322 Regex
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailInput.value
  );
};

/**
 * Unchecks and dims an activity if there are conflicting schedules
 */
const validateActivitiesSchedule = (checkboxIndex) => {
  for (let index = 1; index < checkBoxes.length; index++) {
    if (
      checkBoxes[checkboxIndex].attributes["data-day-and-time"].value ===
        checkBoxes[index].attributes["data-day-and-time"].value &&
      index !== checkboxIndex
    ) {
      if (checkBoxes[checkboxIndex].checked && !checkBoxes[index].checked) {
        checkBoxes[index].parentElement.className = "disabled";
      }
      if (!checkBoxes[checkboxIndex].checked && !checkBoxes[index].checked) {
        checkBoxes[index].parentElement.className = "";
      }
      if (checkBoxes[checkboxIndex].checked && checkBoxes[index].checked) {
        checkBoxes[checkboxIndex].parentElement.className = "";
        checkBoxes[index].parentElement.className = "disabled";
        checkBoxes[index].checked = false;
        registrationCost -= 100;
      }
    }
  }
};

const validateActivities = () => {
  return registrationCost > 0;
};

const validateCCNumber = () => {
  return /^\d{13,16}$/.test(creditCardNumber.value);
};

const validateZipCode = () => {
  return /^\d{5}$/.test(zipCode.value);
};

const validateCVV = () => {
  return /^\d{3}$/.test(creditCardCVV.value);
};

const validateCreditCard = () => {
  if (validateCCNumber() && validateZipCode() && validateCVV()) {
    return true;
  }
  return false;
};

nameInput.addEventListener("keyup", () => {
  highlightNameInput();
});

emailInput.addEventListener("keyup", () => {
  highlightEmailInput();
});

occupationSelect.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherOccupationTextField.style.display = "";
  } else {
    otherOccupationTextField.style.display = "none";
  }
});

creditCardNumber.addEventListener("keyup", () => {
  highlightCCNumberInput();
});

zipCode.addEventListener("keyup", () => {
  highlightZipCodeInput();
});

creditCardCVV.addEventListener("keyup", () => {
  highLightCVVInput();
});

designSelect.addEventListener("change", (e) => {
  colorSelect.disabled = false;
  colorSelect.insertAdjacentHTML(
    "afterbegin",
    `<option selected hidden>Select a color</option>`
  );
  displayShirtColors(e.target.value);
});

activities.addEventListener("change", (e) => {
  if (e.target.tagName === "INPUT") {
    if (e.target.checked) {
      registrationCost += parseInt(e.target.attributes["data-cost"].value);
    } else {
      registrationCost -= parseInt(e.target.attributes["data-cost"].value);
    }
    registrationCostDisplay.innerHTML = `Total: $${registrationCost}`;
  }
  highlightActivitiesFieldset();
});

checkBoxes.forEach((checkbox, checkboxIndex) => {
  checkboxIndex++;
  checkbox.addEventListener("focus", (e) => {
    e.target.parentElement.className = "focus";
  });
  checkbox.addEventListener("blur", (e) => {
    e.target.parentElement.className = "";
  });
  checkbox.addEventListener("click", (e) => {
    if (checkbox.parentElement.className === "disabled") {
      e.stopPropagation();
    } else {
      if (checkboxIndex >= 2) {
        validateActivitiesSchedule(checkboxIndex - 1);
      }
    }
  });
});

paymentSelect.addEventListener("change", (e) => {
  if (e.target.value === "credit-card") {
    creditCardSection.style.display = "";
    payPalSection.style.display = "none";
    bitcoinSection.style.display = "none";
  } else if (e.target.value === "paypal") {
    creditCardSection.style.display = "none";
    payPalSection.style.display = "";
    bitcoinSection.style.display = "none";
  } else if (e.target.value === "bitcoin") {
    creditCardSection.style.display = "none";
    payPalSection.style.display = "none";
    bitcoinSection.style.display = "";
  }
});

form.addEventListener("submit", (e) => {
  let validCredentials = false;

  if (validateName() && validateEmail() && validateActivities()) {
    validCredentials = true;
  }
  if (paymentSelect.options[1].selected === true) {
    if (!validateCreditCard()) {
      validCredentials = false;
    }
  }
  if (!validCredentials) {
    highlightFields();
    e.preventDefault();
  }
});

paymentSelect.options[1].selected = true;
payPalSection.style.display = "none";
bitcoinSection.style.display = "none";
colorSelect.disabled = true;
otherOccupationTextField.style.display = "none";
nameInput.focus();
