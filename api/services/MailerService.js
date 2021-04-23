/*-----Personal-----*/

module.exports = {
    SendSignUpEmail: (personal) => {
        return new Promise(async (resolve, reject) => {
            sails.hooks.email.send(
                "PersonalSignUp", {
                    Name: personal.nombre,
                    Url: personal.url
                    //definir mas variables para enviar el email
                }, {
                    to: personal.email,
                    subject: "Bienvenido al sistema "
                }, function(error) {
                    if(error) reject(error)
                    resolve(1)
                }
            )
        })
    }
}