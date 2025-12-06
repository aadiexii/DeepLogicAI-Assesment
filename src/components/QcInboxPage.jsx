import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQcDocuments } from '../context/QcDocumentsContext';
import './QcInboxPage.css';

export default function QcInboxPage() {
  const { documents } = useQcDocuments();
  const navigate = useNavigate();
  
  const [statusFilter, setStatusFilter] = useState('failed');
  const [tenantFilter, setTenantFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const uniqueTenants = useMemo(() => {
    const tenants = new Set(documents.map((doc) => doc.tenant_id));
    return Array.from(tenants).sort();
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (statusFilter !== 'all' && doc.status !== statusFilter) {
        return false;
      }

      if (tenantFilter !== 'all' && doc.tenant_id !== tenantFilter) {
        return false;
      }

      if (searchQuery && !doc.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [documents, statusFilter, tenantFilter, searchQuery]);

  const handleRowClick = (documentId) => {
    navigate(`/qc/documents/${documentId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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

  return (
    <div className="qc-inbox-page">
      <div className="filters-bar">
        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="failed">Failed</option>
            <option value="needs_review">Needs Review</option>
            <option value="resolved">Resolved</option>
            <option value="clean">Clean</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="tenant-filter">Tenant:</label>
          <select
            id="tenant-filter"
            value={tenantFilter}
            onChange={(e) => setTenantFilter(e.target.value)}
          >
            <option value="all">All tenants</option>
            {uniqueTenants.map((tenant) => (
              <option key={tenant} value={tenant}>
                {tenant}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="search-input">Search:</label>
          <input
            id="search-input"
            type="text"
            placeholder="Document ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="empty-state">
          <p>No documents match the current filters.</p>
        </div>
      ) : (
        <div className="documents-table-container">
          <table className="documents-table">
            <thead>
              <tr>
                <th>Document ID</th>
                <th>Tenant</th>
                <th>Type</th>
                <th>Status</th>
                <th>Error Summary</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  onClick={() => handleRowClick(doc.id)}
                  className="table-row-clickable"
                >
                  <td>{doc.id}</td>
                  <td>{doc.tenant_id}</td>
                  <td>{doc.type}</td>
                  <td>
                    <span className={getStatusBadgeClass(doc.status)}>
                      {getStatusLabel(doc.status)}
                    </span>
                  </td>
                  <td className="error-summary-cell">{doc.error_summary || '-'}</td>
                  <td>{formatDate(doc.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

