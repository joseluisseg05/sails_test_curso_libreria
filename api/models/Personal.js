/**
 * Personal.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
 //https://sailsjs.com/documentation/concepts/models-and-orm/associations/one-to-many
const bcryptjs = require('bcryptjs');

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
    token:{
      type: 'string'
    },
    expira: {
      type: 'string'
    },
    isActivate: { 
      type: 'boolean', 
      defaultsTo: false
    },
    ventas: {//atributo que sirve como llave 
      collection: 'ventas',// que coleccion voy a referenciar
      via: 'personal'//que campo de la coleccion voy a crear la relacion
    }
  },

  customToJSON: function () {
    return _.omit(this, ['password', 'createdAt', 'updatedAt']);
  },

  beforeCreate: async(personal, next)=> {
    personal.password = await bcryptjs.hashSync(personal.password, bcryptjs.genSaltSync(12));
    next()
  }
};