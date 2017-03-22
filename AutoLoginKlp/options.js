// Saves options to chrome.storage
function save_options() {
  var fillPw = document.getElementById('chkFillPassword').checked;
  var options = { fillPw: fillPw };
  if (fillPw) {
    if (document.getElementById('userpw').checked) {
      options.password = "##userpw";
    } else if (document.getElementById('userpw1').checked) {
      options.password = "##userpw1";
    } else if (document.getElementById('otherpw').checked) {
      options.password = document.getElementById('otherpwText').value;
    }
  }
  options.fillSmsCode = document.getElementById('chkFillSmsCode').checked;

  chrome.storage.sync.set(options, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved!';
    setTimeout(function () {
      status.textContent = '';
    }, 1500);
  });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    fillPw: true, password: '##userpw1', fillSmsCode: true
  },
    function (items) {
      document.getElementById('chkFillSmsCode').checked = items.fillPw;
      document.getElementById('chkFillPassword').checked = items.fillSmsCode;
      checkPwVisibility();
      if (items.password == "##userpw") {
        document.getElementById('userpw').checked = true;
      } else if (items.password == "##userpw1") {
        document.getElementById('userpw1').checked = true;
      } else {
        document.getElementById('otherpw').checked = true;
        document.getElementById('otherpwText').value = items.password;
      }
    });
}

function checkPwVisibility() {
  if (document.getElementById('chkFillPassword').checked) {
    document.getElementById('fillPwOptions').style.display = '';
  } else {
    document.getElementById('fillPwOptions').style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('chkFillPassword').addEventListener('click', checkPwVisibility);

//for test puropses
if (!chrome.storage) {
  chrome.storage = {
    sync: {
      get: function (item, fn) { fn(item); },
      set: function (item, fn) { fn(item); },
    }
  }
}