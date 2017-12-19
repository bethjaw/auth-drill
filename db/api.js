var knex = require('./knex')

module.exports = {
  signIn: function(body) {
    return knex('my_user').select('*').where('agentName', body.agentId).returning('*')
  },
  signUp: function(body, hash) {
    return knex('my_user').insert({
      'agentName': body.agentName,
      'password': hash
    }).returning('*')
  }
}
