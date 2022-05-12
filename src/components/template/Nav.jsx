import './Nav.css'
import React from "react";

export default props =>
    <aside className={'menu-area'}>
        <nav className={'menu'}>
            <a href={'#/'}>
                <i className={'fa fa-home'}></i> Início
            </a>
            <a href={'#/cliente'}>
                <i className={'fa fa-users'}></i> Cliente
            </a>
            <a href={'#/veiculo'}>
                <i className={'fa fa-car'}></i> Veiculo
            </a>
            <a href={'#/estoque'}>
                <i className={'fa fa-box'}></i> Estoque
            </a>
            <a href={'#/venda'}>
                <i className={'fa fa-box'}></i> Venda
            </a>
        </nav>
    </aside>