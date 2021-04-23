//archivo donde va todoa la logia de negocios 
//validaciones, saniizacion y manejo de datos 
//para enviarlos a repository
const { default: validator } = require('validator');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');

const PersonalRepository = require('../repositories/PersonalRepository');
const Mailer = require('../services/MailerService');

module.exports = {
    Create: (personal, req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {nombre, apellidos, email, password} = personal;

                const newPersonal = {
                    nombre: validator.trim(validator.escape(nombre)),
                    apellidos: validator.trim(validator.escape(apellidos)),
                    email: validator.trim(validator.normalizeEmail(email)),
                    password,
                    //datos para email de confirmacion
                    //token: crypto.randomBytes(30).toString('hex'),
                    //expira: Date.now() + 1800000 //fecha exacta mas 30min
                }
                
                const personal_stored = await PersonalRepository.FindByEmail(newPersonal.email);

                if(personal_stored) throw new Error('Ya existe un personal con ese correo');

                const sendEmail = {
                    nombre: newPersonal.nombre,
                    email: newPersonal.email,
                    //url: `http://${req.headers.host}/v1/socio/confirm-account/${newPersonal.token}`
                }
                console.log(sendEmail);
                //await Mailer.SendSignUpEmail(sendEmail); //send email ok
                
                const data = await PersonalRepository.Save(newPersonal)
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },
    Update: (personal) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { id, nombre, apellidos } = personal;

                const personal_stored = await PersonalRepository.FindById(id);
                if(!personal_stored) throw new Error('No existe el usuario');
                
                const personalUpdate = {
                    id, 
                    nombre: validator.trim(validator.escape(nombre)),
                    apellidos: validator.trim(validator.escape(apellidos)),
                }
                
                const data = await PersonalRepository.Save(personalUpdate);
                resolve(data);
            } catch (error) {
                reject(error)
            }
        });
    },
}

