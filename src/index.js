import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { basicLogger } from "launchdarkly-js-client-sdk";
import { createRandomUser } from "./UserContexts";
const clientSideID = process.env.REACT_APP_clientSideID;

(async () => {
  const LDProvider = await initLD({
    clientSideID,
    context: createRandomUser(true),
  });
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <LDProvider>
      <App />
    </LDProvider>
  );
})();

async function initLD({ clientSideID, context }) {
  return asyncWithLDProvider({
    clientSideID,
    options: {
      logger: basicLogger({
        destination: (line) => alert(line),
        level: "error",
      }),

      evaluationReasons: true,
      sendEvents: true,
      sendEventsOnlyForVariation: false,
      fetchGoals: true,
      diagnosticOptOut: false,
      application: {
        version: "1.0.0",
        id: "btan-react-demo",
      },
    },
    context,
    reactOptions: { sendEventsOnFlagRead: true, useCamelCaseFlagKeys: true },
  });
}
