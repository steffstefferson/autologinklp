
var initAutoLoginScript = function(){
	console.log('KLP Auto Login Script loaded');
	//debugger;
	autoPassword();
	twoFactorCode();
}
// check is there is an error on the site, which indicates that the last input was wrong
// so we stop our scripts to prevent an endless loop
var noErrorWithLastInput = function(){
	var errorElement = document.getElementById('err_global'); 
	return (errorElement && errorElement.innerHtml);
}


var autoPassword = function(){

var emailInput = document.getElementById('isiwebuserid');

	if(emailInput && !noErrorWithLastInput()){
		emailInput.addEventListener('blur',function(){
			var enteredEmail = emailInput.value;
			if(enteredEmail && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(enteredEmail)){
				var calculatedPw = enteredEmail+'1';
				document.getElementById('isiwebpasswd').value = calculatedPw;
				console.log('password set to '+calculatedPw);
				var loginButton = document.getElementById('actionLogin');
				loginButton.click();
			}
		});
	}
};

var twoFactorCode = function(){

var twoFactorCode = document.getElementById('twoFactorCode');
var correctCode = document.getElementById('correctCode');


	if(twoFactorCode && correctCode && !noErrorWithLastInput()){
			var correctCodeValue = correctCode.innerText;
			twoFactorCode.value = correctCodeValue;
			console.log('Two factor code set to '+correctCodeValue);
			var continueButton = document.getElementsByName('continue')[0];
			continueButton.click();
	}
};

initAutoLoginScript();