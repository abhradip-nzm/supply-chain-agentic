import React, { useState } from 'react';
import './index.css';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Dashboard from './components/dashboard/Dashboard';
import Reports from './components/reports/Reports';
import RCA from './components/rca/RCA';
import NLPBot from './components/nlpbot/NLPBot';

export default function App() {
  const [page, setPage] = useState('dashboard');

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard />;
      case 'reports': return <Reports />;
      case 'rca': return <RCA />;
      case 'nlp': return <NLPBot />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar active={page} onNav={setPage} />
      <div className="main-content">
        <Topbar page={page} />
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
