import { BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  );
}

export default App;
