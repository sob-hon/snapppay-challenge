import Homepage from "./pages/Homepage/Homepage";
import { ContactPage } from "./pages/ContactPage/ContactPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecentlyVisitedContactsProvider } from "./context/recentContactsContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RecentlyVisitedContactsProvider>
        <Routes>
          <Route path="/passenger" element={<Homepage />} />
          <Route exact path="/passenger/:passenger_id" element={<ContactPage />} />
        </Routes>
      </RecentlyVisitedContactsProvider>
    </BrowserRouter>
  );
}

export default App;
