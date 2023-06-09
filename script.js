const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = [
	'~',
	'!',
	'@',
	'$',
	'#',
	'%',
	'^',
	'&',
	'*',
	'(',
	')',
	'+',
	'-',
	'.',
	'/',
	';',
	':',
	"'",
	',',
	'=',
	'>',
	'<',
	'?',
	'|',
	'`',
	'\\',
];
const uppercase = ['A', 'B', 'C', 'D', 'E', 'F'];
const lowercase = ['a', 'b', 'c', 'd', 'e'];

let flagUC = document.getElementById('uppercase').checked;
let flagLC = document.getElementById('lowercase').checked;
let flagNum = document.getElementById('numbers').checked;
let flagSym = document.getElementById('symbols').checked;

let passwordLen = document.getElementById('passwdlength').value;

const getRandomChar = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
};

const displayPassword = (passsword) => {
    message.style.opacity = 0;
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
    if (flagUC === false && flagLC === false && flagNum === false && flagSym === false) {
        displayPassword("WhatDoYouMean?");
        let message = document.getElementById('message');
        message.innerText = 'Please enter at least one box!';
        message.style.opacity = 1;
        return;
    }
	let mixed = [];
	let count = 0;
    let passsword = '';
	if (flagUC === true) {
		mixed = mixed.length > 0 ? [...mixed, ...uppercase] : [...uppercase];
		passsword += getRandomChar(uppercase);
		count++;
		if (count == passwordLen) {
			displayPassword(passsword);
			return;
		}
	}
	if (flagLC === true) {
		mixed = mixed.length > 0 ? [...mixed, ...lowercase] : [...lowercase];
		passsword += getRandomChar(lowercase);
		count++;
		if (count == passwordLen) {
			displayPassword(passsword);
			return;
		}
	}
	if (flagNum === true) {
		mixed = mixed.length > 0 ? [...mixed, ...digits] : [...digits];
		passsword += getRandomChar(digits);
		count++;
		if (count == passwordLen) {
			displayPassword(passsword);
			return;
		}
	}
	if (flagSym === true) {
		mixed = mixed.length > 0 ? [...mixed, ...symbols] : [...symbols];
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
}

function initEnv() {
	const checkBoxUC = document.getElementById('uppercase');
	checkBoxUC.addEventListener('click', () => {
		flagUC = checkBoxUC.checked;
		generatePassword();
	});
	const checkBoxLC = document.getElementById('lowercase');
	checkBoxLC.addEventListener('click', () => {
		flagLC = checkBoxLC.checked;
		generatePassword();
	});
	const checkBoxNum = document.getElementById('numbers');
	checkBoxNum.addEventListener('click', () => {
		flagNum = checkBoxNum.checked;
		generatePassword();
	});
	const checkBoxSym = document.getElementById('symbols');
	checkBoxSym.addEventListener('click', () => {
		flagSym = checkBoxSym.checked;
		generatePassword();
	});

	const copyBtn = document.getElementById('copyPassword');
	copyBtn.addEventListener('click', () => {
		const passsword = document.getElementById('passwordResult');
		navigator.clipboard.writeText(passsword.innerText).then(() => {
			let message = document.getElementById('message');
			message.innerText = 'Copied!';
			message.style.opacity = 1;
		});
	});

	const resetBtn = document.getElementById('resetPassword');
	resetBtn.addEventListener('click', () => {
		generatePassword();
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
