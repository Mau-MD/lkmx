export type UserInput = {
  name: string;
  age: number;
  email: string;
};

export type UserOutput = {
  id: number;
  name: string;
  age: number;
  email: string;
};

export type UserAnalytics = {
  averageAge: number;
  totalUsers: number;
};
