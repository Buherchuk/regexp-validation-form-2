let emailFlag = false;
let lastNameFlag = false;
let passwordFlag = false;
let editFlag = false;
let elemForEdit;
function createErrorElement(location) {
    if (location.nextElementSibling.className != 'error') {
        let div = document.createElement('div');
        div.classList.add('error');
        div.innerText = `Please provide a valid  ${location.placeholder}`;
        location.after(div);
        return true;
    } else {
        return false;
    }
}
function removeErrorElement(location) {
    if (location.nextElementSibling.className == 'error') {
        location.nextElementSibling.remove();
        return true;
    } else {
        if (location.nextElementSibling.className != 'error') {
            let div = document.createElement('div');
            div.classList.add('error');
            div.innerText = `Please provide a valid  ${location.placeholder}`;
            location.after(div);
            return true;
        }
    }
}
document.forms.signUp.onchange = function (e) {
    let targ = e.target;
    let email = /^[A-Za-z]*@/;
    let lastName = /^[a-zA-Z]{4,16}$/;
    let password = /[a-zA-Z\.\-\_\d]{4,16}$/;
    if (targ.id == 'email') {
        if (email.test(targ.value)) {
            emailFlag = true;
            if (targ.nextElementSibling.className == 'error') {
                removeErrorElement(targ);
            }
        } else if (!email.test(targ.value)) {
            emailFlag = false;
            if (targ.nextElementSibling.className != 'error') {
                createErrorElement(targ);
            }
        }
    } else if (targ.id == 'lastName') {
        if (lastName.test(targ.value)) {
            lastNameFlag = true;
            if (targ.nextElementSibling.className == 'error') {
                removeErrorElement(targ);
            }
        } else if (!lastName.test(targ.value)) {
            lastNameFlag = false;
            if (targ.nextElementSibling.className != 'error') {
                createErrorElement(targ);
            }
        }
    } else if (targ.id == 'password') {
        if (password.test(targ.value)) {
            passwordFlag = true;
            if (targ.nextElementSibling.className == 'error') {
                removeErrorElement(targ);
            }
        } else if (!password.test(targ.value)) {
            passwordFlag = false;
            if (targ.nextElementSibling.className != 'error') {
                createErrorElement(targ);
            }
        }
    } else {
        return;
    }

    if (emailFlag && lastNameFlag && passwordFlag) {
        document.querySelector('#signIn').disabled = false
        document.querySelector('#signIn').style.backgroundColor = "lightgreen";
    } else {
        document.querySelector('#signIn').disabled = true;
        document.querySelector('#signIn').style.backgroundColor = "white";
    }
}

document.querySelector('#signIn').onclick = function () {
    let login = document.querySelector('#lastName').value;
    let pass = document.querySelector('#password').value;
    let mail = document.querySelector('#email').value;
    let count = document.querySelectorAll('.user-list').length;
    if (editFlag) {
        elemForEdit.children[1].innerText = document.querySelector('#lastName').value;
        elemForEdit.children[2].innerText = document.querySelector('#password').value;
        elemForEdit.children[3].innerText = document.querySelector('#email').value;
        document.querySelector('#signIn').value = "Add user";

        document.querySelector('#lastName').value = '';
        document.querySelector('#password').value = '';
        document.querySelector('#email').value = '';
        editFlag = false;
    } else {
        document.querySelector('#signIn').value = "Add user";
        let div = document.createElement('div');
        div.classList.add('user-list');
        div.innerHTML = `
        <span id= "user-count">${elemForEdit}</span>
        <span id = "user-login">${login}</span>
        <span id = "user-password">${pass}</span>
        <span id = "user-email">${mail}</span>
        <button id="edit">edit</button>
        <button id="delete">delete</button>
        `;
        document.querySelector('.result').appendChild(div);
        document.querySelector('#lastName').value = '';
        document.querySelector('#password').value = '';
        document.querySelector('#email').value = '';
        editFlag = false;
    }
    for (i = 0; i < document.querySelectorAll('#delete').length; i++) {
        document.querySelectorAll('#delete')[i].onclick = function () {
            this.parentNode.remove();
        }
    }
    for (i = 0; i < document.querySelectorAll('#edit').length; i++) {
        document.querySelectorAll('#edit')[i].onclick = function () {
            document.querySelector('#signIn').value = "Edit user";
            elemForEdit = this.parentElement;
            editFlag = true;
            document.querySelector('#lastName').value = this.parentElement.children[1].innerText;
            document.querySelector('#password').value = this.parentElement.children[2].innerText;
            document.querySelector('#email').value = this.parentElement.children[3].innerText;
        }
    }
}




