const form = document.getElementById('form');
const pseudo = document.getElementById('pseudo');
const email = document.getElementById('email');
const mdp = document.getElementById('mdp');
const mdp2 = document.getElementById('mdp2');

// Message d'erreur
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Message de validation 
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


// Verification de l'email
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }else {
        showError(input, 'Email non valide');
    }
}

// Champs obligatoire
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        //console.log(input.id)
        //console.log(input.value)
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} obligatoire`);
        } else{
            showSuccess(input);
        }
    });
}

// Taille de l'input
function checkLength(input, min, max){
    if(input.value < min){
        showError(input, `${getFieldName(input)} doit comporter au moins ${min} caractères`);
    } else if(input.value.length > max){
        showError(input, `${getFieldName(input)} doit comprter moins de ${max} caractères`);
    } else {
        showSuccess(input);
    }
}

// verification mdp
function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Mdp ne correspond pas');
    }
}

//Get fieldname
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listenners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([pseudo, email, mdp, mdp2]);
    checkLength(pseudo, 3, 15);
    checkLength(mdp,6, 25);   
    checkEmail(email);
    checkPasswordsMatch(mdp, mdp2);
    
});