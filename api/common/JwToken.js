const jwt = require('jsonwebtoken');

module.exports = {
	issue(payload) {
		return jwt.sign(
			payload,
            sails.config.custom.token_secret,{
		        expiresIn: '3 days'
			}
        );
	},
	verify(token, callback) {
		return jwt.verify(
			token,
			sails.config.custom.token_secret,
			{},//opciones
			callback
		);
  	}
};