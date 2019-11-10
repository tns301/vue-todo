export const validation = {
	methods: {
		checkMatchPassword(rule, value, callback) {
			if (value !== this.form.password) {
				callback(new Error("Oi! Password does not match"));
			}
			
			callback();
		},
		checkSecurityPassword(rule, value, callback) {
			let inputRegexes = [];
			
			inputRegexes[0] = { string: 'uppercase', valid: /[A-Z]/.test(value)}
			inputRegexes[1] = { string: 'lowercase', valid: /[a-z]/.test(value)}
			inputRegexes[2] = { string: 'digit', valid: /[0-9]/.test(value)}
			inputRegexes[3] = { string: 'special characters', valid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value)}

			const numberOfError = inputRegexes.filter(eachError => !eachError.valid)
			
			if (numberOfError.length > 0) {	
				let errMsg = numberOfError.map(error => {
					return ` ${error.string}`;
				})

				callback(new Error(`Password must contain ${errMsg}`));
			}
			
			callback();
		}
	}
}