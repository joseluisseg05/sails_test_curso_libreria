const LibrosRepository = require('../repositories/LibrosRepository');
const {default: validator} = require('validator');
//agregar la funcion de cantidad
module.exports = {
    Create: (libro, user) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {titulo, autor, anio, editorial, precio} = libro;
                const newlibro = {
                    titulo: validator.escape(validator.trim(titulo)),
                    autor: validator.escape(validator.trim(autor)), 
                    anio,
                    editorial: validator.escape(validator.trim(editorial)),
                    precio,
                    createBy: user
                } 
                //console.log(user) tiene el id del usuario
                //se puede poner mas funcionalidad
                //ingresar de esta forma o por asociaciones de sails para user populate
                const data = await LibrosRepository.Save(newlibro);
                resolve(data);
            } catch (error) {
                reject(error)
            }
        });
    },

    Update: (libro, user) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {titulo, autor, anio, editorial, precio} = libro;
                const updatelibro = {
                    id: libro.id,
                    titulo: validator.escape(validator.trim(titulo)),
                    autor: validator.escape(validator.trim(autor)), 
                    anio,
                    editorial: validator.escape(validator.trim(editorial)),
                    precio,
                    createBy: user
                } 
                const data = await LibrosRepository.Save(updatelibro);
                resolve(data)
                //console.log(updatelibro);
            } catch (error) {
                reject(error)
            }
        });
    },

    Find: (filter) => {
        return new Promise(async (resolve, reject) => {
            try {
                if(filter.id > 0){
                    resolve( await LibrosRepository.FindById(filter.id) );
                } else {
                    resolve( await LibrosRepository.FindByFilter(filter) );
                }
            } catch (error) {
                reject(error)
            }
        });
    },

    Pagination: (limit, skip) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await LibrosRepository.Pagination(limit, skip) );
            } catch (error) {
                reject(error)
            }
        });
    },

    Activate: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await LibrosRepository.Activate(id) );
            } catch (error) {
                reject(error)
            }
        });
    },
    
    Deactivate: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await LibrosRepository.Deactivate(id) )
            } catch (error) {
                reject(error)
            }
        });
    },
}