import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "821376447515-9jd7tntvmi1sak22kbvjgi5qn6n3k7qt.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
