function Car(id, name, currentLevel, maxLevel, image) {
  this.id = id;
  this.name = name;
  this.currentLevel = currentLevel;
  this.maxLevel = maxLevel;
  this.image = image;
  this.refuelProcess = null;
}

const cars = [
  new Car(
    1,
    "BMW 340i",
    10,
    60,
    "https://curvaconcepts.com/wp-content/uploads/2021/01/C300-Curva-Wheels-BMW-340i-M-Sport-9200-1.jpg"
  ),
  new Car(
    2,
    "Lexus IS 350 F",
    30,
    55,
    "https://www.motortrend.com/uploads/sites/5/2020/12/2021-Lexus-IS-350-F-Sport-2.jpg"
  ),
  new Car(
    3,
    "Porsche 911 Turbo S",
    2,
    55,
    "https://www.topgear.com/sites/default/files/images/cars-road-test/2020/05/d255bb77b11d4f5926157df7f6e6ed27/911_turbos_silver015.jpg"
  ),
];
