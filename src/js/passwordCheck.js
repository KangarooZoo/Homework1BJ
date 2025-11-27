function validatePassword(pw) {
	var msgs = []
	var ok = true
	if (!pw) { msgs.push('Password required'); ok = false }
	if (pw.length < 8 || pw.length >= 15) { msgs.push('Password length must be at least 8 and less than 15 characters.'); ok = false }
	var first = pw.charAt(0)
	if (!(first >= 'A' && first <= 'Z')) { msgs.push('Password must start with an uppercase letter.'); ok = false }
	var up = 0
	var low = 0
	var dig = 0
	var underscore = false
	for (var i = 0; i < pw.length; i++) {
		var c = pw.charAt(i)
		if (c >= 'A' && c <= 'Z') up = up + 1
		else if (c >= 'a' && c <= 'z') low = low + 1
		else if (c >= '0' && c <= '9') dig = dig + 1
		if (c === '_') underscore = true
	}
	if (up < 1) { msgs.push('Password must include at least one uppercase letter.'); ok = false }
	if (low < 2) { msgs.push('Password must include at least two lowercase letters.'); ok = false }
	if (dig < 1) { msgs.push('Password must include at least one numeric digit.'); ok = false }
	if (!underscore) { msgs.push('Password must include the character "_" (underscore).'); ok = false }
	return { isValid: ok, messages: msgs, upperCount: up, lowerCount: low, digitCount: dig, hasUnderscore: underscore }
}

if (typeof document !== 'undefined') {
	document.addEventListener('DOMContentLoaded', function () {
		var form = document.querySelector('.login-form')
		var pwInput = document.getElementById('password')
		if (!form || !pwInput) return
		var box = document.getElementById('pw-messages')
		if (!box) {
			box = document.createElement('div')
			box.id = 'pw-messages'
			box.style.color = 'red'
			box.style.marginTop = '8px'
			pwInput.parentNode.insertBefore(box, pwInput.nextSibling)
		}
		form.addEventListener('submit', function (e) {
			var pw = pwInput.value || ''
			var res = validatePassword(pw)
			if (!res.isValid) {
				e.preventDefault()
				box.innerHTML = ''
				for (var i = 0; i < res.messages.length; i++) {
					var d = document.createElement('div')
					d.textContent = res.messages[i]
					box.appendChild(d)
				}
				console.log('password validation failed', res.messages)
			} else {
				box.innerHTML = ''
			}
		})
	})
}

if (typeof module !== 'undefined' && module.exports) { module.exports = validatePassword }

export default validatePassword


