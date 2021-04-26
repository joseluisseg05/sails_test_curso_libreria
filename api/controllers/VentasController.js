/**
 * VentasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var Response = require('../common/Response');
var Response = new Response();
const Ventas = require('../bl/VentasBl');
 
module.exports = {
    create: async (req, res) => {
        const user = req.user;
        const venta = req.body.venta;
        Ventas.Create(venta, user)
        .then((data) => {
            const response = Response.successResponse();
            response.data = data;
            return res.status(201).send(response);
        })
        .catch((error) => {
            const response = Response.errorResponse();
            response.error.message = error.message;
            response.error.code = 400;
            return res.status(400).send(response);
        });
    },
 
    update: async (req, res) => {
        const user = req.user;
        const venta = req.body.venta;
        Ventas.Update(venta, user)
        .then((data) => {
            const response = Response.successResponse();
            response.data = data;
            return res.status(200).send(response);
        })
        .catch((error) => {
            const response = Response.errorResponse();
            response.error.message = error.message;
            response.error.code = 400;
            return res.status(400).send(response);
        });
    },
 
    find: async (req, res) => {
        const filter = req.body.filter;
        Ventas.Find(filter)
        .then((data) => {
            const response = Response.successResponse();
            response.data = data;
            return res.send(response);
        })
        .catch((error) => {
            const response = Response.errorResponse();
            response.error.message = error.message;
            response.error.code = 400;
            return res.status(400).send(response); //quitar status??
        });
    },
 
    pagination: async (req, res) => {
        const { limit = 5, skip = 0 } = req.query;
        Ventas.Pagination(limit, skip)
        .then((data) => {
            const response = Response.successResponse();
            response.data = data;
            return res.send(response);
        })
        .catch((error) => {
            const response = Response.errorResponse();
            response.error.message = error.message;
            response.error.code = 400;
            return res.status(400).send(response); //quitar status??
        });
    }, 
 };
 
 