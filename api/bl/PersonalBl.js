//archivo donde va todoa la logia de negocios 
//validaciones, saniizacion y manejo de datos 
//para enviarlos a repository
const { default: validator } = require('validator');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');

const PersonalRepository = require('../repositories/PersonalRepository');
const JwtGenerate = require('../common/Jwtoken');
const Mailer = require('../services/MailerService');

module.exports = {
    Login: (personal) => {
        return new Promise(async (resolve, reject) => {
            try {
                const personal_stored = await PersonalRepository.FindByEmail({email: personal.email})
                
                if(!personal_stored.isActivate){
                    throw new Error('La cuenta a la que intenta acceder no esta activa.');
                }else if (!personal_stored) {
                    throw new Error('Favor de verificar sus datos, socio no encontrado');
                }

                const token = JwtGenerate.issue({id: personal_stored.id});
                personal_stored.token = token;

                if(bcryptjs.compareSync(personal.password, personal_stored.password)) {
                    resolve(personal_stored);
                } else { 
                    throw new Error('Contraseña incorrecta');
                }
            } catch (error) {
                reject(error)
            }
        });
    },
    Confirmar: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const personal = await PersonalRepository.FindByToken(req.params.token, Date.now());
                if(!personal){
                    throw new Error('Error limite de tiempo superado o Link deñado')
                }
                personal.isActivate = true;
                personal.token = '';
                personal.expira = ''
                
                const data = await PersonalRepository.Save(personal);
                resolve(data)
            } catch (error) {
                reject(error)
            }
        });
    },

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
                    token: crypto.randomBytes(30).toString('hex'),
                    expira: Date.now() + 1800000 //fecha exacta mas 30min
                }
                
                const personal_stored = await PersonalRepository.FindByEmail(newPersonal.email);

                if(personal_stored) throw new Error('Ya existe un personal con ese correo');

                const sendEmail = {
                    nombre: newPersonal.nombre,
                    email: newPersonal.email,
                    url: `http://${req.headers.host}/api/v1/personal/confirm-account/${newPersonal.token}`
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
    Find: (filter) => {
        return new Promise(async (resolve, reject) => {
            try {
                if(filter.id > 0){
                    resolve( await PersonalRepository.FindById(filter.id) );
                } else {
                    resolve( await PersonalRepository.FindByFilter(filter) );
                }
            } catch (error) {
                reject(error)
            }
        });
    },

    Pagination: (limit, skip) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await PersonalRepository.Pagination(limit, skip) );
            } catch (error) {
                reject(error)
            }
        });
    },

    Activate: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await PersonalRepository.Activate(id) );
            } catch (error) {
                reject(error)
            }
        });
    },
    
    Deactivate: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await PersonalRepository.Deactivate(id) )
            } catch (error) {
                reject(error)
            }
        });
    },
}

