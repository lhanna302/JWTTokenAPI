const config = {
    port: process.env.port || 3000,
    db: {
        host: "localhost",
        database: "user_db",
        user: process.env.user,
        password: process.env.password,
    },

};

module.exports = config;
