let table = document.querySelector('table');

function planetName() {
    const url = "https://swapi.dev/api/planets/";
    fetch(url)
        .then(reponse => reponse.json())
        .then(reponse => {
            const names = reponse.results;
            
            table.textContent = names[2].name
    });
}

planetName()