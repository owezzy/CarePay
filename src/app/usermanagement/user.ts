export interface UserInterface {
  userId: string;
  name: string;
  userStatus: boolean;
}

export class User implements UserInterface {
  constructor(
    public userId = '',
    public  name = '',
    public userStatus = false,
  ) {}

  static BuildUser(user: UserInterface) {
    return new User(
      user.userId,
      user.name,
      user.userStatus
    );
  }
}


export interface UsersInterface {
  items: UserInterface[];
  total: number;
}
