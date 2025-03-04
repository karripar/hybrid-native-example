import {
  MediaItemWithOwner,
  User,
  UserWithNoPassword,
} from 'hybrid-types/DBTypes';

export type Credentials = Pick<User, 'username' | 'password'>;
export type RegisterCredentials = Pick<User, 'username' | 'password' | 'email'>;

export type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};

export type NavigatorType = {
  // tab screen
  'All Media': undefined;
  'My Profile': undefined;
  Upload: undefined;

  // stack screen
  Tabs: undefined;
  Login: undefined;
  Single: {item: MediaItemWithOwner};
  'My Files': undefined;
  Modal: {item: MediaItemWithOwner};
}
