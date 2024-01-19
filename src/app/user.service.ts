import { InMemoryDbService } from 'angular-in-memory-web-api';

interface IAssociate {
  name: string;
  email: string;
  phone: string;
  age: string;
  isAssociated: boolean,
  id: 1
}

export class InMemAPIService implements InMemoryDbService {

  createDb() {
    let users = [
      { id: 1, email: 'admin@admin.com', password: '123456' },
    ];
    let associates: IAssociate[] = []

    return { users, associates };
  }
}