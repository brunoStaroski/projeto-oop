import React, {Component} from "react";
import Main from "../template/Main";
import axios from "axios";
import '../../styles/styles.css'

const api = axios.create({
    baseURL: "http://localhost:3080",
});

const initialState = {
    veiculo: {id: '', marca: '', modelo: '', valor: 0, quantidade: 0},
    listaVeiculos: []
}

export default class Veiculos extends Component {
    state = {...initialState};

    componentDidMount() {
        this.obterListaVeiculos();
    }

    limparCampos() {
        this.setState({veiculo: initialState.veiculo});
    }

    salvar() {
        const veiculo = this.state.veiculo;
        console.log('veiculo ' + this.state.veiculo);
        if (veiculo.id) {
            this.editarVeiculo(veiculo)
        } else {
            this.gravarNovoVeiculo(veiculo);
        }
    }

    gravarNovoVeiculo(veiculo) {
        api.post('/gravar?rota=veiculo', veiculo).then(response => {
            if (response.data) {
                console.log('gravou novo veiculo');
                this.limparCampos();
                this.obterListaVeiculos();
            } else {
                console.log('erro ao gravar veiculo')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    editarVeiculo(veiculo) {
        api.post('/editar?rota=veiculo', veiculo).then(response => {
            if (response.data) {
                console.log('veiculo editado com sucesso');
                this.limparCampos();
                this.obterListaVeiculos();
            } else {
                console.log('erro ao editar veiculo')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    excluirCliente(veiculo) {
        api.post('/excluir?rota=veiculo', veiculo).then(response => {
            if (response.data) {
                console.log('veiculo editado com sucesso');
                this.obterListaVeiculos();
            } else {
                console.log('erro ao editar veiculo')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    atualizarCampos(event) {
        const veiculo = {...this.state.veiculo};
        veiculo[event.target.name] = event.target.value;
        this.setState({veiculo});
    }

    obterListaVeiculos() {
        api.get('obter-lista?rota=veiculo').then((response) => {
            this.setState({listaVeiculos: response.data});
        }).catch((err) => {
            console.log(err);
        });
    }

    obterVeiculoExclusao(veiculo) {
        this.excluirCliente(veiculo);
    }

    carregarCamposEdicao(veiculo) {
        console.log(veiculo)
        this.setState({veiculo})
    }

    renderForm() {
        return (
            <div className={'form'}>
                <div style={{display: "none"}}>
                    <input id={'idCliente'} type={'text'} name={'id'}
                           value={this.state.veiculo.id} onChange={e => this.atualizarCampos(e)} />
                </div>
                <div>
                    <label>Marca</label>
                    <input id={'marcaVeiculo'} type={'text'} name={'marca'}
                           value={this.state.veiculo.marca} onChange={e => this.atualizarCampos(e)}
                           placeholder={'Digite a marca'} className={'form-control'} />
                </div>
                <div>
                    <label>Modelo</label>
                    <input id={'modeloVeiculo'} type={'text'} name={'modelo'}
                           value={this.state.veiculo.modelo} onChange={e => this.atualizarCampos(e)}
                           placeholder={'Digite o modelo'} className={'form-control'} />
                </div>
                <div>
                    <label>Preço</label>
                    <input id={'precoVeiculo'} type={'text'} name={'valor'}
                           value={this.state.veiculo.valor} onChange={e => this.atualizarCampos(e)}
                           placeholder={'Digite o preço'} className={'form-control'} />
                </div>
                <div>
                    <label>Estoque</label>
                    <input id={'quantidadeVeiculo'} type={'text'} name={'quantidade'}
                           value={this.state.veiculo.quantidade} onChange={e => this.atualizarCampos(e)}
                           placeholder={'Digite a quantidade em estoque'} className={'form-control'} />
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
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Preço</th>
                    <th>Estoque</th>
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
        if (this.state.listaVeiculos.length === 0) {
            return <p>Nenhum veiculo cadastrado</p>
        }
        return this.state.listaVeiculos.map(veiculo => {
            return (
                <tr key={veiculo.id}>
                    <td>{veiculo.marca}</td>
                    <td>{veiculo.modelo}</td>
                    <td>{veiculo.valor}</td>
                    <td>{veiculo.quantidade}</td>
                    <td>
                        <button className={'btn btn-warning'} onClick={e => this.carregarCamposEdicao(veiculo)}>
                            <i className={'fa fa-pencil'}></i>
                        </button>
                        <button className={'btn btn-danger'} onClick={e => this.obterVeiculoExclusao(veiculo)}>
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