import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";
import "./index.css";

const Fallback = ({ error }: { error: Error }) => (
  <div role="alert" style={{ padding: 20 }}>
    <h1>Something went wrong:</h1>
    <pre style={{ color: "red" }}>{error.message}</pre>
    <pre>{error.stack}</pre>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={Fallback}>
    <App />
  </ErrorBoundary>
);
