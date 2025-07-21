import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "./Store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import { initDB } from "./services/IndexDB/indexedDB.tsx";


// --- Wrap everything in an async IIFE
(async () => {
  try {
    await initDB(); // ✅ Ensure IndexedDB is initialized before anything else

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
  <HelmetProvider>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
  </HelmetProvider>
</React.StrictMode>,
    );

  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
})();
