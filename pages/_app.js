import "../styles/globals.css";
// import StoreProvider from "../store/store-context";
import { IBM_Plex_Sans } from "next/font/google";

const ibms = IBM_Plex_Sans({ weight: "400", style: "normal", subsets: ["latin"] });
function MyApp({ Component, pageProps }) {
  return (
    <div className={ibms.className}>
      {/* <div> */}
      {/* <StoreProvider> */}
      <Component {...pageProps} />
      {/* </StoreProvider> */}
    </div>
  );
}

export default MyApp;
