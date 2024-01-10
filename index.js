
// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
const countriesContainer = document.querySelector(".countries-container");

let countriesData = [];

async function fetchCountries() {
	await fetch(`https://restcountries.com/v3.1/all`)
		.then((res) => res.json())
		// .then((data) => console.log(data)); pour verifier les datas récup
		.then((data) => (countriesData = data));

	console.log(countriesData);
	displayCountries();
}

function displayCountries() {
	countriesContainer.innerHTML = countriesData
		.filter((country) => 
		country.translations.fra.common
		.toLowerCase()
		.includes(inputSearch.value.toLowerCase()))
		.slice(0, inputRange.value)
		.map(
			(country) =>
				`
    		<div class="card">
      		<img src="${country.flags.svg}" alt="drapeau ${
					country.translations.fra.common
				}">
      		<h2>${country.translations.fra.common}</h2>
					<h4>${country.capital}</h4>
					<p>population : ${country.population.toLocaleString()}</p>
    		</div>
    `
		)
		.join("");
}

fetchCountries();

inputSearch.addEventListener("input", displayCountries);
inputRange.addEventListener("input", () => {
	displayCountries();
	rangeValue.textContent = inputRange.value;
})
