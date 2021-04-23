/**
 * PersonalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var Response = require('../common/Response');
var Response = new Response();

const Personal = require('../bl/PersonalBl');

module.exports = {
  create: async(req, res) => {
    const personal = req.body.personal;
    Personal.Create(personal, req)
    .then( data => {
        const response = Response.successResponse();
        response.data = data;
        return res.status(201).send(response);
    }) 
    .catch( error => {
        const response = Response.errorResponse();
        response.error.message = error.message;
        response.error.code = 400;
        return res.status(400).send(response)
    })
  },
  update: async (req, res) => {
    const personal = req.body.personal;
    Personal.Update(personal)
    .then( data => {
        const response = Response.successResponse();
        response.data = data;
        return res.status(200).send(response);
    })
    .catch( error => {
        const response = Response.errorResponse();
        response.error.message = error.message;
        response.error.code = 400;
        return res.status(400).send(response);
    })
  },
  find: async (req, res) => {
    const filter = req.body.filter;
    Personal.Find(filter)
    .then( data => {
        const response = Response.successResponse();
        response.data = data;
        return res.send(response);
    })
    .catch( error => {
        const response = Response.errorResponse();
        response.error.message = error.message;
        response.error.code = 400;
        return res.status(400).send(response);//quitar status??
    })
},

  pagination: async (req, res) => {
    const {limit= 5, skip= 0} = req.query;
    //console.log(req.user) una vez que inician sesion ya se obtiene los datos del usuario con req.user
    Personal.Pagination(limit, skip)
    .then( data => {
        const response = Response.successResponse();
        response.data = data;
        return res.send(response);
    })
    .catch( error => {
        const response = Response.errorResponse();
        response.error.message = error.message;
        response.error.code = 400;
        return res.status(400).send(response);//quitar status??
    })
  },
};

