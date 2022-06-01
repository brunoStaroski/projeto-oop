const mysql = require('mysql');
const util = require('util');
const estoqueService = require('./estoqueService');

const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'projeto-oop'
});

con.query = util.promisify(con.query).bind(con);

module.exports = {

    async salvarNovoVeiculo(veiculo) {
        const params = [veiculo.marca, veiculo.modelo, veiculo.valor];
        await con.query('INSERT INTO veiculo(marca, modelo, valor) VALUES (?, ?, ?);', params)
            .then(result => {
                if (result != null) {
                    estoqueService.inserirEstoque(result.insertId, veiculo.quantidade);
                }
            })
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    async editarVeiculo(veiculo) {
        const params = [veiculo.id, veiculo.marca, veiculo.modelo, veiculo.valor, veiculo.id];
        await con.query('UPDATE veiculo SET id = ?, marca = ?, modelo = ?, valor = ? WHERE id = ?;', params)
            .then(result => {
                estoqueService.atualizarEstoque(veiculo.id, veiculo.quantidade);
            })
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    async excluirVeiculo(veiculo) {
        await estoqueService.deletarEstoque(veiculo.id);
        await con.query('DELETE FROM veiculo WHERE veiculo.id = ? ;', [veiculo.id])
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    async obterListaVeiculos() {
        let listaVeiculo = [];
        let result = await con.query('SELECT * FROM veiculo ORDER BY id ASC').catch(err => console.log(err));
        for (const veiculo of result) {
            let qtEstoque = await estoqueService.obterEstoqueVeiculo(veiculo.id);
            listaVeiculo.push({id: veiculo.id, marca: veiculo.marca, modelo: veiculo.modelo, valor: veiculo.valor, quantidade: qtEstoque});
        }
        return listaVeiculo;
    },

    async obterVeiculoPorId(idVeiculo) {
        let result = await con.query('SELECT * FROM veiculo v WHERE id = ?;', [idVeiculo])
            .catch(err => {
                console.log(err);
            });
        let veiculo;
        for (const veiculoTemp of result) {
            let qtEstoque = await estoqueService.obterEstoqueVeiculo(veiculoTemp.id);
            veiculo = {id: veiculoTemp.id, marca: veiculoTemp.marca, modelo: veiculoTemp.modelo, valor: veiculoTemp.valor, quantidade: qtEstoque}
        }
        return veiculo;
    }




}