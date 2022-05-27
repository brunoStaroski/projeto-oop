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
    salvarNovoCliente: async function (cliente) {
        const params = [cliente.nome, cliente.email]
        await con.query('INSERT INTO cliente(nome, email) VALUES (?, ?);', params)
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    editarCliente: async function (cliente) {
        const params = [cliente.id, cliente.nome, cliente.email, cliente.id];
        await con.query('UPDATE cliente SET id = ?, nome = ?, email = ? WHERE id = ?;', params)
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    obterListaClientes: async function () {
        return await con.query('SELECT * FROM cliente ORDER BY id ASC')
            .catch(err => console.log(err));
    },

    excluirCliente: async function (cliente) {
        const params = [cliente.id, cliente.nome, cliente.email]
        await con.query('DELETE FROM cliente WHERE cliente.id = ? AND cliente.nome = ? AND cliente.email = ? ;', params)
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

}