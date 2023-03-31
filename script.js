const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ['~', '!', '@', '$', '#', '%', '^', '&', '*', '(',
                  ')', '+', '-', '.', '/', ';', ':', '\'', ',', '=',
                '>', '<', '?', '|', '`', '\\'];
const uppercase = ['A', 'B', 'C', 'D', 'E', 'F'];
const lowercase = ['a', 'b', 'c', 'd', 'e'];

const flagUC = document.getElementById('uppercase').checked;
const flagLC = document.getElementById('lowercase').checked;
const flagNum = document.getElementById('numbers').checked;
const flagSym = document.getElementById('symbols').checked;

let passwordLen = document.getElementById('passwdlength').value;

const getRandomChar = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

const displayPassword = (passsword) => {
    document.getElementById('passwordResult').innerText = passsword;
};

const shuffle = (array) => {
    for (let index = 0; index < array.length; index++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const temp = array[index];
        array[index] = array[randomIndex];
        array[randomIndex] = temp; 
    }
    return array;
};

// const generatePassword = (arr, passsword) => {
//     mixed = [mixed, ...arr];
//     passsword += getRandomChar(arr);
//     count++;
//     if (count === passwordLen) {
//         displayPassword(passsword);
//         return true;
//     }
//     return false;
// };

function generatePassword() {
    let mixed =  [];
    let count = 0;
    let passsword = '';
    if (flagUC === true) {
        mixed = (mixed.length > 0) ? [...mixed, ...uppercase] : [...uppercase];
        passsword += getRandomChar(uppercase);
        count++;
        if (count == passwordLen) {
            displayPassword(passsword);
            return;
        }
    }
    if (flagLC === true) {
        mixed = (mixed.length > 0) ? [...mixed, ...lowercase] : [...lowercase];
        passsword += getRandomChar(lowercase);
        count++;
        if (count == passwordLen) {
            displayPassword(passsword);
            return;
        }
    }
    if (flagNum === true) {
        mixed = (mixed.length > 0) ? [...mixed, ...digits] : [...digits];
        passsword += getRandomChar(digits);
        count++;
        if (count == passwordLen) {
            displayPassword(passsword);
            return;
        }
    }
    if (flagSym === true) {
        mixed = (mixed.length > 0) ? [...mixed, ...symbols] : [...symbols];
        passsword += getRandomChar(symbols);
        count++;
        if (count == passwordLen) {
            displayPassword(passsword);
            return;
        }
    }

    mixed = shuffle(mixed);
    const remainingLen = passwordLen - count;

    for (let index = 0; index < remainingLen; index++) {
        passsword += getRandomChar(mixed);
        let array = passsword.split('');
        array = shuffle(array);
        passsword = array.join('');
    }

    displayPassword(passsword);
    console.log("len " + passwordLen + " password " + passsword);
}

function initEnv() {
    const copyBtn = document.getElementById("copyPassword");
    copyBtn.addEventListener('click', () => {
        const passsword = document.getElementById("passwordResult");
        navigator.clipboard.writeText(passsword.innerText).then(() => {
            let message = document.getElementById("message");
            message.innerText = "Copied!";
            message.style.opacity = 1;
        });
    });

    const resetBtn = document.getElementById("resetPassword");
    resetBtn.addEventListener('click', () => {
        generatePassword();
        message.style.opacity = 0;
    });

    const pwdLen = document.getElementById('passwdlength');
    pwdLen.addEventListener('change', () => {
        document.getElementById('passwdlength').innerHTML = pwdLen.value;
        passwordLen = pwdLen.value;
        generatePassword();
    });
}

initEnv();
generatePassword();




