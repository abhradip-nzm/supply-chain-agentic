import React from 'react';
import {
  LayoutDashboard, FileBarChart2, GitBranch, MessageSquareText,
  Zap, Bell, Settings, ChevronRight, Activity, Package
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Procurement Dashboard', icon: LayoutDashboard },
  { id: 'reports', label: 'AI Report Generator', icon: FileBarChart2 },
  { id: 'rca', label: 'Root Cause Analysis', icon: GitBranch },
  { id: 'nlp', label: 'NLP Intelligence Bot', icon: MessageSquareText },
];

export default function Sidebar({ active, onNav }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #2ca6ff, #0072e5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <Zap size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              ProcureIQ
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.04em' }}>
              AI PROCUREMENT INTELLIGENCE
            </div>
          </div>
        </div>
      </div>

      {/* Context badge */}
      <div style={{ margin: '12px 12px 4px', padding: '10px 12px', background: 'var(--primary-light)', borderRadius: 8, border: '1px solid #bde0ff' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
          Connected to
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="status-dot green" />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)' }}>SAP HANA — Production</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Last sync: 3 min ago</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, paddingTop: 8 }}>
        <div style={{ padding: '4px 20px 6px', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-jp)' }}>
          Modules
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => onNav(item.id)}
            >
              <Icon size={16} className="nav-icon" />
              <span style={{ flex: 1 }}>{item.label}</span>
              {active === item.id && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 12px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, marginBottom: 4 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #2ca6ff20, #2ca6ff40)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #bde0ff', flexShrink: 0
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>PM</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Priya Menon</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Procurement Manager</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
            <Bell size={13} /> Alerts
          </button>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
            <Settings size={13} /> Config
          </button>
        </div>
      </div>
    </aside>
  );
}
