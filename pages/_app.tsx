import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeContextProvider from "../contexts/useTheme";
import MusicPlayerContextProvider from "../contexts/useMusicPlayer";
import MusicPlayer from "../components/MusicPlayer";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import EtherContextProvider from "../contexts/useEther";
import AuthContextProvider from "../contexts/useAuth";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import config from "../config";
const { chains, provider, webSocketProvider } = configureChains([polygonMumbai], [publicProvider(), alchemyProvider({ apiKey: config.ALCHEMY_KEY })]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

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
        <WagmiConfig client={client}>
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
        </WagmiConfig>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}
