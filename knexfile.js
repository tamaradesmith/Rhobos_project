// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'obhemcs', 
      username: 'tamara',
      password: 'tamara'
    },

    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds'
    },
  },

};
