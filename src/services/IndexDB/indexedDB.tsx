import { openDB } from "idb";

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

export const initDB = async () => {
  return openDB("Ekiti-IHub APP", 35, {
    upgrade(db, newVersion) {
      console.log(newVersion);

      if (!db.objectStoreNames.contains("user")) {
        db.createObjectStore("user", { keyPath: "id", autoIncrement: false });
      }

    },
  });
};
