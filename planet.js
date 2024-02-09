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
        starPlanets.appendChild(items);
        items.addEventListener('click', function (event) {
            displayPlanetInfos(planetsAll, event);
        });
    });
}

function displayPlanetInfos(planetsAll, event) {
    const planetName = event.target.textContent
    //console.log(planetName);
    const planet = planetsAll.find(planet => planetName == planet.name);
    console.log(planet);
    document.querySelector('.planet-name').textContent = planet.name; 

    populationInfo = document.querySelector('.population').textContent = `Population : ${planet.population}`;

    gravityInfo = document.querySelector('.gravity').textContent = `Gravité : ${planet.gravity}`;

    diameterInfo = document.querySelector('.diameter').textContent = `Diamètre : ${planet.diameter}`;

    diameterInfo = document.querySelector('.climate').textContent = `Climat : ${planet.climate}`;

    diameterInfo = document.querySelector('.terrain').textContent = `Terrain: ${planet.terrain}`;

}
// function getCountPage() {
//     const countPages = reponse.next;
//     const countPlanets = planetsAll; 
//     planetName(countPlanets / countPages);
//     //planetsDisplay(planetsAll); 
// }
// //getCountPage()