const pool = require('../../config/db');

module.exports = {
    async get(search = null, page = 1, limit = 10){
        const s = search ? `%${search}` : null;
        const result = await pool.query(
            `SELECT * FROM accounts
            WHERE 
               ($1::text is null or nama like $1) or
               ($1::text is null or email like $1)
            LIMIT $2
            OFFSET $3
            `,
            [s, limit, (page - 1) * limit]
        )
        return result.rows 
    },
    async getById(id){
        const result = await pool.query(
            "SELECT * FROM accounts WHERE id=$1;", [id]
        )
        return result.rows
    },
    async create({nama, email, password, profile, verified}){
        const result = await pool.query(
            `INSERT INTO accounts 
                (nama, email, password, profile, verified)
                VALUES ($1, $2, $3, $4, $5);
            `
            [nama, email, password, profile, verified]
        )
        return result.rows
    },
    async update({id, nama, email, password, profile, verified}){
        const result = await pool.query(
            `UPDATE accounts 
                SET
                nama = $1,
                email = $2, 
                password = $3, 
                profile = $4, 
                verified = $5
            WHERE id = $6;
            `,
            [nama, email, password, profile, verified]
        )
        return result.rows
    },
    async delete(){
        const result = await pool.query(
            "DELETE FROM accounts WHERE id=$1", [id]
        )
        return result.rows
    }
}