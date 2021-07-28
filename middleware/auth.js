'use strict'
const jwt = require('jsonwebtoken')
const jwtDecode = require("jwt-decode")

function init(role) {
  return async function(req, res, next){
    if (req.headers['x-access-token']) {
      const token = req.headers['x-access-token']
      const dataUser = jwtDecode(token)
      await jwt.verify(token, process.env.JWT_KEY ,function (err ,result){
        if (err) {
          res.status(401).send({
            success: false,
            message : "Token expired!"
          })
        } else {
          if(role.includes(dataUser.role_id)){
            req.auth = result;
            next();
          } else {
            res.status(500).send({
              success: false,
              message : "Your role can't accesss this endpont!"
            })
          }
        }
      });
    } else {
      res.status(500).send({
        success: false,
        message : "UnAuthorized. The client does not have access rights to the content"
      })
    }
  }
}

module.exports = init