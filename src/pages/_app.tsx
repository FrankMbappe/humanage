import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import { Noto_Sans } from "next/font/google";
import "@/styles/globals.css";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: "400" });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <main className={notoSans.className}>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
