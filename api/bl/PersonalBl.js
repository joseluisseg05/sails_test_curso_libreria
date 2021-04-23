//archivo donde va todoa la logia de negocios 
//validaciones, saniizacion y manejo de datos 
//para enviarlos a repository

module.exports = {
    Create: (personal) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(personal)
                resolve(personal)
            } catch (error) {
                reject(error);
            }
        });
    }
}

