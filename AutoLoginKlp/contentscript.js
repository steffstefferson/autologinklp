
var initAutoLoginScript = function () {
	chrome.storage.sync.get({
    fillPw: true, password: '##userpw1', fillSmsCode: true
  }, function (options) {
		console.log('KLP Auto Login Script loaded with options: ', options);
		autoPassword(options);
		autoSmsCode(options);
	});
}
// check is there is an error on the site, which indicates that the last input was wrong
// so we stop our scripts to prevent an endless loop
var noErrorWithLastInput = function () {
	var errorElement = document.getElementById('err_global');
	return (errorElement && errorElement.innerHTML.trim());
}


var autoPassword = function (options) {
	if (!options.fillPw) {
		return;
	}
	var emailInput = document.getElementById('isiwebuserid');

	if (emailInput && !noErrorWithLastInput()) {
		emailInput.addEventListener('blur', function () {
			var enteredEmail = emailInput.value;
			if (enteredEmail && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(enteredEmail)) {
				var calculatedPw = calculatePw(enteredEmail, options);
				document.getElementById('isiwebpasswd').value = calculatedPw;
				console.log('password set to ' + calculatedPw);
				var loginButton = document.getElementById('actionLogin');
				loginButton.click();
			}
		});
	}

	function calculatePw(enteredEmail, options) {
		if (options.password == "##userpw") {
			return enteredEmail;
		} else if (options.password == "##userpw1") {
			return enteredEmail + '1';
		}
		return options.password;
	}
};

var autoSmsCode = function (options) {
	if (!options.fillSmsCode) {
		return;
	}
	var twoFactorCode = document.getElementById('twoFactorCode');
	var correctCode = document.getElementById('correctCode');


	if (twoFactorCode && correctCode && !noErrorWithLastInput()) {
		var correctCodeValue = correctCode.innerText;
		twoFactorCode.value = correctCodeValue;
		console.log('Two factor code set to ' + correctCodeValue);
		var continueButton = document.getElementsByName('continue')[0];
		continueButton.click();
	}
};

initAutoLoginScript();
