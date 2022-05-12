const aside = document.querySelector("aside");
const skolmaten = document.getElementById("skolmaten");
const CampusK = document.getElementById("CampusK");
let output = "";
const föregående = document.getElementById("föregående");
const nästa = document.getElementById("nästa");
const vecka = document.getElementById("vecka");
const dagar = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];
const content = document.getElementById("content");
let week = 2;

nästa.onclick = function () {
  if (week < 5) {
    output = " ";
    vecka.innerHTML = " ";
    getMatsedeln();
    week = week + 1;
  }
}

föregående.onclick = function() {
  if (week > 0) {
    output = " ";
    vecka.innerHTML = " ";
    week -= 1;
    getMatsedeln();
  }
}

function getMatsedeln() {
  fetch("http://localhost:5000/skolmaten/menu")
    .then(res => res.json())
    .then(data => {
			const currWeek = data.weeks[week];

      for(let i = 0; i < 5; i++) {
				const currDay = currWeek.days[i];
				const meals = currDay.items;
				console.log(meals)
				
				if(meals) {
					output += `<table><tbody><th>${dagar[i]}:</th>`

					for(let k = 0; k < meals.length; k++) {
						output += `<td>${meals[k]}</td>`;
					}
				}
      }

			output += '</tbody></table>'

      skolmaten.innerHTML = output;
      vecka.innerHTML = `Vecka: ${currWeek.number}`;
    });
}