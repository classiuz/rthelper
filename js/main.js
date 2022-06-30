/* -------- IMPORTANT SCRIPT -------- */

import { iconsArray, reasonArray, booleanArray, svaArray } from "./array.js";

const searchArray = arrayName => reasonArray.find(search => search.name == arrayName);
const searchIcon = iconName => iconsArray.find(search => search.name == iconName).icon;

/* -------- ALERT SCRIPT -------- */

const createAlert = (icon, alertMessage) => {

    const alertContainer = document.getElementsByClassName('alert-container')[0];
    if (alertContainer.childElementCount === 6) return false;
    const alertElement = document.createElement('div');
    alertElement.setAttribute('class', 'alert-message');
    alertContainer.appendChild(alertElement).innerHTML = searchIcon(icon) + " " + alertMessage;

    setTimeout(() => alertElement.classList.add('delete'), 1500);
    setTimeout(() => alertContainer.firstChild.remove(), 2000);
};

/* -------- MENU SCRIPT -------- */

const menuButton = document.getElementById('menuButton');
menuButton.addEventListener('click', () => {
    createAlert('info', "Se está trabajando en ello.");
    // MODIFICAR - AGREGAR SISTEMA PARA MOSTRAR VENTANA MENU...
});

/* -------- AUTO SCRIPT -------- */

const auto = document.getElementsByClassName('auto')[0];
const autoIcon = document.getElementById('autoIcon');

const clientInput = auto.querySelector('#client').children[0];
const clientIcon = auto.querySelector('#client').children[1];

const nameInput = auto.querySelector('#name').children[0];
const nameIcon = auto.querySelector('#name').children[1];

const reasonInput = auto.querySelector('#reason').children[0];
const reasonIcon = auto.querySelector('#reason').children[1];
const reasonList = document.getElementById('reasonList');

const additionalInput = auto.querySelector('#additional').children[0];
const additionalIcon = auto.querySelector('#additional').children[1];
const additionalList = document.getElementById('additionalList');

const generateButton = document.getElementById('generateButton')
const clearButton = document.getElementById('clearButton');

auto.addEventListener('submit', e => e.preventDefault());
autoIcon.addEventListener('click', () => createAlert('info', "Genera un reclamo o sugerencia automático.<br>(El número del cliente no es requerido)."))

const inputFunction = (input, icon, defaultIcon, replaceIcon) => {
    input.addEventListener('input', () => {
        if (input.value == '') return icon.innerHTML = searchIcon(defaultIcon);
        if (input.value !== '') icon.innerHTML = searchIcon(replaceIcon);
    });
};

inputFunction(clientInput, clientIcon, 'hashtag', 'copy');
inputFunction(nameInput, nameIcon, 'user', 'delete');

clientIcon.addEventListener('click', () => {
    if (clientIcon.innerHTML == searchIcon('hashtag')) return createAlert('info', "Coloca el número del cliente.");
    if (clientIcon.innerHTML == searchIcon('copy')) {
        navigator.clipboard.writeText(clientInput.value);
        createAlert('done', "Número de cliente copiado.");
    };
});

nameIcon.addEventListener('click', () => {
    if (nameIcon.innerHTML == searchIcon('user')) return createAlert('info', "Coloca el nombre y apellido del cliente.");
    if (nameIcon.innerHTML == searchIcon('delete')) {
        nameInput.value = '';
        createAlert('done', "Nombre de cliente limpiado.")
        return nameIcon.innerHTML = searchIcon('user');
    };
    // if (nameIcon.innerHTML == searchIcon('exclamation')) return createAlert('error', "Es necesario escribir el nombre del cliente.");
});

const listFunction = (array, list, input, icon) => {
    array.forEach(item => {
        const li = document.createElement('li');
        list.appendChild(li).textContent = item.name;
        li.addEventListener('click', () => {
            input.value = li.textContent;
            list.classList.remove("list-show");
            icon.innerHTML = searchIcon('arrow-down');
            checkType();
        });
    });
    icon.addEventListener('click', () => {
        if (icon.innerHTML == searchIcon('arrow-down')) {
            list.classList.add('list-show');
            icon.innerHTML = searchIcon('arrow-up');
            return false;
        };
        if (icon.innerHTML == searchIcon('arrow-up')) {
            list.classList.remove('list-show');
            icon.innerHTML = searchIcon('arrow-down');
        };
    });
    let isOpen = false;
    list.addEventListener('mouseenter', () => isOpen = true);
    list.addEventListener('mouseleave', () => isOpen = false);
    input.addEventListener('focusin', () => {
        list.classList.add('list-show');
        icon.innerHTML = searchIcon('arrow-up');
    });
    input.addEventListener('focusout', () => {
        if (isOpen == true) return list.classList.add('list-show');
        if (isOpen == false) {
            list.classList.remove('list-show');
            input.value = list.querySelectorAll("li:not(.item-hidden)")[0].textContent;
            checkType();
            return icon.innerHTML = searchIcon('arrow-down');
        };
    });
};

listFunction(reasonArray, reasonList, reasonInput, reasonIcon);
listFunction(booleanArray, additionalList, additionalInput, additionalIcon);

const checkType = () => {
    if (searchArray(reasonInput.value).type == "boolean") {
        additionalInput.removeAttribute('disabled');
        additionalInput.setAttribute('maxlength', '0');
        additionalInput.classList.add('select');
        additionalInput.placeholder = "Solución online...";
        additionalIcon.innerHTML = searchIcon('arrow-down');
        additionalInput.addEventListener('keydown', e => {
            if (e.code === 'Backspace' || e.code === 'Space') e.preventDefault();
        })
    };
    if (searchArray(reasonInput.value).type == "additional") {
        additionalInput.removeAttribute('disabled');
        additionalInput.removeAttribute('maxlength');
        additionalInput.classList.remove('select');
        additionalInput.placeholder = "Número Ticket...";
        additionalIcon.innerHTML = searchIcon('hashtag');
    }
}

reasonInput.addEventListener('input', () => {
    Array.from(reasonList.children).map(li => {
        const matchFound = new RegExp(reasonInput.value, "gi").test(li.textContent);
        if (!matchFound) return li.classList.add("item-hidden");
        if (matchFound) li.classList.remove("item-hidden");
    });
    if (reasonList.querySelectorAll(".item-hidden").length == reasonList.children.length) return reasonList.children[0].classList.add("list-empty");
    if (reasonList.querySelectorAll(".item-hidden").length !== reasonList.children.length) reasonList.children[0].classList.remove("list-empty");
});

additionalIcon.addEventListener('click', () => {
    if (additionalIcon.innerHTML == searchIcon('disabled')) createAlert('info', "Se debe seleccionar el motivo antes.")
});

clearButton.addEventListener('click', () => {
    let emptyInput = 0, i;
    console.log(auto.querySelectorAll('input'));
    for (i = 0; i < auto.querySelectorAll('input').length; i++) {
        if (auto.querySelectorAll('input')[i].value == "") emptyInput++;
    }
    if (emptyInput == auto.querySelectorAll('input').length) return createAlert('error', "No hay nada para limpiar.")
    createAlert('done', "Formulario limpiado.");
});

// const checkInput = (input, icon, list, errorMessage) => {
//     if (input.value === "") {
//         input.classList.add('invalid');
//         icon.classList.add('invalid');
//         icon.innerHTML = searchIcon('exclamation');
//         createAlert('error', errorMessage);
//         if (list === null) return false;
//         return list.classList.add('invalid');
//     };
//     if (input.value !== "") {
//         input.classList.remove('invalid');
//         icon.classList.remove('invalid');
//         if (list === null) return false;
//         list.classList.remove('invalid');
//     };
// };

generateButton.addEventListener('click', () => {
    console.log(reasonInput.value);
});

/* -------- HAND SCRIPT -------- */

const handIcon = document.getElementById('handIcon');
handIcon.addEventListener('click', () => createAlert('info', "Genera un reclamo o sugerencia manual.<br>(No es necesario seguir ningún formato)."));

/* -------- LINKS SCRIPT -------- */

const linksIcon = document.getElementById('linksIcon');
const linksList = document.getElementById('linksList');

linksIcon.addEventListener('click', () => createAlert('info', "Listado de links informativos y herramientas."));

for (let i = 0; i < linksList.children.length; i++) {
    linksList.children[i].innerHTML += searchIcon("link");
    linksList.children[i].setAttribute('target', "_blank");
    linksList.children[i].addEventListener('mouseenter', () => linksList.children[i].children[0].classList.remove("none"));
    linksList.children[i].addEventListener('mouseleave', () => linksList.children[i].children[0].classList.add("none"));
};