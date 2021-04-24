/**
 * LibrosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var Response = require('../common/Response');
var Response = new Response();
const Libros = require('../bl/LibrosBl');

module.exports = {
    create: async (req, res) => {
        const user = req.user;
        const libro = req.body.libro;
        Libros.Create(libro, user)
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
        const libro = req.body.libro;
        Libros.Update(libro, user)
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
        Libros.Find(filter)
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
        Libros.Pagination(limit, skip)
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
    
    deactivate: async (req, res) => {
        const id_libro = req.params.id_libro;
        Libros.Deactivate(id_libro)
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

    activate: async (req, res) => {
        const id_libro = req.params.id_libro;
        Libros.Activate(id_libro)
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

