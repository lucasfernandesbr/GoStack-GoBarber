// Toda configuração da parte de upload de arquivos
import multer from 'multer';
import crypto from 'crypto'; // 'crypto' é uma bibliotéca do node utilizada para gerar caractéres alatórios.
import { extname, resolve } from 'path';

export default {
  /* 'storage' define como o multer irá guardar nossos arquivos podendo-se utilizar tanto um CDN(Content Delivery Network),
  ou no próprio disk storage. */
  storage: multer.diskStorage({
    // 'destination' indica o destino dos arquivos
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // 'filename' indica o nome dos arquivos
    // Recebe uma função com 3 parâmetros req, file e um callback(cb)
    filename: (req, file, cb) => {
      /* Para que não haja o risco de dois usuários darem upload em um arquivo com o mesmo nome, é gerado um nome randômico
      de 16 bytes */
      crypto.randomBytes(16, (err, res) => {
        // Retorna um erro caso tenha ocorrido um.
        if (err) return cb(err);

        // Se não houver acontecido erro, o cb retorna primeiro valor null, pois equivale ao erro que não aconteceu.
        // O segundo parâmetro é o nome da imagem em si, que é o res do randomBytes em uma string hexadecimal.
        // E o ultimo, é a extensão do arquivo enviado, unindo ao nome hexadecimal gerado anteriormente.
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
