const LITERS_PER_SECOND = 1000;
const BODY_ELEM = document.getElementsByTagName("body")[0];
const APP_ELEM = document.getElementById("app");
const FUEL_LEVEL_ELEM = document.getElementById("station-fuel-level");
const SEARCH_CAR_INPUT = document.getElementById("search-car");
const LOGO_ELEM = document.getElementById("logotype");

const initHeader = function () {
  LOGO_ELEM.setAttribute("src", azs.image);
  FUEL_LEVEL_ELEM.innerText = azs.volume;

  SEARCH_CAR_INPUT.addEventListener("keyup", function (event) {
    const searchResult = event.target.value.toLowerCase();

    if (searchResult) {
      const filteredCars = cars.filter(function (car) {
        const carName = car.name.toLowerCase();
        return carName.includes(searchResult);
      });

      renderContent(filteredCars);
    } else {
      renderContent(cars);
    }
  });
};

const fuelCar = function (currentCar) {
  // ПОЛУЧЕНИЕ ЭЛЕМЕНТА PROGRESS BAR ПОД УНИКАЛЬНЫМ CLASS NAME (СОЗДАВАЛИ НИЖЕ)
  const $progressEl = $(".car-" + currentCar.id);

  const fuelProccess = function (currentCar) {
    if (azs.volume > 0) {
      // УВЕЛИЧИМ КОЛИЧЕСТВО ЛИТРОВ В АВТО НА ЕДИНИЦУ
      currentCar.currentLevel += 1;
      azs.volume -= 1;
      FUEL_LEVEL_ELEM.innerText = azs.volume;

      // УВЕЛИЧИМ ПРОГРЕСС БАР НА ЕДИНИЦУ
      $progressEl.progress("increment");

      const isFuelDone = $progressEl.progress("is complete");

      if (isFuelDone) {
        clearInterval(currentCar.refuelProcess);
      }
    } else {
      const fuelButtons = document.getElementsByClassName("fuel-button");

      for (let i = 0; i < fuelButtons.length; i++) {
        fuelButtons[i].setAttribute("disabled", true);
        fuelButtons[i].classList.remove("red");
        fuelButtons[i].classList.add("green");
        clearInterval(cars[i].refuelProcess);
        fuelButtons[i].innerText = "ЗАПРАВИТЬ";
      }
    }
  };

  currentCar.refuelProcess = setInterval(
    fuelProccess,
    LITERS_PER_SECOND,
    currentCar
  );
};

const stopFuelCar = function (currentCar) {
  clearInterval(currentCar.refuelProcess);
};

const renderContent = function (cars) {
  APP_ELEM.innerText = "";
  for (let i = 0; i < cars.length; i++) {
    const cardContainerElem = document.createElement("div");
    cardContainerElem.className = "ui card auto-card";

    const imageContainerElem = document.createElement("div");
    imageContainerElem.className = "image";

    const imageElem = document.createElement("img");
    imageElem.setAttribute("src", cars[i].image);

    const cardContentContainerElem = document.createElement("div");
    cardContentContainerElem.className = "content";

    const headerElem = document.createElement("span");
    headerElem.className = "header";
    headerElem.innerHTML = cars[i].name;

    const barContainerElem = document.createElement("div");
    barContainerElem.className = "ui indicating progress";
    barContainerElem.classList.add("car-" + cars[i].id);

    const barElem = document.createElement("div");
    barElem.className = "bar";
    barContainerElem.appendChild(barElem);

    const progressElem = document.createElement("div");
    progressElem.classList = "progress";
    barElem.append(progressElem);

    const levelTankElem = document.createElement("div");
    levelTankElem.className = "label";
    barContainerElem.appendChild(levelTankElem);

    const buttonElem = document.createElement("button");
    buttonElem.className = "ui green small button fuel-button";
    buttonElem.dataset.isFuel = false;
    buttonElem.innerText = "ЗАПРАВИТЬ";

    buttonElem.addEventListener("click", function (event) {
      const isFuel = event.target.dataset.isFuel === "true";

      if (isFuel) {
        // ПОМЕНЯЛИ DATA АТТРИБУТ НА FALSE
        event.target.dataset.isFuel = false;
        // УДАЛИЛ КРАСНЫЙ ЦВЕТ, ДОБАВИЛИ ЗЕЛЕНЫЙ
        event.target.classList.remove("red");
        event.target.classList.add("green");
        event.target.innerText = "ЗАПРАВИТЬ";
        stopFuelCar(cars[i]);
      } else {
        event.target.dataset.isFuel = true;
        event.target.classList.remove("green");
        event.target.classList.add("red");
        event.target.innerText = "ОСТАНОВИТЬ";
        fuelCar(cars[i]);
      }
    });

    imageContainerElem.appendChild(imageElem);

    cardContainerElem.appendChild(imageContainerElem);

    cardContainerElem.appendChild(cardContentContainerElem);

    cardContentContainerElem.appendChild(headerElem);

    cardContentContainerElem.appendChild(barContainerElem);

    cardContentContainerElem.appendChild(buttonElem);

    APP_ELEM.appendChild(cardContainerElem);

    // ПОЛУЧЕНИЕ ПРОГРЕСС БАРА АВТОМОБИЛЯ
    const $progressEl = $(".car-" + cars[i].id);

    // ИНИЦИАЛИЗАЦИЯ ПРОГРЕСС БАРА
    $progressEl.progress({
      value: cars[i].currentLevel,
      total: cars[i].maxLevel,
      text: {
        active: "Уровень топлива: {value} из {total} литров",
        success: "Ваше авто заправлено полностью! Хорошей дороги!",
      },
    });
  }
};

renderContent(cars);
initHeader();
