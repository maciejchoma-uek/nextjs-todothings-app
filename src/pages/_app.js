import "@/styles/globals.css";
import Modal from "react-modal";

Modal.setAppElement("#readerMain");
export default function App({ Component, pageProps }) {
  return (
    <div id="readerMain">
      <Component {...pageProps} />
    </div>
  );
}
