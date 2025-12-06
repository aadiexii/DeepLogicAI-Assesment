import { createContext, useContext, useState, useCallback } from 'react';
import { sampleDocuments as initialDocuments } from '../data/sampleDocuments';

const QcDocumentsContext = createContext(null);

export function QcDocumentsProvider({ children }) {
  const [documents, setDocuments] = useState([...initialDocuments]);

  const updateDocumentStatus = useCallback((id, newStatus) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => (doc.id === id ? { ...doc, status: newStatus } : doc))
    );
  });

  const updateDocument = useCallback((id, updates) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => (doc.id === id ? { ...doc, ...updates } : doc))
    );
  });

  const getDocumentById = useCallback((id) => {
    return documents.find((doc) => doc.id === id);
  }, [documents]);

  return (
    <QcDocumentsContext.Provider
      value={{
        documents,
        updateDocumentStatus,
        updateDocument,
        getDocumentById,
      }}
    >
      {children}
    </QcDocumentsContext.Provider>
  );
}

export function useQcDocuments() {
  const context = useContext(QcDocumentsContext);
  if (!context) {
    throw new Error('useQcDocuments must be used within QcDocumentsProvider');
  }
  return context;
}

