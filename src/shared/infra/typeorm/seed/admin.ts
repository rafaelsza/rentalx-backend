import { hash } from 'bcrypt';
import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO users
    (id, name, email, password, "isAdmin", driver_license, created_at) VALUES
    (uuid_generate_v4(), 'admin', 'admin@rentx.com.br', '${password}', true, '000000', now());`,
  );

  await connection.close();
}

// eslint-disable-next-line no-console
create().then(() => console.log('User admin created!'));
