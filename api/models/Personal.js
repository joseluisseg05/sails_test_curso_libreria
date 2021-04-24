/**
 * Personal.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
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
    isActivate: {
      type: 'boolean', 
      defaultsTo: false
    },
    token:{
      type: 'string'
    },
    expira: {
      type: 'string'
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