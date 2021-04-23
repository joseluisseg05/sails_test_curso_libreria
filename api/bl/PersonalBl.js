//archivo donde va todoa la logia de negocios 
//validaciones, saniizacion y manejo de datos 
//para enviarlos a repository
const { default: validator } = require('validator');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');

const PersonalRepository = require('../repositories/PersonalRepository');

module.exports = {
    Create: (personal) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {nombre, apellidos, email, password} = personal;

                const newPersonal = {
                    nombre: validator.trim(validator.escape(nombre)),
                    apellidos: validator.trim(validator.escape(apellidos)),
                    email: validator.trim(validator.normalizeEmail(email)),
                    password
                }
                
                const personal_stored = await PersonalRepository.FindByEmail(newPersonal.email);

                if(personal_stored) throw new Error('Ya existe un personal con ese correo');
                
                const data = await PersonalRepository.Save(newPersonal)
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }
}

