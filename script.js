const textArea = document.querySelector(".text-area");
const mensagem = document.querySelector(".mensagem");

// As "chaves" de criptografia que utilizaremos são:
// `A letra "e" é convertida para "enter"`
// `A letra "i" é convertida para "imes"`
// `A letra "a" é convertida para "ai"`
// `A letra "o" é convertida para "ober"`
// `A letra "u" é convertida para "ufat"`

//evitar que o usuário digite caracteres especiais e letras maiúsculas
textArea.addEventListener("keypress", function(e) {
    if(!checarCaractere(e)) {
        e.preventDefault()
    }
})

//evitar que o usuário cole textos com caracteres especiais
textArea.addEventListener("paste", function() {
    const regex = new RegExp("^[a-z0-9\s]")
    const self = this

    setTimeout(function() {
        const text = self.value

        if(!regex.test(text)) {
            self.value = ""
        }
    }, 100)
})


function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


function btnEncriptar() {
    const textoSemAcentos = removerAcentos(textArea.value);
    const textoEncriptado = encriptar(textoSemAcentos)
    mensagem.value = textoEncriptado
    textArea.value = ""
}

function btnEncriptar() {
    const textoEncriptado = encriptar(textArea.value);
    mensagem.value = textoEncriptado;
    textArea.value = "";
}


function encriptar(stringEncriptada) {

    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }

    return stringEncriptada;
}


function btnDesencriptar() {
    const textoDesencriptado = desencriptar(textArea.value);
    mensagem.value = textoDesencriptado;
    textArea.value = "";
}


function desencriptar(stringDesencriptada) {

    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }

    return stringDesencriptada;
}

function copiar() {
    let mensagem = document.querySelector('.mensagem');
    mensagem.select();
    document.execCommand('copy');
    textArea.value = "";
}

function checarCaractere(e){
    const char = String.fromCharCode(e.keyCode);

    const pattern = /^[a-z0-9\s]$/;

    if(char.match(pattern)) {
        return true;
    }
}