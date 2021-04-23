module.exports = {
    Save: (personal) => {
        return new Promise (async (resolve, reject) => {
            try {
                if(personal.id){
                    resolve( await Personal.updateOne({id: personal.id}).set(personal))
                } else {
                    resolve( await Personal.create(personal).fetch());
                }
            } catch (error) {
                reject(error);
            }
        })
    }, 

    FindById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Personal.findOne({id}))
            } catch (error) {
                reject(error)
            }
        });
    },

    FindByEmail: (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Personal.findOne({email}))
            } catch (error) {
                reject(error)
            }
        });
    },

    FindByToken: (token, fecha) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Personal.findOne({
                    where: {
                        token: token,
                        expira: {
                            '>': fecha
                        }
                    }
                }))
            } catch (error) {
                reject(error)
            }
        })
    },
    
    FindByFilter: (filter) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Personal.find(filter) );
            } catch (error) {
                reject(erro)
            }
        });
    },

    Pagination: (limit, skip) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Personal.find({
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
                resolve( await Personal.updateOne( {id} ).set( {isActivate: false} ));
            } catch (error) {
                reject(erro)
            }
        });
    },
    
    Activate: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Personal.updateOne( {id} ).set( {isActivate: true} ));
            } catch (error) {
                reject(erro)
            }
        });
    },
}