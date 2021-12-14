import React from 'react';
import ReactDOM from 'react-dom';
import {createServer, Model, Server} from 'miragejs'
import {App} from './App';


createServer({
  models:{
    transaction: Model,
  },
  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'qualquer coisa',
          type: 'deposit',
          category: 'random',
          amount: 6000,
          createdAt: new Date('2021-12-10 21:34:00')
        }
      ]
    })

  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions', ()=>{
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request)=>{
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

