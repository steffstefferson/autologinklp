var initAutoLoginScript = function() {
  chrome.storage.sync.get(
    {
      fillPw: true,
      password: "##userpw1",
      fillSmsCode: true,
      autoSwissIdCode: true
    },
    function(options) {
      console.log("KLP Auto Login Script loaded with options: ", options);

      var checkSite = function(options) {
        var oneActionExecuted =
          autoPassword(options) ||
          autoPasswordSwissId(options) ||
          autoSmsCode(options) ||
          autoSwissIdCode(options) ||
          checkAtuoRedirectToSwissId();

        if (oneActionExecuted) {
          console.log("stop timer as cause one action was executed");
        } else {
          setTimeout(function() {
            checkSite(options);
          }, 1000);
        }
      };

      checkSite(options);
    }
  );
};
// check is there is an error on the site, which indicates that the last input was wrong
// so we stop our scripts to prevent an endless loop
var noErrorWithLastInput = function() {
  var errorElement = document.getElementById("err_global");
  return errorElement && errorElement.innerHTML.trim();
};

var autoPassword = function(options) {
  if (!options.fillPw) {
    return;
  }
  var emailInput = document.getElementById("isiwebuserid");

  if (emailInput && !noErrorWithLastInput()) {
    emailInput.addEventListener("blur", function() {
      var enteredEmail = emailInput.value;
      if (
        enteredEmail &&
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(enteredEmail)
      ) {
        var calculatedPw = calculatePw(enteredEmail, options);
        document.getElementById("isiwebpasswd").value = calculatedPw;
        console.log("password set to " + calculatedPw);
        var loginButton = document.getElementById("actionLogin");
        loginButton.click();
        return true;
      }
    });
  }
};

var autoPasswordSwissId = function(options) {
  if (!options.fillPw) {
    return;
  }

  var emailInput = document.getElementById("callback_3");

  if (emailInput && emailInput.innerText) {
    var enteredEmail = emailInput.innerText;
    if (
      enteredEmail &&
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(enteredEmail)
    ) {
      var calculatedPw = calculatePw(enteredEmail, options);
      document.getElementById("idToken5").value = calculatedPw;
      console.log("password set to " + calculatedPw);
      var loginButton = document.getElementById("idToken6_0");
      loginButton.click();
      return true;
    }
  }
};

function calculatePw(enteredEmail, options) {
  if (options.password == "##userpw") {
    return enteredEmail;
  } else if (options.password == "##userpw1") {
    return enteredEmail + "1";
  }
  return options.password;
}

var autoSmsCode = function(options) {
  if (!options.fillSmsCode) {
    return;
  }
  var twoFactorCode = document.getElementById("twoFactorCode");
  var correctCode = document.getElementById("correctCode");

  if (twoFactorCode && correctCode && !noErrorWithLastInput()) {
    var correctCodeValue = correctCode.innerText;
    twoFactorCode.value = correctCodeValue;
    console.log("Two factor code set to " + correctCodeValue);
    var continueButton = document.getElementsByName("continue")[0];
    continueButton.click();
    return true;
  }
};

var autoSwissIdCode = function(options) {
  if (!options.autoSwissIdCode) {
    return;
  }
  var idToken4 = document.getElementById("idToken4");

  if (idToken4 && idToken4.type != "email" && !noErrorWithLastInput()) {
    idToken4.value = "00000";
    console.log("swissId code set to 00000");
    var continueButton = document.getElementById("idToken8_0");
    continueButton.click();
    return true;
  }
};

var checkAtuoRedirectToSwissId = function() {
  var redirectButton = document.getElementById("externalIDP");
  if (redirectButton) {
    console.log("auto redirect to swissId");
    redirectButton.click();
    return true;
  }
};

initAutoLoginScript();
