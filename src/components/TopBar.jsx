import { useLocation } from 'react-router-dom';
import './TopBar.css';

export default function TopBar() {
  const location = useLocation();
  
  const getPageTitle = () => {
    if (location.pathname.startsWith('/qc/documents/')) {
      return 'Document Detail';
    }
    if (location.pathname === '/qc') {
      return 'QC Inbox';
    }
    return 'QC Workspace';
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">QC Workspace</div>
      <div className="top-bar-center">{getPageTitle()}</div>
      <div className="top-bar-right"></div>
    </div>
  );
}

