const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = require('./config')

module.exports = {

  development: {
    client: 'postgres',
    connection: {
      host:     DB_HOST,
      port:     DB_PORT,
      database: DB_NAME,
      user:     DB_USER,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    }, 
    migrations: {
      directory: './models/migrations'
    }
  }

}
