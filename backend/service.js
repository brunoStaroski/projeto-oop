const pg = require('pg');
const pool = new pg.Pool({user: 'postgres',host: 'localhost',database: 'projeto-oop',password: 'postgres',port: 5432});

module.exports = {
    salvarNovoCliente: async function (cliente) {
        try {
            const client = await pool.connect();
            const params = [cliente.nome, cliente.email]
            console.log(params);
            let result = await client.query('INSERT INTO cliente(nome, email) VALUES ($1, $2);', params);
            client.release();
            return true;
        } catch (err){
            console.log(err);
            return false;
        }
    },

    obterListaClientes: async function () {
        try {
            const client = await pool.connect();
            let result = await client.query('SELECT * FROM cliente ORDER BY id ASC');
            client.release();
            if (result) {
                return result.rows;
            } else {
                return [];
            }
        } catch (err){
            console.log(err);
        }
    },

}