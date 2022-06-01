import React, {Component} from "react";
import Main from "../template/Main";
import axios from "axios";
import Moment from 'react-moment';
import {Dropdown} from "primereact/dropdown";

const api = axios.create({
    baseURL: "http://localhost:3080",
});

const initialState = {
    venda: {id: '', cliente: '', veiculo: '', data: ''},
    listaVendas: [],
    listaCliente: [],
    listaVeiculos: []
}

export default class Vendas extends Component {
    state = {...initialState};

    componentDidMount() {
        this.obterListaVendas();
        this.obterListaClientes();
        this.obterListaVeiculos();
    }

    limparCampos() {
        this.setState({veiculo: initialState.veiculo});
    }

    salvar() {
        const venda = this.state.venda;
        console.log('venda ' + this.state.venda);
        if (venda.id) {
            this.editarVenda(venda)
        } else {
            this.gravarNovaVenda(venda);
        }
    }

    gravarNovaVenda(venda) {
        api.post('/gravar?rota=pedido', venda).then(response => {
            if (response.data) {
                console.log('gravou nova venda');
                this.limparCampos();
                this.obterListaVendas();
            } else {
                console.log('erro ao gravar venda')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    editarVenda(venda) {
        api.post('/editar?rota=pedido', venda).then(response => {
            if (response.data) {
                console.log('venda editada com sucesso');
                this.limparCampos();
                this.obterListaVendas();
            } else {
                console.log('erro ao editar venda')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    excluirVenda(venda) {
        api.post('/excluir?rota=pedido', venda).then(response => {
            if (response.data) {
                console.log('venda editada com sucesso');
                this.obterListaVendas();
            } else {
                console.log('erro ao editar venda')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    atualizarCampos(event) {
        const venda = {...this.state.venda};
        venda[event.target.name] = event.target.value;
        console.log(venda);
        this.setState({venda});
        console.log(this.state.venda);
    }

    obterListaVendas() {
        api.get('obter-lista?rota=pedido').then((response) => {
            this.setState({listaVendas: response.data});
        }).catch((err) => {
            console.log(err);
        });
    }

    obterListaClientes() {
        api.get('obter-lista?rota=cliente').then((response) => {
            this.setState({listaCliente: response.data});
        }).catch((err) => {
            console.log(err);
        });
    }

    obterListaVeiculos() {
        api.get('obter-lista?rota=veiculo').then((response) => {
            this.setState({listaVeiculos: response.data});
        }).catch((err) => {
            console.log(err);
        });
    }

    obterVendaExclusao(venda) {
        this.excluirVenda(venda);
    }

    carregarCamposEdicao(venda) {
        this.setState({venda})
    }

    renderForm() {
        return (
            <div className={'form'}>
                <div style={{display: "none"}}>
                    <input id={'idVenda'} type={'text'} name={'id'}
                           value={this.state.venda.id} onChange={e => this.atualizarCampos(e)} />
                </div>
                <div>
                    <label>Cliente</label> <br/>
                    <Dropdown name={'cliente'} optionLabel={'nome'} optionValue={'id'} value={this.state.venda.cliente} options={this.state.listaCliente}
                              onChange={(e) => this.atualizarCampos(e)} placeholder="Cliente"/>
                </div>
                <div>
                    <label>Veiculo</label> <br/>
                    <Dropdown name={'veiculo'} optionLabel={'modelo'} optionValue={'id'} value={this.state.venda.veiculo} options={this.state.listaVeiculos}
                              onChange={(e) => this.atualizarCampos(e)} placeholder="Veiculo"/>
                </div>
                <div>
                    <button className={'btn btn-primary'} onClick={e => this.salvar(e)}>
                        Salvar
                    </button>
                    <button className={'btn btn-secondary'} onClick={e => this.limparCampos(e)}>
                        Cancelar
                    </button>
                </div>
                <hr/>
            </div>
        )
    }

    renderListaVendas() {
        return (
            <table className={'table mt-4'}>
                <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Veiculo</th>
                    <th>Data</th>
                </tr>
                </thead>
                <tbody>
                {this.renderLinhasVendas()}
                </tbody>
            </table>
        )
    }

    renderLinhasVendas() {
        if (this.state.listaVendas.length === 0) {
            return <tr><td>Nenhuma venda realizada</td></tr>
        }
        return this.state.listaVendas.map(venda => {
            return (
                <tr key={venda.id}>
                    <td>{venda.cliente.nome}</td>
                    <td>{venda.veiculo.marca + ' - ' + venda.veiculo.modelo}</td>
                    <td><Moment format={'DD/MM/YYYY HH:mm'}>{venda.data}</Moment></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main>
                {this.renderForm()}
                {this.renderListaVendas()}
            </Main>
        )
    }

}