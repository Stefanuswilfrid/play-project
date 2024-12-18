import { BASE_URL } from "@/constant";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lexend_Deca } from "next/font/google";
import { SWRConfig } from "swr";

const font = Lexend_Deca({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (suffix) => {
          const response = await fetch(`${BASE_URL}/api/${suffix}`);
          const data = await response.json();
          return data;
        },
      }}
    >
      <style jsx global>{`
        :root {
          --font-sans: ${font.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
