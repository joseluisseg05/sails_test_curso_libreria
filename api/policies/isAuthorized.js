const jwt = require('jsonwebtoken');

var Response = require('../common/Response.js');
var Response = new Response();

const PersonalRepository = require('../repositories/PersonalRepository')

module.exports = async (req, res, next) => {
    
    let token;
    if (req.headers && req.headers.authorization) {
        token = req.headers.authorization;

        if (token.length <= 0){
            var response = Response.errorResponse();
            response.error.message = 'El fotmato debe ser Authorization: Bearer [token]';
            response.error.code = 400;
            return res.send(response);
        }
    } else {
        var response = Response.errorResponse();
        response.error.message = 'La cabezera Authorization no ha sido encontrada';
        response.error.code = 400;
        return res.send(response);
    }
    
    try {
        const { id } = jwt.verify(token, sails.config.custom.token_secret); 
        //console.log(id);
        const personal = await PersonalRepository.FindById(id);    

        if (!personal ){
            var response = Response.errorResponse();
            response.error.message = 'Token no valido - personal no existe';
            response.error.code = 401;
            return res.send(response);
        }
        
        if ( !personal.isActivate){
            var response = Response.errorResponse();
            response.error.message = 'Token no valido - personal desactivado';
            response.error.code = 401;
            return res.send(response);
        }

        //req.user = personal; //poner toda la data 
        req.user = personal.id;//solo el id
    } catch (error) {
        console.log(error);
        var response = Response.errorResponse();
        response.error.message = 'Token no valido - error en jwt';
        response.error.code = 401;
        return res.send(response);
    }

    next();
}