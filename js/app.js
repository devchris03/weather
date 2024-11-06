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

    const tempValue = kelvinToCelsius(temp);
    const maxValue = kelvinToCelsius(temp_max);
    const minValue = kelvinToCelsius(temp_min);

    const place = document.createElement('P');
    place.textContent = name;
    place.classList.add('name');

    // insertar imagen
    const imagen = document.createElement('DIV');
    if(tempValue < 10) {
        imagen.innerHTML = `<img src="./img/icon-cold.svg" alt="nube abrigada" width="100" height="100" />`
    } else if (tempValue >= 10 &&  tempValue < 20 ) {
        imagen.innerHTML = `<img src="./img/icon-cloud.svg" alt="nube abrigada" width="100" height="100" />`
    } else if (tempValue >= 20 && tempValue < 30 ) {
        imagen.innerHTML = `<img src="./img/icon-normal.svg" alt="nube abrigada" width="100" height="100" />`
    } else if (tempValue >= 30) {
        imagen.innerHTML = `<img src="./img/icon-sun.svg" alt="nube abrigada" width="100" height="100" />`
    } else {
        imagen.innerHTML = `<img src="./img/icon-start.svg" alt="nube abrigada" width="100" height="100" />`
    }

    const tempNow = document.createElement('P');
    tempNow.innerHTML = `${tempValue} &#x2103`;
    tempNow.classList.add('tempNow');

    const tempMax = document.createElement('P');
    tempMax.innerHTML = `Max: ${maxValue} &#x2103`;
    
    const tempMin = document.createElement('P');
    tempMin.innerHTML = `Min: ${minValue} &#x2103`;

    const details = document.createElement('DIV');
    details.append(tempMin, tempMax);
    details.classList.add('details');

    // const weatherDiv = document.createElement('DIV');
    // weatherDiv.classList.add('weatherDiv')
    // weatherDiv.append(place, imagen, tempNow, details);

    result.append(place, imagen, tempNow, details);
}


// pasa grados kelvin a celsius
function kelvinToCelsius(grade) {
    return parseInt(grade - 273.15); 
}


// borrar resultado previo
function cleanResult() {
    while(result.firstChild) {
        result.removeChild(result.firstChild);
    }
}