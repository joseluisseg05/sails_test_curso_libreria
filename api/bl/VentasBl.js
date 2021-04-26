const VentasRepository = require('../repositories/VentasRepository');
const LibrosRepository = require('../repositories/LibrosRepository');
//agregar la funcion de cantidad
module.exports = {
    Create: (venta, user) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { cliente, costo_total, items} = venta;
                for(var i = 0; i<items.length; i++){
                    let existe = await LibrosRepository.FindById(items[i].id);
                    if(!existe){
                        console.log('No existe el libro ', items[i].id);
                        items.splice(i, 1);
                        i--;
                    }
                };
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