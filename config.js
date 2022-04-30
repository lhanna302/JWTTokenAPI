const config = {
    port: process.env.port || 3000,
    db: {
        host: "mysql",
        database: "user_db",
        user: process.env.user || 'root',
        password: process.env.password || 'password',
    },
};

module.exports = config;
