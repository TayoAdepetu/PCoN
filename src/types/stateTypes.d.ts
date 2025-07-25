interface User {
  id: number;
  public_reference_id: string;
  name: string;
  email: string;
  avatar: string | null;
  permissions: Permission[];
  role: {
    name: string | null;
  };
}

interface Notification{
  id: number;
  public_reference_id: string;
  message: string;
  created_at: string;
  read: boolean;
  title: string;
}