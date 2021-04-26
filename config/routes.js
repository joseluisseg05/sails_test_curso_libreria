/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    'GET /api/v1/status': { controller: 'ApiController', action: 'status'},

    /****PERSONAL****/
    'POST /api/v1/personal/login': { controller: 'PersonalController', action: 'login'},
    'POST /api/v1/personal/confirm-account/:token': { controller: 'PersonalController', action: 'confirmar' },

    'POST /api/v1/personal': { controller: 'PersonalController', action: 'create'},
    'PUT /api/v1/personal': { controller: 'PersonalController', action: 'update'},
    'POST /api/v1/personal/find': { controller: 'PersonalController', action: 'find'},
    'GET /api/v1/personal/pagination': { controller: 'PersonalController', action: 'pagination'},
    'DELETE /api/v1/personal/deactivate/:id_personal': { controller: 'PersonalController', action: 'deactivate' },
    'PUT /api/v1/personal/activate/:id_personal': { controller: 'PersonalController', action: 'activate' },

    /****LIBROS****/
    'POST /api/v1/libro/create': { controller: 'LibrosController', action: 'create'},
    'PUT /api/v1/libro/update': { controller: 'LibrosController', action: 'update'},
    'POST /api/v1/libro/find': { controller: 'LibrosController', action: 'find'},
    'GET /api/v1/libro/pagination': { controller: 'LibrosController', action: 'pagination'},
    'DELETE /api/v1/libro/deactivate/:id_libro': { controller: 'LibrosController', action: 'deactivate' },
    'PUT /api/v1/libro/activate/:id_libro': { controller: 'LibrosController', action: 'activate' },

    /****VENTAS****/
    'POST /api/v1/venta/create': { controller: 'VentasController', action: 'create'},
    'POST /api/v1/venta/find': { controller: 'VentasController', action: 'find'},
    'GET /api/v1/venta/pagination': { controller: 'VentasController', action: 'pagination'},
};
