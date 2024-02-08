let planetsAll = [];

planetName();
function planetName() {
    for (let index = 1; index <= 6; index++) {
        const url = `https://swapi.dev/api/planets/?page=${index}`;
        fetch(url)
                .then((reponse) => reponse.json())
                .then((reponse) => {
                    planetsAll = planetsAll.concat(reponse.results);
                    //console.log(planetsAll);
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
        items.addEventListener('click', function () {
            console.log('cliqué');
        })
    });
};

function displayPlanetInfos() {
    
}
// function getCountPage() {
//     const countPages = reponse.next;
//     const countPlanets = planetsAll; 
//     planetName(countPlanets / countPages);
//     //planetsDisplay(planetsAll); 
// }
// //getCountPage()