import { container } from 'tsyringe';

import IDateProvider from './DateProvider/IDateProvider';
import DayJSDateProvider from './DateProvider/implementations/DayJSDateProvider';

import IMailProvider from './MailProvider/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

import IStorageProvider from './StorageProvider/IStorageProvider';
import LocalStorageProvider from './StorageProvider/implementations/LocalStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';

const storageProvider = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerSingleton<IDateProvider>('DateProvider', DayJSDateProvider);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageProvider[process.env.STORAGE_PROVIDER],
);
