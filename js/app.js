// SELECTORES
const form = document.querySelector('#form');
const ciudad = document.querySelector('#ciudad');
const pais = document.querySelector('#pais');
const result = document.querySelector('#result');

// EVENTOS
loadEvents();
function loadEvents() {
    form.addEventListener('submit', validate);
}


// FUNCIONES
function validate(event) {
    event.preventDefault();

    if(ciudad.value.trim() === '' || pais.value.trim() === '') {
        alert('Error: Ambos campos son obligatorio');
        return;
    }
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

    setTimeout(() => {
        alert.remove();
    }, 3000)
}