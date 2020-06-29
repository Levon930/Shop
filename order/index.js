const inputs = document.querySelectorAll("input");
const message = document.querySelector("textarea");
const Submit = document.querySelector("button");

function validation(validElem, regExp) {
  console.log(validElem.value);

  if (regExp.test(validElem.value) === false) {
    validElem.style.border = "2px solid red";
    validElem.value = "";
    validElem.placeholder = "Enter correct value";
    return false;
  } else {
    phon.style.border = "";
  }
}
function postData(data) {
  fetch(URL, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
inputs[3].addEventListener("blur", () => {
  validation(inputs[3], /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
});
inputs[2].addEventListener("blur", () => {
  validation(
    inputs[2],
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
});
Submit.addEventListener("click", (e) => {
  e.preventDefault();

  let data = drawForm(
    elem[0].value,
    elem[1].value,
    elem[2].value,
    elem[3].value.message.value
  );

  // postData(url, data);
});
