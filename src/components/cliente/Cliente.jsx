import React, {Component} from "react";
import Main from "../template/Main";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3080/",
});

export default class Cliente extends Component {

    constructor(props) {
        super(props);

    }

    obterListaClientes() {
        let retorno = '';
        api.get(this.url).then((response) => {
            console.log(response);
            retorno = response.data;
        }).catch((err) => {
            console.log(err);
        });
        console.log(retorno);
        return retorno;
    }

    render() {
        return (
            <Main>
                Cliente
            </Main>
        )
    }

}