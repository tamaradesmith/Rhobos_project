// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'rv_project',
      username: 'tamara',
      password: 'tamara'
    },
    mirgrations:{
      directory: '.db/magrations'
    }
  },

};
