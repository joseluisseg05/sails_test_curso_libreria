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
    Personal.Create(personal)
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
  }
};

