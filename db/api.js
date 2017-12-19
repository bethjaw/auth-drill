var knex = require('./knex')

module.exports = {
  signIn: function() {

  },
  signUp: function(body, hash) {
    return knex('my_user').insert({
      'agentName': body.agentName,
      'password': hash
    }).returning('*')
  }
}
