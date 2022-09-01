import { BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import { RecentlyVisitedContactsProvider } from "./context/recent-contacts-context";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RecentlyVisitedContactsProvider>
        <Homepage />
      </RecentlyVisitedContactsProvider>
    </BrowserRouter>
  );
}

export default App;
