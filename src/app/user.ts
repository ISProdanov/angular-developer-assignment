export class User {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
