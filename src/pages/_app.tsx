import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Caudex } from "next/font/google";

const caudex = Caudex({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={caudex.className}>
      <Component {...pageProps} />
    </main>
  );
}
