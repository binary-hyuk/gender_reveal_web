import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PasswordGate } from "@/shared/ui/PasswordGate";
import { ThemeVars } from "@/shared/ui/ThemeVars";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeVars />
      <PasswordGate>
        <Component {...pageProps} />
      </PasswordGate>
    </>
  );
}
