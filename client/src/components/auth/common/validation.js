export const validation = {
	methods: {
		checkMatchPassword(rule, value, callback) {
			if (value !== this.form.passwordRegisterFirst) {
				callback(new Error("Oi! Password does not match"));
			} else {
				callback();
			}
		},
		checkSecurityPassword(rule, value, callback) {
			let inputRegexes = [];
			
			inputRegexes[0] = { string: 'uppercase', valid: /[A-Z]/.test(value)}
			inputRegexes[1] = { string: 'lowercase', valid: /[a-z]/.test(value)}
			inputRegexes[2] = { string: 'digit', valid: /[0-9]/.test(value)}
			inputRegexes[3] = { string: 'special characters', valid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value)}

			const numberOfError = inputRegexes.filter(eachError => !eachError.valid), arrLength = numberOfError.length
			
			if (arrLength > 0) {
				let errMsg = `Password must contain `;
				for (let i = 0; i < arrLength; i++) { 
					errMsg += `${numberOfError[i].string}${i === arrLength - 1 ? ``: `, `}`
				}

				callback(new Error(errMsg));
			} else {
				callback();
			}
		}
	}
}