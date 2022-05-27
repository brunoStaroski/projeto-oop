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

    salvarNovoVeiculo: async function (veiculo) {
        const params = [veiculo.marca, veiculo.modelo, veiculo.valor];
        await con.query('INSERT INTO veiculo(marca, modelo, valor) VALUES (?, ?, ?);', params)
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    editarVeiculo: async function (veiculo) {
        const params = [veiculo.id, veiculo.marca, veiculo.modelo, veiculo.valor, veiculo.id];
        await con.query('UPDATE veiculo SET id = ?, marca = ?, modelo = ?, valor = ? WHERE id = ?;', params)
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    excluirVeiculo: async function (veiculo) {
        const params = [veiculo.id, veiculo.marca, veiculo.modelo, veiculo.valor];
        await con.query('DELETE FROM veiculo WHERE veiculo.id = ? AND veiculo.marca = ? AND veiculo.modelo = ? AND veiculo.valor = ? ;', params)
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    obterListaVeiculos: async function () {
        return await con.query('SELECT * FROM veiculo ORDER BY id ASC')
            .catch(err => console.log(err));
    },




}