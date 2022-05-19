import React, {Component} from "react";
import Main from "../template/Main";
import axios from "axios";
import '../../styles/form-styles.css'

const api = axios.create({
    baseURL: "http://localhost:3080",
});

const initialState = {
    cliente: {id: '', nome: '', email: ''},
    list: []
}

export default class Cliente extends Component {

    state = {...initialState};

    componentDidMount() {
        this.obterListaClientes()
    }

    limparCampos() {
        this.setState({cliente: initialState.cliente});
    }

    salvar() {
        const cliente = this.state.cliente;
        console.log('cliente ' + this.state.cliente);
        if (cliente.id) {
            this.editarCliente()
        } else {
            this.gravarNovoCliente();
        }
    }

    gravarNovoCliente(cliente) {
        api.post('/gravar-novo-cliente', cliente).then(response => {
                if (response.data === true) {
                    console.log('gravou novo usuario');
                } else {
                    console.log('erro ao gravar usuario')
                }
                this.limparCampos();
                this.obterListaClientes();
            }).catch(err => {
            console.log(err);
        })
    }

    editarCliente(cliente) {
        api.put('/editar-cliente',cliente).then(response => {
                console.log('cliente editado com sucesso');
                this.limparCampos();
                this.obterListaClientes();
            }).catch(err => {
            console.log(err);
        })
    }

    atualizarCampos(event) {
        const cliente = {...this.state.cliente};
        cliente[event.target.name] = event.target.value;
        this.setState({cliente});//TODO
    }

    obterListaClientes() {
        api.get('obter-lista-clientes').then((response) => {
            this.setState({list: response.data});
        }).catch((err) => {
            console.log(err);
        });
    }

    excluirCliente() {
        //TODO
    }

    carregarCamposEdicao() {
        //TODO
    }

    renderForm() {
        return (
            <div className={'form'}>
                <div style={{display: "none"}}>
                    <input id={'idCliente'} type={'text'} name={'id'}
                           value={this.state.cliente.id} onChange={e => this.atualizarCampos(e)} />
                </div>
                <div>
                    <label>Nome</label>
                    <input id={'nomeCliente'} type={'text'} name={'nome'}
                           value={this.state.cliente.name} onChange={e => this.atualizarCampos(e)}
                           placeholder={'Digite o nome'} className={'form-control'} />
                </div>
                <div>
                    <label>Email</label>
                    <input id={'emailCliente'} type={'text'} name={'email'}
                        value={this.state.cliente.email} onChange={e => this.atualizarCampos(e)}
                        placeholder={'Digite o email'} className={'form-control'} />
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

    renderListaClientes() {
        return (
            <table className={'table mt-4'}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderLinhasClientes()}
                </tbody>
            </table>
        )
    }

    renderLinhasClientes() {
        return this.state.list.map(cliente => {
            return (
                <tr key={cliente.id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>
                        <button className={'btn btn-warning'} onClick={e => this.carregarCamposEdicao(e)}>
                            <i className={'fa fa-pencil'}></i>
                        </button>
                        <button className={'btn btn-danger'} onClick={e => this.excluirCliente(e)}>
                            <i className={'fa fa-trash'}></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main>
                {this.renderForm()}
                {this.renderListaClientes()}
            </Main>
        )
    }

}