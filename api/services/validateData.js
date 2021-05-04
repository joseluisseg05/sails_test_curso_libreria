/** 
 * @description :: validar cada entrada de datos 
 * @returns :: retorna en caso valido un TRUE en caso de tener error un OBJ
 * 
 * TODO: Realizar las validaciones para cada entrada de datos  
 */

const Validator = require("fastest-validator");

module.exports = {
    validateLogin: (data) => {
        const errors = {};
        const v = new Validator();

        const schema = {
            email: { type: "email", empty: false },
            password: { type: "string", empty: false, 
                messages: { //personalizar los mensajes segun su tipo
                    required: "El password es un Campo requirido para la operacion"
                }
            }
        }

        const result = v.validate(
            {
                email: data.email,
                password: data.password
            },
            schema
        );
        //console.log(result)
        /* ejemplo de resultado
        [
            {
                type: 'required',
                message: "The 'password' field is required.",
                field: 'password',
                actual: undefined
            }
        ]
        */
        if (Array.isArray(result)) {
            result.forEach(element => {
                errors[`${element.field}`] = element.message;
            });
      
            return errors; //{ password: "The 'password' field is required." }
        }
        
        return true;
    }
}