module.exports = {
    
    development: {
        client: 'mysql',
        debug: true,
        connection: {
            host : 'mysql',
            user : 'root',
            password : 'mandexpa',
            database : 'mandexpa'
        },
        pool: {
          min: 2,
          max: 10
        },
    production: {
      client: 'mysql',
      debug: false,
      connection: {
        host : 'mysql',
            user : 'root',
            password : 'mandexpa',
            database : 'mandexpa'
      },
      pool: {
        min: 2,
        max: 10
      }
    }
  }
};
