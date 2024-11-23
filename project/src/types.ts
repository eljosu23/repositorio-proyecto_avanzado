export interface User {
  email: string;
  password: string;
  name: string;
}

export interface Destination {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  createdAt: number;
}