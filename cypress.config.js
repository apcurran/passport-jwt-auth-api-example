const { defineConfig } = require("cypress");
const pgp = require("pg-promise")();

module.exports = defineConfig({
    e2e: {
        baseUrl: "http://localhost:5000/api",
        setupNodeEvents(on, config) {
            const db = pgp({
                user: config.env.DB_USER,
                port: config.env.DB_PORT,
                database: config.env.DB_NAME,
                host: config.env.DB_HOST,
                password: config.env.DB_PASSWORD,
            });

            on("task", {
                resetDbUsers() {
                    return db.none("TRUNCATE TABLE app_user")
                        .then(() => {
                            console.log("DB users reset.");

                            return null;
                        })
                        .catch((err) => {
                            console.error("Something went wrong in users reset:", err);
                        });
                },
                async logger() {
                    console.log(process.env.DB_PASSWORD);

                    // const myUser = await db.one("SELECT * FROM app_user");
                    // console.log(myUser);

                    return null;
                },
            });
        },
    },
});
