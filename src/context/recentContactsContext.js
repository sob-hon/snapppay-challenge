import React, { createContext, useContext, useState } from 'react';
import { getItem } from 'utils/localStorage';

const RecentlyVisitedContactsContext = createContext();

function RecentlyVisitedContactsProvider({ children }) {
  const defaultRecentContacts = JSON.parse(getItem('recentlyVisitedContacts'));
  const [recentlyVisitedContacts, setRecentlyVisitedContacts] = useState(
    defaultRecentContacts ? defaultRecentContacts : [],
  );

  const value = {
    recentlyVisitedContacts,
    setRecentlyVisitedContacts,
  };

  return (
    <RecentlyVisitedContactsContext.Provider value={value}>
      {children}
    </RecentlyVisitedContactsContext.Provider>
  );
}

function useRecentlyVisitedContacts() {
  const context = useContext(RecentlyVisitedContactsContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { RecentlyVisitedContactsProvider, useRecentlyVisitedContacts };
