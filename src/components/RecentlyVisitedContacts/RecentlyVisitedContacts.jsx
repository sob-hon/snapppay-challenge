import { useRecentlyVisitedContacts } from 'context/recentContactsContext';
import Contact from 'components/Contact/Contact';
import React from 'react';
import styles from './RecentlyVisitedContacts.module.css';
import RenderIf from 'components/RenderIf/RenderIf';

const RecentlyVisitedContacts = () => {
  const recentContactsContext = useRecentlyVisitedContacts();
  return (
    <>
      <RenderIf
        isTrue={recentContactsContext.recentlyVisitedContacts?.length !== 0}
      >
        <h2 className={styles.recentlyVisitedHeader}>
          Recently Visited Contacts
        </h2>
        <div className={styles.recentlyVisitedWrapper}>
          {recentContactsContext?.recentlyVisitedContacts?.map(
            recentContact => (
              <Contact key={recentContact.id} contact={recentContact} />
            ),
          )}
        </div>
      </RenderIf>
    </>
  );
};

export default RecentlyVisitedContacts;
