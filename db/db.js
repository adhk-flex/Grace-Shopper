const Sequelize = require("sequelize");
const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

const dbSyncAndSeed = () => {
    return db.authenticate()
        .then(() => db.sync())
        .then(() => console.log("DB SYNC COMPLETE"))
};

module.exports = { db, dbSyncAndSeed };
