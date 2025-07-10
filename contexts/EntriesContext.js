import { createContext, useContext, useState } from 'react';

const EntriesContext = createContext();

export const useEntries = () => {
    const context = useContext(EntriesContext);
    if (!context) {
        throw new Error ('useEntries must be used within an EntriesProvider');
    }
    return context;
};

export const EntriesProvider = ({ children }) => {
    const [guestEntries, setGuestEntries] = useState([]);

    const addGuestEntry = (entryData) => {
        const newEntry = {
            id: Date.now(),
            ...entryData,
            created_at: new Date().toISOString(),
            isLocal: true,
            isGuest: true
        };
        setGuestEntries(prev => [newEntry, ...prev]);
        return newEntry;
    };

    const clearGuestEntries = () => {
        setGuestEntries([]);
    };

    const updateGuestEntry = (id, updatedData) => {
        setGuestEntries(prev =>
            prev.map(entry =>
                entry.id === id ? {...entry, ...updatedData} : entry
            )
        );
    };

    const deleteGuestEntry = (id) => {
    setGuestEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <EntriesContext.Provider value={{
        guestEntries,
      addGuestEntry,
      clearGuestEntries,
      updateGuestEntry,
      deleteGuestEntry
    }}>
        {children}
    </EntriesContext.Provider>
  );
};