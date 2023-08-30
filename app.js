const divContainer = document.querySelector(".container");
const searchButton = document.getElementById("button-addon2");
const searchArea = document.getElementById("search-input");
const cardContainer = document.querySelector(".cardContainer");
let cityList = [];
let localClock = document.getElementById("localClock");
let localDay = document.getElementById("localDay");

window.onload = function () {
  document.getElementById("search-input").focus(); //* Focus the text area
  console.log(localClock);
  console.log(localDay);
  const dateForDay = new Date();
  const day = dateForDay.getDay();
  switch (day) {
    case 0:
      localDay.innerHTML = "Sunday";
      break;
    case 1:
      localDay.innerHTML = "Monday";
      break;
    case 2:
      localDay.innerHTML = "Tuesday";
      break;
    case 3:
      localDay.innerHTML = "Wednesday";
      break;
    case 4:
      localDay.innerHTML = "Thursday";
      break;
    case 5:
      localDay.innerHTML = "Friday";
      break;
    case 6:
      localDay.innerHTML = "Saturday";
      break;
    default:
      localDay.innerHTML = day;
      break;
  }
  refreshClock(localClock);
  setInterval(refreshClock, 1000);
};
function refreshClock() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  localClock.innerHTML = hour + ":" + minute + ":" + second;
}

searchButton.addEventListener("click", async function (e) {
  e.preventDefault();
  var city = searchArea.value;
  city = city.toUpperCase();
  if (cityList.includes(city)) {
    alert(
      "You already know the time for " + city + ". Please search another city"
    );
  } else if (city == "") {
    alert("Please enter a valid city name.");
  } else {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/worldtime?city=${city}`,
        {
          headers: { "X-Api-Key": "T6z75Z3C2s59SY6cTC1j7QKoIl6rKMcZbpAuPALQ" },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      //! veri gelirse çalışacak kısım ******************
      cityList.push(city);
      const newCard = document.createElement("div");
      newCard.classList.add(
        "cards",
        "col-4",
        "bg-light",
        "rounded-5",
        "p-4",
        "shadow-lg"
      );
      if (cardContainer.firstChild) {
        cardContainer.insertBefore(newCard, cardContainer.firstChild);
      } else {
        cardContainer.append(newCard);
      } //! Buraya kadar cart ekleme
      const {
        timezone,
        datetime,
        year,
        month,
        day,
        hour,
        minute,
        second,
        day_of_week,
      } = data;
      let clockNew = new Date(datetime);
      updateClock(clockNew, newCard, city, day_of_week);
      setInterval(
        () => updateClock(clockNew, newCard, city, day_of_week),
        1000
      );
    } catch (error) {
      alert("Please anter a valid city name.");
    }
  }
  searchArea.value = "";
});

function updateClock(clockNew, newCard, city, day_of_week) {
  clockNew.setSeconds(clockNew.getSeconds() + 1);
  let hours = clockNew.getHours();
  let minutes = clockNew.getMinutes();
  let seconds = clockNew.getSeconds();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let clock = `${hours}:${minutes}:${seconds}`;
  // newCard.innerHTML = clock;
  newCard.innerHTML = `
  <h2 class="h5 pt-1 text-warning">${city}<span class="h1"></span></h2>
<hr />
<h2 class="h3 pt-1 text-secondary-emphasis">${clock}<br/></h2>
<hr />
<h2 class="h5 pt-1 text-warning">${day_of_week}</h2>`;
}

//! Proje Nasıl Geliştirilebilir?
//* Only local time can be the first card.
//* Some 
