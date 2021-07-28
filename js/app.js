// Variables
const enviarBtn = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Listeners
readyToGo();
function readyToGo() {
    //cuando la app arranca 
    document.addEventListener('DOMContentLoaded', iniciarApp);
    //campos formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    // reinicia formulario
    resetBtn.addEventListener('click', resetFormulario);

    //Enviar formulario
    formulario.addEventListener('submit', enviarFormulario);

}


// Funciones
function iniciarApp() {
    enviarBtn.disabled = true;
    enviarBtn.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {

    if (e.target.value.length > 0) {

        // Elimina los errores
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los cambios son obligatorios');
    }

    if (e.target.type === 'email') {

        if (emailRegEx.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            };

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }

    if (emailRegEx.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        enviarBtn.disabled = false;
        enviarBtn.classList.remove('cursor-not-allowed', 'opacity-50');
    } else {
        enviarBtn.disabled = true;
        enviarBtn.classList.add('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'bg-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

function enviarFormulario(e) {
    e.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        // mensaje de envio
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se ha enviado correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-500', 'text-white', 'font-bold');
        // inserta antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();
            resetFormulario();
        }, 5000);
    }, 3000);

}

// reset form
function resetFormulario() {
    formulario.reset();
    email.classList.remove('border', 'border-red-500', 'border-green-500');
    asunto.classList.remove('border', 'border-red-500', 'border-green-500');
    mensaje.classList.remove('border', 'border-red-500', 'border-green-500');

    iniciarApp();
}
