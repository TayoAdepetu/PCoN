interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  permissions: Permission[];
  role: {
    name: string | null;
  };
}
