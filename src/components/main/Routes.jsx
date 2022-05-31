import React from "react";
import ReactDOM from "react-dom/client";
import {
    Routes,
    Route,
} from "react-router-dom";

import Home from '../home/Home';
import Cliente from "../cliente/Cliente";
import Veiculos from "../veiculos/Veiculos";
import Vendas from "../vendas/vendas";

export default props =>
        <Routes>
            <Route exact path={'/'} element={<Home />} />
            <Route exact path={'/clientes'} element={<Cliente />} />
            <Route exact path={'/veiculos'} element={<Veiculos />} />
            <Route exact path={'/vendas'} element={<Vendas />} />
            <Route path={'*'} element={<Home />} />
        </Routes>
