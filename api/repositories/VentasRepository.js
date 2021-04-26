
module.exports = {
    Save: (venta) => {
        return new Promise(async (resolve, reject) => {
            try {
                if(venta.id){
                    resolve( await Ventas.updateOne({id: venta.id}).set(venta));
                } else {
                    resolve( await Ventas.create(venta).fetch() );
                }
            } catch (error) {
                reject(error)
            }
        });
    },
    FindById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Ventas.findOne({id}))
            } catch (error) {
                reject(error)
            }
        });
    },
    
    FindByFilter: (filter) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await Ventas.find(filter) );
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