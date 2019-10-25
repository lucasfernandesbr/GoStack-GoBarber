import { Sequelize, Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        // 'url' campo virtual que indica para o frontend onde acessar para carregar a imagem.
        // Recebendo um método get que é indica como eu quero formatar esse atributo.
        // A função get retorna http://endereço_da_API/rota_para_acessar_um_arquivo/nome_do_arquivo
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default File;
