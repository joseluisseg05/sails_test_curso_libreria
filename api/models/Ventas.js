/**
 * Ventas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'mongo',
  tableName: 'Ventas',

  attributes: {
    personal: {
      type: 'string',
      required: true
    },
    cliente: {
      type: 'json',
      required: true
    },
    items: {
      type: 'json',
      columnType: 'array'
    },
    fecha:{
      type: 'string',
      required: true
    },
    costo_total: {
      type: 'number',
      required: true
    },
    personal: {// campo con el que se va a realizar la realacion  
      model: 'personal'// modelo que estoy tomando
    }
  },

};

