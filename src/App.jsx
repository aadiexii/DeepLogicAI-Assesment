import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QcDocumentsProvider } from './context/QcDocumentsContext';
import TopBar from './components/TopBar';
import QcInboxPage from './components/QcInboxPage';
import DocumentDetailPage from './components/DocumentDetailPage';
import './App.css';

function App() {
  return (
    <QcDocumentsProvider>
      <BrowserRouter>
        <div className="app-container">
          <TopBar />
          <main className="main-content">
            <Routes>
              <Route path="/qc" element={<QcInboxPage />} />
              <Route path="/qc/documents/:id" element={<DocumentDetailPage />} />
              <Route path="/" element={<Navigate to="/qc" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QcDocumentsProvider>
  );
}

export default App;
