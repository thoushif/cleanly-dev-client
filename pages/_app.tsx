import type { AppProps } from "next/app";
import { AuthProvider } from "../auth";
import Layout from "../components/layout/layout";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
export default MyApp;
