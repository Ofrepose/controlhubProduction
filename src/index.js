import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";

const basename = process.env.REACT_APP_DEVELOPMENT === 'true' ? "/" : "/controlhubProduction";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter basename={basename} >
    <App />
  </BrowserRouter>
);
