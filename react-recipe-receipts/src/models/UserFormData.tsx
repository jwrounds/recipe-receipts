class UserFormData {
  [index: string]: string | undefined;
  username: string;
  password: string;
  email!: string;

  constructor(username = '', password = '') {
    this.username = username;
    this.password = password;
  }
}

export {
  UserFormData
}