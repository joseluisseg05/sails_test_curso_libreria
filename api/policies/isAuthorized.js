const Jwtoken = require('../services/JwToken.js');

var Response = require('../common/Response.js');
var Response = new Response();

const PersonalRepository = require('../repositories/PersonalRepository')

module.exports = async (req, res, next) => {
    
    let token;
    //realizar la verificacion si existe en cabezado de autorizacion 
    if (req.headers && req.headers.authorization) {
        //divide la cabezera en dos bearer y token 
        const details = req.headers.authorization.split(" ");

        if(details.length == 2){//[bearer][token]
            const schema = details[0];
            const credentials = details[1];
            //hacer sensible a Bearer
            if(/^Bearer$/i.test(schema)){
                token = credentials;
            } else {
                var response = Response.errorResponse();
                response.error.message = 'El fotmato debe ser Authorization: Bearer [token]';
                response.error.code = 400;
                return res.send(response);
            }
        } else {
            var response = Response.errorResponse();
            response.error.message = 'El fotmato debe ser Authorization: Bearer [token]';
            response.error.code = 400;
            return res.send(response);
        }
        /*
        //Estructura para el token solo sin el bearer
        token = req.headers.authorization;

        if (token.length <= 0){
            var response = Response.errorResponse();
            response.error.message = 'El fotmato debe ser Authorization: Bearer [token]';
            response.error.code = 400;
            return res.send(response);
        }*/
    } else {
        var response = Response.errorResponse();
        response.error.message = 'La cabezera Authorization no ha sido encontrada';
        response.error.code = 400;
        return res.send(response);
    }
    
    Jwtoken.verify(token, async function(error, decoded){
        if(error) {
            console.log(error);
            var response = Response.errorResponse();
            response.error.message = 'Token no valido - error en jwt';
            response.error.code = 401;
            return res.send(response);
        } else {
            const { id } = decoded;
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
            req.user = personal.id;//solo el id*/
        }
    })    

    next();
}