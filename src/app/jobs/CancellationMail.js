import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const {
      appointment: {
        provider: { name: nameProvider, email },
        user: { name: nameUser },
        date,
      },
    } = data;

    await Mail.sendMail({
      to: `${nameProvider} <${email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: nameProvider,
        user: nameUser,
        date: format(parseISO(date), "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancellationMail();
