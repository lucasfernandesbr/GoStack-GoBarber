import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    // Uma vez que um provider tambem é um user é necessário informar via cláusula where que deseja retornar apenas providers.
    const providers = await User.findAll({
      where: { provider: true },
      // Para que a pesquisa não retorne dados desnecessários, é indicado os dados que devem ser retornados via 'attributes'.
      attributes: ['id', 'name', 'email'],
      // Ao invés de retornar apenas o avatar_id, é possível incluir os dados de File tambem utilizando 'include'(join).
      // Informando o model a incluir, o codenome da relação e os dados que devem ser retornados via 'attributes'.
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
