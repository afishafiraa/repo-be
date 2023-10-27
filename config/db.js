const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'blog',
    user: 'postgres',
    password: 'shafira88',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

module.exports = pool;

// async function connectDB(){
//     await client.connect()

//     const res = await client.query(
//         // `SELECT $1::text as message`,
//         // ['Helooww World!']
//         `SELECT nama, body FROM accounts JOIN posts ON accounts.id = posts.user_id;`
//     )

//     console.log(res.rows[2].nama, res.rows[2].body)
//     await client.end()
// }

// connectDB();