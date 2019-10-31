import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      // Existem algumas estratégias de email que não possuem autenticação, nessa caso se não houver um user, será passado o valor null.
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    // O compile do nodemailer é como ele formata a mensagem do email, o handlebars aje encima do compile, a forma como ele mostra os templates.
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  /* Foi criado um novo método pois existem configurações que são padrão.
     Então serão coletados todos os dados que são padrão e somar com os dados que são recebidos do controller.
  */
  sendMail(message) {
    return this.transporter.sendMail({
      // Coletar tudo dentro do atributo 'default' em 'config/mail'.
      ...mailConfig.default,
      // Coletar tudo dentro de message.
      ...message,
    });
  }
}

export default new Mail();
