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

    async inserirEstoque(idVeiculo, quantidade) {
        const params = [idVeiculo, quantidade];
        await con.query('INSERT INTO estoque (id_veiculo, quantidade) VALUES (?, ?);', params)
            .catch(err => {
                console.log(err);
            });
    },

    async atualizarEstoque(idVeiculo, quantidade) {
        const params = [quantidade, idVeiculo];
        await con.query('UPDATE estoque SET quantidade = ? WHERE id_veiculo = ?;', params)
            .catch(err => {
                console.log(err);
            });
    },

    async obterEstoqueVeiculo(idVeiculo) {
        let result = await con.query('SELECT quantidade FROM estoque e WHERE id_veiculo = ?;', [idVeiculo])
            .catch(err => {
                console.log(err);
            });
        if (result.length > 0) {
            let qt = JSON.stringify(result[0]);
            return JSON.parse(qt).quantidade;
        } else {
            return 0;
        }
    },

    async deletarEstoque(idVeiculo) {
        await con.query('DELETE FROM estoque WHERE id_veiculo = ? ;', [idVeiculo])
            .catch(err => {
                console.log(err);
            });
    }

}