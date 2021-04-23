/**
 * Personal.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {
  datastore: 'mongo', 
  tableName: 'Personal',

  attributes: {
    nombre: {
      type: 'string',
      required: true
    },
    apellidos: {
      type: 'string',
      required: true
    },
    
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true,
    },
  },

};