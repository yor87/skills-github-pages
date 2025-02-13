const pool = require('./config/db');

const testQuery = async () => {
    try {
        const email = 'prueba@example.com';
        //const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log("email", email);
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        console.log(result.rows);
    } catch (error) {
        console.error("❌ Error en la prueba:", error);
    }
};

testQuery();
