const VentasRepository = require('../repositories/VentasRepository');
//agregar la funcion de cantidad
module.exports = {
    Create: (venta, user) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { cliente, costo_total, items} = venta;
                const newVenta = {
                    personal: user,
                    cliente,
                    fecha: Date.now().toString(), 
                    costo_total,
                    items
                } 
                const data = await VentasRepository.Save(newVenta);
                resolve(data);
            } catch (error) {
                reject(error)
            }
        });
    },

    Update: (venta, user) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { cliente, costo_total, items} = venta;
                const updateVenta= {
                    personal: user,
                    cliente,
                    fecha: Date.now().toString(), 
                    costo_total,
                    items
                } 
                const data = await VentasRepository.Save(updateVenta);
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
                    resolve( await VentasRepository.FindById(filter.id) );
                } else {
                    resolve( await VentasRepository.FindByFilter(filter) );
                }
            } catch (error) {
                reject(error)
            }
        });
    },

    Pagination: (limit, skip) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve( await VentasRepository.Pagination(limit, skip) );
            } catch (error) {
                reject(error)
            }
        });
    },

}