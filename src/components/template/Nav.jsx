import './Nav.css'
import React from "react";
import { Link } from "react-router-dom";

export default props =>
    <aside className={'menu-area'}>
        <nav className={'menu'}>
            <Link to={'/'}>
                <i className={'fa fa-home'}></i> Início
            </Link>
            <Link to={'/clientes'}>
                <i className={'fa fa-users'}></i> Clientes
            </Link>
            <Link to={'/veiculos'}>
                <i className={'fa fa-car'}></i> Veiculos
            </Link>
            <Link to={'/vendas'}>
                <i className={'fa fa-shopping-cart'}></i> Vendas
            </Link>
        </nav>
    </aside>