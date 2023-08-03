export interface Projekt {
    id?: number;
    name: string;
    user?: {
      id: number;
      username: string;
      password: string;
    };
    description: string;
  }
  