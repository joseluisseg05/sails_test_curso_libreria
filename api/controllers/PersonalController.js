/**
 * PersonalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Personal = require('../bl/PersonalBl');

module.exports = {
  create: async(req, res) => {
    const personal = req.body.personal;
    try {
        const data = await Personal.Create(personal);
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
  }

};

