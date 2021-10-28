const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const occupationSelect = document.querySelector('[name="user-title"]');
const otherOccupationTextField = document.querySelector("input.other-occupation");
const designSelect = document.querySelector('[id="shirt-designs"]');
const colorSelect = document.querySelector('[id="color"]');
const ratsInCostumesColors = document.querySelectorAll('[data-theme="rat costumes"]');
const iLoveRatsColors = document.querySelectorAll('[data-theme="heart rats"]');
const activities = document.querySelector("fieldset.activities");
const registrationCostDisplay = document.querySelector("p.activities-cost");
let registrationCost = 0;
const paymentSelect = document.querySelector('[id="payment"]');
const creditCardSection = document.querySelector("div.credit-card");
const registrationButton = document.querySelector("form button")

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

const validateName = () => {
  if (nameInput.value.trim().length === 0) {
    return false;
  }
  return true;
};

const validateEmail = () => {
  // RFC 5322 Regex
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value);
};


const validateActivities = () => {
  if (registrationCost > 0) {
    return true;
  }
  return false;
};

const validateCreditCard = () => {
// TODO
};

occupationSelect.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherOccupationTextField.style.display = "";
  } else {
    otherOccupationTextField.style.display = "none";
  }
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
});

paymentSelect.addEventListener("change", (e) => {
  if (e.target.value === "credit-card") {
    creditCardSection.style.display = "";
  } else {
    creditCardSection.style.display = "none";
  }
});

registrationButton.addEventListener("click", (e) => {
  if (validateEmail()) {
    console.log("chiss");
  } else {
    console.log("dischissed")
  }
  e.preventDefault();
});

paymentSelect.options[1].selected = true;
colorSelect.disabled = true;
otherOccupationTextField.style.display = "none";
nameInput.focus();
