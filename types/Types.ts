export type AuthSignUpType = {
  email: string;
  userName: string;
  password: string;
};

export type AuthSignInType = {
  email: string;
  password: string;
};

// user or context type
export type UserType = {
  accountId: string;
  email: string;
  username: string;
  avatar: string;
};

export type GlobalContextType = {
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export type PostType = {
  title: string;
  thumbnail: string;
  video: string;
  prompt: string;
  $id: string;
  creator: string;
  avatar: string;
};
