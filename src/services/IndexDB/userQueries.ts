import { initDB } from "./indexedDB";

// Type definitions
interface User {
  id?: number;
  [key: string]: unknown;
}

export interface Snippet {
  uuid?: string;
  title?: string;
  sub_title?: string;
  description?: string;
  short_description?: string;
  link?: string;
  snippet_category_id?: string;
  snippet_category_uuid?: string;
  _order?: number;
  [key: string]: unknown;
}

export interface PendingOperation {
  uuid?: string;
  timestamp?: number;
  [key: string]: unknown;
}

const generateId = () => String(Date.now() + Math.floor(Math.random() * 1000));

export const saveUser = async (userData: User) => {
  if (!userData.id) {
    userData.id = Number(generateId());
  }

  const db = await initDB();
  await db.put("user", userData);
};

export const getUser = async () => {
  const db = await initDB();
  const allUsers = await db.getAll("user");
  return allUsers[0]; // still okay
};

export const clearUser = async () => {
  const db = await initDB();
  await db.clear("user");
};
