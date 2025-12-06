import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQcDocuments } from '../context/QcDocumentsContext';
import './DocumentDetailPage.css';

export default function DocumentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDocumentById, updateDocumentStatus } = useQcDocuments();
  
  const [document, setDocument] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const doc = getDocumentById(id);
    setDocument(doc);
  }, [id, getDocumentById]);

  const handleRetry = () => {
    if (document.status === 'failed' || document.status === 'needs_review') {
      setIsRetrying(true);
      updateDocumentStatus(id, 'needs_review');
      setToastMessage('Retry triggered (mocked)');
      setTimeout(() => {
        setIsRetrying(false);
        setToastMessage('');
      }, 2000);
    }
  };

  const handleMarkResolved = () => {
    updateDocumentStatus(id, 'resolved');
    setToastMessage('Document marked as resolved');
    setTimeout(() => {
      setToastMessage('');
    }, 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      failed: 'status-badge failed',
      needs_review: 'status-badge needs-review',
      resolved: 'status-badge resolved',
      clean: 'status-badge clean',
    };
    return statusMap[status] || 'status-badge';
  };

  const getStatusLabel = (status) => {
    const labelMap = {
      failed: 'Failed',
      needs_review: 'Needs Review',
      resolved: 'Resolved',
      clean: 'Clean',
    };
    return labelMap[status] || status;
  };

  if (!document) {
    return (
      <div className="document-detail-page">
        <div className="not-found">
          <p>Document not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="document-detail-page">
      <button className="back-button" onClick={() => navigate('/qc')}>
        ← Back to QC Inbox
      </button>

      {toastMessage && (
        <div className="toast-message">{toastMessage}</div>
      )}

      <div className="detail-layout">
        <div className="detail-left">
          <div className="detail-section">
            <h2>Document Information</h2>
            <div className="info-row">
              <span className="info-label">Document ID:</span>
              <span className="info-value">{document.id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Tenant:</span>
              <span className="info-value">{document.tenant_id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Type:</span>
              <span className="info-value">{document.type}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status:</span>
              <span className={getStatusBadgeClass(document.status)}>
                {getStatusLabel(document.status)}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Created At:</span>
              <span className="info-value">{formatDate(document.created_at)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Pipeline ID:</span>
              <span className="info-value">{document.pipeline_id}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Document Preview</h3>
            <div className="document-preview">
              <p>Document preview placeholder</p>
            </div>
          </div>
        </div>

        <div className="detail-right">
          <div className="qc-panel">
            <div className="panel-section">
              <h3>Error Details</h3>
              <div className="error-summary-box">
                {document.error_summary || 'No errors'}
              </div>
              <div className="error-types">
                {document.error_types.length > 0 ? (
                  document.error_types.map((type, index) => (
                    <span key={index} className="error-type-chip">
                      {type}
                    </span>
                  ))
                ) : (
                  <span className="no-errors">No error types</span>
                )}
              </div>
            </div>

            <div className="panel-section">
              <h3>Actions</h3>
              <div className="action-buttons">
                <button
                  className="action-btn retry-btn"
                  onClick={handleRetry}
                  disabled={isRetrying || document.status === 'resolved' || document.status === 'clean'}
                >
                  {isRetrying ? 'Retrying...' : 'Retry'}
                </button>
                <button
                  className="action-btn resolve-btn"
                  onClick={handleMarkResolved}
                  disabled={document.status === 'resolved'}
                >
                  Mark resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

