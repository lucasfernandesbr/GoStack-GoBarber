import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
  }

  // Conexão com o banco de dados via as configs passadas no arquivo database.
  init() {
    this.connection = new Sequelize(databaseConfig);

    // Mapeamento de models
    models
      .map(model => model.init(this.connection))
      // O segundo map executa para mapear caso existam associações entre models
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
