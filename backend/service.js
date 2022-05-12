const pg = require('pg');
const pool = new pg.Pool({user: 'postgres',host: 'localhost',database: 'projeto-opp',password: 'postgres',port: 5432});

module.exports = {
    buscarConexoes: async function (origem, visitados) {
        try {
            const client = await pool.connect();
            let result = await client.query("select * from path where path.origem like" + "'" + origem + "' and path.destino not in ('"+ visitados.join("','") +"')" );

            client.release();
            return path;
        } catch (err){
            console.log(err);
        }
    },

    obterListaClientes: async function () {
      console.log('deu boa');
      return 'deu boa';
    },

    retornarCaminho: async function (origem, destino) {
        return await this.calcularCaminho(origem, destino);
    },

    calcularCaminho: async function (origem, destino) {
        let distanciaTotal = 0;
        let conexoes;
        let final = '';
        let result = [];
        let pathTemp;
        let distTemp = Infinity;
        let visitados = [origem];
        conexoes = await this.buscarConexoes(origem, visitados);
        while (final != destino) {
            console.log('entrou while')
            pathTemp = conexoes[0];
            conexoes.forEach(p => {
                if (distTemp > (p.distanciaPath)) {
                    distTemp = p.distanciaPath;
                    pathTemp = p;
                }
            });
            distanciaTotal += distTemp;
            final = pathTemp.destinoPath;
            visitados.push(pathTemp.destinoPath);
            result.push(pathTemp);
            conexoes = await this.buscarConexoes(final, visitados);
        }
        console.log(`result:  ${result}`);
        console.log(`distancia total: ${distanciaTotal}`)
        return new Resultado(result,distanciaTotal);
        pool.end();
    },

}