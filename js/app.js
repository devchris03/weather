// -------------------- SELECTORES --------------------
const form = document.querySelector('#form');
const result = document.querySelector('#result');

// -------------------- EVENTOS --------------------
window.addEventListener('load', () => {
    form.addEventListener('submit', validate);
})

// -------------------- FUNCIONES --------------------

// valida  campos
function validate(event) {
    event.preventDefault();

    const city = form.querySelector('#ciudad').value; 
    const country = form.querySelector('#pais').value;
    
    if(city.trim() === '' || country.trim() === '') {
        // muestra alerta
        alert('Ambos campos son obligatorios.');
        return;
    }

    consultApi(city, country);
}


// crea y muestra alerta
function alert(msg) {
    const alert = document.createElement('P');
    alert.textContent = msg;
    alert.classList.add('alert');

    // verifica alerta previa
    const exits = result.querySelector('.alert');
    if(exits) {
        exits.remove();
    }

    // inserta alerta
    result.appendChild(alert);

    // muestra alerta por 3s
    setTimeout(() => {
        alert.remove();
    }, 3000)
}


// consulta api
function consultApi(city, country) {
    const key = "8d2f6b17aa992ae57cb3a68bd1be6f16";
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`;

    fetch(urlApi)
        .then(result => result.json())
        .then(data => {
            // muestra alerta al no haber coincidencia
            if(data.cod === '404') {
                cleanResult();

                alert('Lo siento, no encontramos coincidencias.');
                return;
            }

            showWeather(data);
            form.reset();
        })
}


// muestra clima
function showWeather(data) {
    cleanResult();

    const {name, main: {temp, temp_max, temp_min}} = data;

    const place = document.createElement('P');
    place.textContent = name;
    place.classList.add('name');

    const tempNow = document.createElement('P');
    tempNow.innerHTML = `${temp} &#x2103`;
    tempNow.classList.add('tempNow');

    const tempMax = document.createElement('P');
    tempMax.innerHTML = `Max: ${temp_max} &#x2103`;
    
    const tempMin = document.createElement('P');
    tempMin.innerHTML = `Min: ${temp_min} &#x2103`;

    const details = document.createElement('DIV');
    details.append(tempMax, tempMin);
    details.classList.add('details');

    const weatherDiv = document.createElement('DIV');
    weatherDiv.append(place, tempNow, details);

    result.appendChild(weatherDiv);
}


// borrar resultado previo
function cleanResult() {
    while(result.firstChild) {
        result.removeChild(result.firstChild);
    }
}