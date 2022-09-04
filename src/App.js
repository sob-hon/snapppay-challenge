import Homepage from 'pages/Homepage/Homepage';
import { ContactPage } from 'pages/ContactPage/ContactPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RecentlyVisitedContactsProvider } from 'context/recentContactsContext';
import './App.css';

function App() {
  return (
    <RecentlyVisitedContactsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/passenger" element={<Homepage />} />
          <Route
            exact
            path="/passenger/:passenger_id"
            element={<ContactPage />}
          />
          <Route path="/" element={<Navigate to="/passenger" replace />} />
        </Routes>
      </BrowserRouter>
    </RecentlyVisitedContactsProvider>
  );
}

export default App;
