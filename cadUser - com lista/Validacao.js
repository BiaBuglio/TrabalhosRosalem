export function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export function testaAoMenosUmaLetraMaiuscula(texto) {
    let n = 0;
    for (n = 0; n < texto.length; n++) {
        if (
            (texto[n] >= "a" && texto[n] <= "z") ||
            (texto[n] >= "A" && texto[n] <= "Z")
        ) {
            let element = texto[n].toString();
            if (element === element.toUpperCase()) return true;
        }
    }
    return false;
}

export function possuiAoMenosUmNumero(texto) {
    let n = 0;
    for (n = 0; n < texto.length; n++) {
        if (texto[n] >= "0" && texto[n] <= "9") return true;
    }
    return false;
}


export function validaSenha(senha) {    
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{5,}$/;
    return regex.exec(senha);
}