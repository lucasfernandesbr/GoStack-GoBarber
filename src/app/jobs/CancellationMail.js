import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'cancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    console.log('A fila executou');
    // Após o agendamento ser cancelado, é enviado um email para indicar que o cancelamento foi realizado.
    await Mail.sendMail({
      // Remetente
      to: `${appointment.provider.name} <${appointment.provider.email}`,
      // Assunto
      subject: 'Agendamento cancelado',
      // Corpo do email
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', ás' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
