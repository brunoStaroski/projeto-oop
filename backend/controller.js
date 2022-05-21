const express = require('express');
const app = express(), bodyParser = require("body-parser");
const port = 3080;
const clienteService = require('./services/clienteService');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.get('/obter-lista-clientes', async (req, res) => {
    const r = await clienteService.obterListaClientes();
    res.json(r);
});

app.post('/gravar-novo-cliente', async (req, res) => {
    if (!(Object.is(req.body, null)) && !(Object.is(req.body, ''))) {
        const r = await clienteService.salvarNovoCliente(req.body);
        res.json(r);
    }
});

app.post('/editar-cliente', async (req, res) => {
    if (!(Object.is(req.body, null)) && !(Object.is(req.body, ''))) {
        console.log(req.body);
        const r = await clienteService.editarCliente(req.body);
        res.json(r);
    }
});

app.post('/excluir-cliente', async (req, res) => {
    if (!(Object.is(req.body, null)) && !(Object.is(req.body, ''))) {
        console.log(req.body);
        const r = await clienteService.excluirCliente(req.body);
        res.json(r);
    }
});

app.listen(port, () => {
    console.log(`Server on na porta:${port}`);
});