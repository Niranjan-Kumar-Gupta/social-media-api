const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"socialmediaapi",
    password:"Interval12345jk",
    port:5432,
});

export default pool;