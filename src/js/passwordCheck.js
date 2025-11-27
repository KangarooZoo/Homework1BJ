function validatePassword(pw) {
  // messages we will return to explain failures
  var messages = [];
  var isValid = true;

  
  if (pw.length < 8 || pw.length >= 15) {
    messages.push('Password length must be at least 8 and less than 15 characters.');
    isValid = false;
  }

  
  var first = pw.charAt(0);
  if (!(first >= 'A' && first <= 'Z')) {
    messages.push('Password must start with an uppercase letter.');
    isValid = false;
  }

  
  var upperCount = 0;
  var lowerCount = 0;
  var digitCount = 0;
  var hasUnderscore = false;

  for (var i = 0; i < pw.length; i++) {
    var ch = pw.charAt(i);
    if (ch >= 'A' && ch <= 'Z') {
      upperCount = upperCount + 1;
    } else if (ch >= 'a' && ch <= 'z') {
      lowerCount = lowerCount + 1;
    } else if (ch >= '0' && ch <= '9') {
      digitCount = digitCount + 1;
    }
    if (ch === '_') {
      hasUnderscore = true;
    }
  }

  
  if (upperCount < 1) {
    messages.push('Password must include at least one uppercase letter.');
    isValid = false;
  }

  
  if (lowerCount < 2) {
    messages.push('Password must include at least two lowercase letters.');
    isValid = false;
  }

  
  if (digitCount < 1) {
    messages.push('Password must include at least one numeric digit.');
    isValid = false;
  }

  
  if (!hasUnderscore) {
    messages.push('Password must include the character "_" (underscore).');
    isValid = false;
  }

  
  return {
    isValid: isValid,
    messages: messages,
    
    upperCount: upperCount,
    lowerCount: lowerCount,
    digitCount: digitCount,
    hasUnderscore: hasUnderscore
  };
}


if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    // find the form and password input by their existing classes/ids
    var form = document.querySelector('.login-form');
    var pwInput = document.getElementById('password');
    if (!form || !pwInput) {
      return;
    }

    var msgBox = document.getElementById('pw-messages');
    if (!msgBox) {
      msgBox = document.createElement('div');
      msgBox.id = 'pw-messages';
      msgBox.style.color = 'red';
      msgBox.style.marginTop = '8px';
      pwInput.parentNode.insertBefore(msgBox, pwInput.nextSibling);
    }

    form.addEventListener('submit', function (e) {
      var pw = pwInput.value || '';
      var res = validatePassword(pw);
      if (!res.isValid) {
        e.preventDefault();
        msgBox.innerHTML = '';
        for (var i = 0; i < res.messages.length; i++) {
          var p = document.createElement('div');
          p.textContent = res.messages[i];
          msgBox.appendChild(p);
        }
      } else {
        msgBox.innerHTML = '';
      }
    });
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = validatePassword;
}


