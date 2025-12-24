import countries from "./data.js";


let elCardsBox = document.querySelector("#cardsBox"); 
let elThemeToggler = document.querySelector(".theme_toggler");
let elFindInput = document.querySelector("#finder");
let elFilterSelect = document.querySelector("#filter");
let html = document.documentElement;


function UIWrite(array) {
  elCardsBox.innerHTML = "";

  array.forEach(el => {
    const { name, population, region, capital, flag } = el;

    elCardsBox.innerHTML += `
      <div class="country_card">
        <img src="${flag}" alt="${name}">
        <div class="card_dec">
          <span class="country_title">${name}</span>
          <div class="card_dec_details">
            <span><b>Population:</b> ${population}</span>
            <span><b>Region:</b> ${region}</span>
            <span><b>Capital:</b> ${capital ? capital : "No capital"}</span>
          </div>
        </div>
      </div>
    `;
  });
}

UIWrite(countries);


elThemeToggler.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    elThemeToggler.innerHTML = `
      <span class="theme_icon fa fa-sun"></span>
      <span class="theme_text">Light Mode</span>
    `;
    localStorage.setItem("theme", "dark");
  } else {
    elThemeToggler.innerHTML = `
      <span class="theme_icon fa fa-moon"></span>
      <span class="theme_text">Dark Mode</span>
    `;
    localStorage.setItem("theme", "light");
  }
});

let theme = localStorage.getItem("theme");

if (theme === "dark") {
  html.classList.add("dark");
  elThemeToggler.innerHTML = `
    <span class="theme_icon fa fa-sun"></span>
    <span class="theme_text">Light Mode</span>
  `;
} else {
  html.classList.remove("dark");
  elThemeToggler.innerHTML = `
    <span class="theme_icon fa fa-moon"></span>
    <span class="theme_text">Dark Mode</span>
  `;
}


function filter(reg) {
  let countriesFiltered = [];

  countries.forEach(el => {
    if (el.region.toLowerCase() === reg.toLowerCase()) {
      countriesFiltered.push(el);
    }
  });

  UIWrite(countriesFiltered);
}

elFilterSelect.addEventListener("change", (evt) => {
  elCardsBox.innerHTML = "";

  if (evt.target.value === "no") {
    UIWrite(countries);
  } else {
    filter(evt.target.value);
  }
});

function find(val) {
  let countriesFiltered = [];

  countries.forEach(el => {
    if (  
      el.name.toLowerCase().includes(val.trim().toLowerCase()) ||
      (el.capital && el.capital.toLowerCase().includes(val.trim().toLowerCase()))
    ) {
      countriesFiltered.push(el);
    }
  });

  UIWrite(countriesFiltered);
}

elFindInput.addEventListener("input", (evt) => {
  elCardsBox.innerHTML = "";
  find(evt.target.value);
});
