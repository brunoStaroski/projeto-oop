const express = require('express');
const app = express(), bodyParser = require("body-parser");
const port = 3080;
const clienteService = require('./services/clienteService');
const veiculoService = require('./services/veiculoService');
const pedidoService = require('./services/pedidoService');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.get('/obter-lista', async (req, res) => {
    if (!(Object.is(req.query.rota, null)) && !(Object.is(req.query.rota, ''))) {
        let result;
        switch (req.query.rota) {
            case 'cliente' :
                result = await clienteService.obterListaClientes();
                break;
            case 'veiculo' :
                result = await veiculoService.obterListaVeiculos();
                break;
            case 'pedido' :
                result = await pedidoService.obterListaPedidos();
        }

        res.json(result);
    }
});

app.post('/gravar', async (req, res) => {
    if (!(Object.is(req.query.rota, null)) && !(Object.is(req.query.rota, ''))) {
        if (!(Object.is(req.body, null)) && !(Object.is(req.body, ''))) {
            let result;
            switch (req.query.rota) {
                case 'cliente' :
                    result = await clienteService.salvarNovoCliente(req.body);
                    break;
                case 'veiculo' :
                    result = await veiculoService.salvarNovoVeiculo(req.body);
                case 'pedido' :
                    result = await pedidoService.salvarNovoPedido(req.body);
            }

            res.json(result);
        }
    }
});

app.post('/editar', async (req, res) => {
    if (!(Object.is(req.query.rota, null)) && !(Object.is(req.query.rota, ''))) {
        if (!(Object.is(req.body, null)) && !(Object.is(req.body, ''))) {
            let result;
            switch (req.query.rota) {
                case 'cliente' :
                    result = await clienteService.editarCliente(req.body);
                    break;
                case 'veiculo' :
                    result = await veiculoService.editarVeiculo(req.body);
                case 'pedido' :
                    result = await pedidoService.atualizarPedido(req.body);
            }

            res.json(result);
        }
    }

});

app.post('/excluir', async (req, res) => {
    if (!(Object.is(req.query.rota, null)) && !(Object.is(req.query.rota, ''))) {
        if (!(Object.is(req.body, null)) && !(Object.is(req.body, ''))) {
            let result;
            switch (req.query.rota) {
                case 'cliente' :
                    result = await clienteService.excluirCliente(req.body);
                    break;
                case 'veiculo' :
                    result = await veiculoService.excluirVeiculo(req.body);
                case 'pedido' :
                    result = await pedidoService.excluirPedido(req.body);
            }

            res.json(result);
        }
    }

});

app.listen(port, () => {
    console.log(`Server on na porta:${port}`);
});