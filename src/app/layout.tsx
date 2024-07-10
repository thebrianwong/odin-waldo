import type { Metadata } from "next";
import "../styles/styles.scss";
import { Suspense } from "react";
import LoadingPokeball from "../components/LoadingPokeball";
import { getFirebaseConfig } from "src/firebase-config";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const metadata: Metadata = {
  title: "Find That Pokemon!",
  description:
    "Web site originally created with Create React App then migrated to Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  if (typeof window !== "undefined") {
    getAnalytics(app);
  }

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
          <Suspense fallback={<LoadingPokeball />}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
