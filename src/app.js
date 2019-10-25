//  CONFIGURAÇÕES DO SERVIDOR

import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());

    // 'express.static()' é um recurso que server para servir arquivos estáticos(img, css, html), arquivos que podem ser acessados via navegador.
    // É passado a rota na qual acessamos esses recursos e no express.static o local onde os arquivos se encontram.
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
