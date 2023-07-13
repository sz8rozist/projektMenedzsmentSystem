export interface Response {
  statusCode: number;
  message: string;
  loggedUser: {
    id: number;
    username: string;
    password: string;
  };
  jwtToken: string;
}
