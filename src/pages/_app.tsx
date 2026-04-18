import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PasswordGate } from "@/shared/ui/PasswordGate";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PasswordGate>
      <Component {...pageProps} />
    </PasswordGate>
  );
}
