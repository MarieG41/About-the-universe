let planetsAll = [];

planetName();
function planetName() {
    for (let index = 1; index <= 6; index++) {
        const url = `https://swapi.dev/api/planets/?page=${index}`;
        fetch(url)
                .then((reponse) => reponse.json())
                .then((reponse) => {
                    planetsAll = planetsAll.concat(reponse.results);
                    planetsDisplay(reponse.results); 
                }) 
    }
}

function planetsDisplay(planetes) {
    planetes.forEach((planete) => {
        const starPlanets = document.querySelector('.planet-list');
        const items = document.createElement('li');
        items.textContent = planete.name;
        items.addEventListener('click', function (event) {
            displayPlanetInfos(planetsAll, event);
        });
        starPlanets.appendChild(items);
    });
    planetResults = document.querySelector('.planet-result').textContent = `${planetsAll.length} : résultats`;
}

function displayPlanetInfos(planetsAll, event) {
    const planetName = event.target.textContent
    //console.log(planetName);
    const planet = planetsAll.find(planet => planetName == planet.name);
    //console.log(planet);
    document.querySelector('.planet-name').textContent = planet.name; 
    populationInfo = document.querySelector('.population').textContent = `Population : ${planet.population}`;
    gravityInfo = document.querySelector('.gravity').textContent = `Gravité : ${planet.gravity}`;
    diameterInfo = document.querySelector('.diameter').textContent = `Diamètre : ${planet.diameter}`;
    diameterInfo = document.querySelector('.climate').textContent = `Climat : ${planet.climate}`;
    diameterInfo = document.querySelector('.terrain').textContent = `Terrain: ${planet.terrain}`;
}

const planetSelect = document.querySelector('#planet-wars');
planetSelect.addEventListener('change', function() {
    const filter = this.value;
    filterValue(filter);;
})

function filterValue(value) {
    let planetFilter = planetsAll.filter((planet) => {
        const populationPlanet = parseInt(planet.population, 10);
        switch(value) {
            case "0-100.000":
                return populationPlanet > 0 && populationPlanet <= 100000;
            case "100-100m":
                return populationPlanet > 100000 && populationPlanet <= 100000000;
            case "+100m":
                return populationPlanet > 100000000;
            default:
                return true;
        }
    });
    planetsDisplay(planetFilter);
}