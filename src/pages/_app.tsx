import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { type AppProps } from "next/app";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { type ReactElement, type ReactNode } from "react";
import { Noto_Sans } from "next/font/google";
import "@/styles/globals.css";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: "400" });

// This whole thing is to setup layouts with Next.js
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <main className={notoSans.className}>
          {getLayout(<Component {...pageProps} />)}
        </main>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
