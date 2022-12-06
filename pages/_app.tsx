import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeContextProvider from "../contexts/useTheme";
import MusicPlayerContextProvider from "../contexts/useMusicPlayer";
import MusicPlayer from "../components/MusicPlayer";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import EtherContextProvider from "../contexts/useEther";
import AuthContextProvider from "../contexts/useAuth";
declare global {
  interface Window {
    ethereum: any;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <EtherContextProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <MusicPlayerContextProvider>
                <>
                  <Component {...pageProps} />
                  <MusicPlayer />
                </>
              </MusicPlayerContextProvider>
            </Hydrate>
          </QueryClientProvider>
        </EtherContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}
