declare module "redux-persist/lib/storage" {
  //   import { WebStorage } from "redux-persist";
  import { WebStorage } from "redux-persist/es/types";
  // Replace `any` with the appropriate type if known
  const storage: WebStorage;
  export default storage;
}
