import './styles.css';
import ReactGA from 'react-ga';
const TRACKING_ID = "UA-XXXXX-X"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);



function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
export default App;
