const mysql = require('mysql');
const util = require('util');

const con = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : 'root',
                database : 'projeto-oop'
            });

con.query = util.promisify(con.query).bind(con);

module.exports = {
    async salvarNovoCliente(cliente) {
        const params = [cliente.nome, cliente.email]
        await con.query('INSERT INTO cliente(nome, email) VALUES (?, ?);', params)
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    async editarCliente(cliente) {
        const params = [cliente.id, cliente.nome, cliente.email, cliente.id];
        await con.query('UPDATE cliente SET id = ?, nome = ?, email = ? WHERE id = ?;', params)
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    async obterListaClientes() {
        return await con.query('SELECT * FROM cliente ORDER BY id ASC')
            .catch(err => console.log(err));
    },

    async excluirCliente(cliente) {
        await con.query('DELETE FROM cliente WHERE cliente.id = ? ;', [cliente.id])
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    async obterClientePorId(idCliente) {
        let result = await con.query('SELECT * FROM cliente c WHERE id = ?;', [idCliente])
            .catch(err => {
                console.log(err);
            });
        if (result.length > 0) {
            let cliente = JSON.stringify(result[0]);
            return JSON.parse(cliente);
        } else {
            return 0;
        }
    }

}