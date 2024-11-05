// SELECTORES
const form = document.querySelector('#form');
const city = document.querySelector('#ciudad');
const country = document.querySelector('#pais');
const result = document.querySelector('#result');

// EVENTOS
window.addEventListener('load', () => {
    form.addEventListener('submit', validate)
})


// FUNCIONES
function validate(event) {
    event.preventDefault();

    if(city.value.trim() === '' || country.value.trim() === '') {
        alert('Error: Ambos campos son obligatorio');
        return;
    }

    consultAPI(city.value, country.value)
}


// muestra alerta
function alert(msg) {
    const alert = document.createElement('P');
    alert.textContent = msg;
    alert.classList.add('alert');

    // verifica si existe alerta
    const exist = result.querySelector('.alert');
    if(exist) {
        exist.remove();
    }
    
    result.appendChild(alert);

    // duración de alerta: 3s
    setTimeout(() => {
        alert.remove();
    }, 3000)
}

// consulta API
function consultAPI(city, country) {
    const appId = "8d2f6b17aa992ae57cb3a68bd1be6f16";

    const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

    fetch(urlAPI)
        .then(result => result.json())
        .then(data => {
            if(data.cod === '404') {
                alert('Upps. No hemos encontrado coincidencias');
            }
        })
}