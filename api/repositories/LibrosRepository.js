
module.exports = {
    Save: (libro) => {
        return new Promise(async (resolve, reject) => {
            try {
                if(libro.id){
                    resolve( await Libros.updateOne({id: libro.id}).set(libro));
                } else {
                    resolve( await Libros.create(libro).fetch() );
                }
            } catch (error) {
                reject(error)
            }
        });
    },
    FindById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Libros.findOne({id}))
            } catch (error) {
                reject(error)
            }
        });
    },
    
    FindByFilter: (filter) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Libros.find(filter) );
            } catch (error) {
                reject(erro)
            }
        });
    },

    Pagination: (limit, skip) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Libros.find({
                    where: {isActivate: true},
                    limit,
                    skip
                }) );
            } catch (error) {
                reject(erro)
            }
        });
    },
    
    Deactivate: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Libros.updateOne( {id} ).set( {isActivate: false} ));
            } catch (error) {
                reject(erro)
            }
        });
    },
    
    Activate: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Libros.updateOne( {id} ).set( {isActivate: true} ));
            } catch (error) {
                reject(erro)
            }
        });
    },
}