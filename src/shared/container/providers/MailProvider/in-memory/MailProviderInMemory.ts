import IMailProvider from '../IMailProvider';

interface IMessageInMemory {
  to: string;
  subject: string;
  variables: {
    [key: string]: string;
  };
  path: string;
}

class MailProviderInMemory implements IMailProvider {
  private message: IMessageInMemory[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: {
      [key: string]: string;
    },
    path: string,
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export default MailProviderInMemory;
