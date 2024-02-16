let planetsAll = []; //variable contenant un tableau vide qui va contenir par la suite toutes les planètes de l'API

planetName();//appel de la fonction qui récupère le nom des planètes
function planetName() { //fonction qui récupère le nom des planètes grâce à une boucle for car les planètes sont sur 6 pages et il y a 10 planètes par page.
    for (let index = 1; index <= 6; index++) {
        const url = `https://swapi.dev/api/planets/?page=${index}`;//utilisation d'index pour que la boucle charge les planètes de la page suivante une fois que celle de la page en cours sont chargées.
        fetch(url)//fetch pour récupérer les planètes de l'API
                .then((reponse) => reponse.json())
                .then((reponse) => {
                    planetsAll = planetsAll.concat(reponse.results);//planetsAll récupère les résultats de l'API sur les planètes et ses informations
                    planetsDisplay(reponse.results); //la fonction qui affiche les planètes à l'écran prend comme paramètre les résultats de l'API.
                }) 
    }
}

function planetsDisplay(planetes) {//cette fonction affiche les planètes avec le paramètre planetes
    planetes.forEach((planete) => {//le paramètre planetes est décortiqué avec une boucle forEach afin de n'obtenir que les données de chaque planète individuellement
        const starPlanets = document.querySelector('.planet-list');//le <ul> dans le HTML qui reçoit le nom des planètes sur le site
        const items = document.createElement('li');//la création d'un <li> pour le nom de chaque planète
        items.textContent = planete.name;//affiche le nom des planètes dans les <li> créés
        items.addEventListener('click', function (event) {//au clic sur un <li>, on écoute la fonction qui ajoute les infos de la planète correspondante
            displayPlanetInfos(planetsAll, event);//les paramètres de la fonction sont planetsAll pour avoir les infos sur les planètes et event pour obtenir les info sur le clic
        });
        starPlanets.appendChild(items);//on indique que l'on veut que les <li> créés en JS apparaîssent à l'écran dans le <ul> du HTML avec le appendChild
    });
    planetResults = document.querySelector('.planet-result').textContent = `${planetsAll.length} : résultats`;//on importe du HTML une <div> ou l'on implémente le nombre de planètes correspondant de façon dynamique
}

function displayPlanetInfos(planetsAll, event) {//la fonction montre à l'écran les infos supplémentaires des planètes
    const planetName = event.target.textContent//constante ou l'on récupère le nom de la planète sur lequel on a cliqué
    //console.log(planetName);
    const planet = planetsAll.find(planet => planetName == planet.name);//constante où l'on récupère toutes les infos complémentaires de la planète en question
    //console.log(planet);
    document.querySelector('.planet-name').textContent = planet.name; //On importe le résultat de la constante planet dans le <h1> et donc afficher le titre
    populationInfo = document.querySelector('.population').textContent = `Population : ${planet.population}`;//On importe le résultat de la constante planet avec le .population dans le <p> et donc afficher le nombre d'habitants
    //de même pour les informations en dessous:
    gravityInfo = document.querySelector('.gravity').textContent = `Gravité : ${planet.gravity}`;
    diameterInfo = document.querySelector('.diameter').textContent = `Diamètre : ${planet.diameter}`;
    diameterInfo = document.querySelector('.climate').textContent = `Climat : ${planet.climate}`;
    diameterInfo = document.querySelector('.terrain').textContent = `Terrain: ${planet.terrain}`;
}

const planetSelect = document.querySelector('#planet-wars');//sélectionne le <select> dans le HTML pour le filte
planetSelect.addEventListener('change', function() {//On ajoute un écouteur d'évènement change pour savoir si la valeur de <select> sélectionné est différente de la précédente
    const filter = this.value;//constante qui affiche la valeur sélectionner du <select>
    filterValue(filter);//la fontction filtre les planètes par rapport au nombre d'habitants avec le filter en paramètre.
    //console.log(filter);
})

function filterValue(value) {//fonction qui filtre les planètes par rapport au nombre d'habitants, le paramètre value correspond au filter dans le addEventListener
    let planetFilter = planetsAll.filter((planet) => {//variable qui filtre les planètes contenu dans planetsAll et filtrer avec .filter() qui prend en paramètre planet qui contient toutes les planètes.
        //console.log(planet);
        const populationPlanet = parseInt(planet.population, 10);// constante qui ne contient que le chiffre du nombre d'habitants pour chaque planètes
        //console.log(populationPlanet);
        switch(value) {//boucle switch / case pour savoir quelle option est sélectionner et quelles planètes afficher.
            case "0-100.000"://population entre 0 et 100 000
                return populationPlanet > 0 && populationPlanet <= 100000;
            case "100-100m"://population entre 100 000 et 100 000 000
                return populationPlanet > 100000 && populationPlanet <= 100000000;
            case "+100m": //population de plus de 100 000 000
                return populationPlanet > 100000000;
            default:
                return true;
        }
    });
    planetsDisplay(planetFilter);//la fonction qui affiche le nom des planètes prend en argument le filtre de planète pour n'afficher que les planètes correspondantes au nombre d'habitants sélectionner.
}