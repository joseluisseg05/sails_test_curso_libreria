
module.exports = {
    Save: (venta) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Ventas.create(venta).fetch() );
            } catch (error) {
                reject(error)
            }
        });
    },
    FindById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Ventas.findOne({id}).populate('personal') )
            } catch (error) {
                reject(error)
            }
        });
    },
    
    FindByFilter: (filter) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Ventas.find(filter).populate('personal') );
            } catch (error) {
                reject(erro)
            }
        });
    },

    Pagination: (limit, skip) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Ventas.find({
                    limit,
                    skip
                }).populate('personal') );
            } catch (error) {
                reject(erro)
            }
        });
    },
}