import { Sequelize, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // Hook responsável por dar o hash na senha antes de salvar no banco de dados.
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // Método que indica a relação com outro model
  // Nesse caso a relação do model User recebendo um id de arquivo dentro da tablea users.
  static associate(models) {
    // a cláusula 'as' é utilizada para dar um codenome ao relacionamento.
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  // Compara a senha passada no body com a senha que está salva no database.
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
