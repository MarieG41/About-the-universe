let alive = document.querySelector('.alive');
let starships = document.querySelector('.starships');
let planets = document.querySelector('.planets');

initFunc();

function initFunc() {
    aliveNb();
    ships();
    planetNB();
}

function aliveNb() {
    let url = "https://swapi.dev/api/people/";
    //console.log(url);
    fetch(url)
        .then (wars => wars.json())
        .then (wars => {
            wars = wars.count;
            alive.textContent = wars;
        });
}

function ships() {
    let url = "https://swapi.dev/api/starships/";
    fetch(url)
        .then (ship => ship.json())
        .then (ship => {
            ship = ship.count;
            starships.textContent = ship;
        })
}

function planetNB() {
    let url = "https://swapi.dev/api/planets/";
    fetch(url)
        .then (planet => planet.json())
        .then (planet => {
            planet = planet.count;
            planets.textContent = planet;
        })
}

