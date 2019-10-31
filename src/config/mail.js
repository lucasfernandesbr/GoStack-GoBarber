// Informações coletadas do serviço de email. (Mailtrap)

export default {
  // Endereço
  host: process.env.MAIL_HOST,
  // Porta
  port: process.env.MAIL_PORT,
  // Se está sendo utilizado SSL
  secure: false,
  // Autenticação do usuário(Email, Senha)
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  // Configurações padrão para todo envio de email
  default: {
    // Remetente padrão para os envios de email
    from: 'Team GoBarber <noreply@gobaber.com>',
  },
};

/**
 * Existem vários serviços para envio de email como:
 * Amazon SES
 * Mailgun
 * Sparkpost
 * Para desenvolvermos, iremos configurar o Mailtrap, quando a aplicação estiver online deve ser utilizado um dos provedores acima.
 */
