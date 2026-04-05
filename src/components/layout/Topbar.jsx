import React from 'react';
import { Search, Bell, RefreshCw, Calendar, ChevronDown } from 'lucide-react';

const pageTitles = {
  dashboard: { title: 'Procurement Dashboard', sub: 'Lithium-Ion Battery Supply Chain — Q1 FY2025' },
  reports: { title: 'AI Report Generator', sub: 'Generate, schedule, and analyze procurement reports' },
  rca: { title: 'Root Cause Analysis', sub: 'Drill down into KPI anomalies and identify root drivers' },
  nlp: { title: 'NLP Intelligence Bot', sub: 'Ask anything about procurement data — past or future' },
};

export default function Topbar({ page }) {
  const info = pageTitles[page] || pageTitles.dashboard;
  return (
    <header className="topbar">
      <div style={{ flex: 1 }}>
        <h1 style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          {info.title}
        </h1>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{info.sub}</p>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '7px 12px', width: 220
      }}>
        <Search size={14} color="var(--text-muted)" />
        <input
          placeholder="Search KPIs, vendors, POs…"
          style={{ border: 'none', background: 'transparent', fontSize: 13, color: 'var(--text-primary)', outline: 'none', width: '100%', fontFamily: 'var(--font-main)' }}
        />
      </div>

      {/* Period selector */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        border: '1px solid var(--border)', borderRadius: 8,
        padding: '7px 12px', fontSize: 13, cursor: 'pointer',
        color: 'var(--text-secondary)', fontWeight: 500,
        background: 'var(--surface)'
      }}>
        <Calendar size={14} />
        <span>Apr 2024 – Mar 2025</span>
        <ChevronDown size={13} />
      </div>

      {/* Sync */}
      <button className="btn btn-ghost btn-sm" style={{ gap: 5 }}>
        <RefreshCw size={13} />
        <span>Sync SAP</span>
      </button>

      {/* Alerts */}
      <button style={{
        position: 'relative', background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '7px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center'
      }}>
        <Bell size={16} color="var(--text-secondary)" />
        <span style={{
          position: 'absolute', top: 4, right: 4,
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--danger)', border: '1.5px solid #fff'
        }} />
      </button>
    </header>
  );
}
