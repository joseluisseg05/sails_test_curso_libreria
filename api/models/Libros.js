/**
 * Libros.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'mongo',
  tableName: 'Libros',

  attributes: {
    titulo: {
      type: 'string',
      required: true
    },
    autor: {
      type: 'string',
      required: true
    },
    anio: {
      type: 'number',
      required: true
    },
    editorial: {
      type: 'string',
      required: true
    },
    precio: {
      type: 'number',
      required: true
    }
  },

};

