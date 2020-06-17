# Covid-19 MS

Aplicação desenvolvida com React.JS para mostrar algumas informações referente ao Covid-19 no estado do Mato Grosso do Sul.

todos os dados apresentados são obtidos do site [Brasil.io](https://brasil.io/dataset/covid19/caso_full/) e exportado para um banco de dados NoSQL (mongodb).

## Demo

[Covid-19 MS](https://covid19ms.herokuapp.com)

## Iniciando

```bash
npm install
npm debug
```

## Uso

DBClient.js
```react
const client = Stitch.initializeDefaultAppClient('<nome do app no mongodb-atlas>');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('<nome do seu banco>');
```
