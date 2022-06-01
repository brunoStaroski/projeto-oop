const mysql = require('mysql');
const util = require('util');
const clienteService = require('./clienteService');
const veiculoService = require('./veiculoService');
const estoqueService = require("./estoqueService");

const con = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : 'root',
                database : 'projeto-oop'
            });

con.query = util.promisify(con.query).bind(con);

module.exports = {
    async salvarNovoPedido(pedido) {
        const params = [pedido.cliente, pedido.veiculo];
        await con.query('INSERT INTO pedido(id_cliente, id_veiculo, data) VALUES (?, ?, Now());', params)
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    async atualizarPedido(pedido) {
        const params = [pedido.id, pedido.cliente, pedido.veiculo, pedido.id];
        await con.query('UPDATE pedido SET id_cliente = 0, id_veiculo = 0, data = Now()  WHERE id = ?;', params)
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    async excluirPedido(pedido) {
        await con.query('DELETE FROM pedido WHERE id = ? ;', [pedido.id])
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    },

    async obterListaPedidos() {
        let listaPedidos = [];
        let result = await con.query('SELECT * FROM pedido ORDER BY id ASC').catch(err => console.log(err));
        for (const pedido of result) {
            let cliente = await clienteService.obterClientePorId(pedido.id_cliente);
            let veiculo = await veiculoService.obterVeiculoPorId(pedido.id_veiculo);
            listaPedidos.push({id: pedido.id, cliente: cliente, veiculo: veiculo, data: pedido.data});
        }
        return listaPedidos;
    }


}