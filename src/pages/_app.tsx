import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { type AppProps } from "next/app";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { useMemo } from "react";
import { Noto_Sans } from "next/font/google";
import "@/styles/globals.css";
import HomeLayout from "@/components/layout/HomeLayout";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: "400" });

// This whole thing is to setup layouts with Next.js
export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  hasNoLayout?: boolean;
};

type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
  Component: NextPageWithLayout;
};
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const hasNoLayout = useMemo(
    () => !!Component.hasNoLayout,
    [Component.hasNoLayout]
  );

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <main className={notoSans.className}>
          {hasNoLayout ? (
            <Component {...pageProps} />
          ) : (
            <HomeLayout>
              <Component {...pageProps} />
            </HomeLayout>
          )}
        </main>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
