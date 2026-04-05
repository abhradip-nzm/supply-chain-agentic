import React, { useState } from 'react';
import {
  GitBranch, ChevronRight, ChevronDown, AlertTriangle,
  AlertCircle, Info, CheckCircle2, TrendingDown, Zap,
  Target, ArrowRight, BarChart2, ExternalLink
} from 'lucide-react';
import { rcaTree } from '../../data/mockData';

const severityConfig = {
  danger: { color: 'var(--danger)', bg: '#fef2f2', border: '#fecaca', icon: AlertCircle, label: 'Critical' },
  warning: { color: 'var(--warning)', bg: '#fffbeb', border: '#fde68a', icon: AlertTriangle, label: 'Warning' },
  info: { color: 'var(--info)', bg: '#f0fdfe', border: '#a5f3fc', icon: Info, label: 'Info' },
  success: { color: 'var(--success)', bg: '#f0fdf4', border: '#bbf7d0', icon: CheckCircle2, label: 'Normal' },
};

function TreeNode({ node, depth = 0, onSelect, selectedId }) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const cfg = severityConfig[node.severity] || severityConfig.info;
  const Icon = cfg.icon;
  const isSelected = selectedId === node.id;

  return (
    <div style={{ position: 'relative' }}>
      {/* Connector line */}
      {depth > 0 && (
        <div style={{
          position: 'absolute',
          left: -20, top: 0, bottom: 0,
          width: 1, background: 'var(--border)'
        }} />
      )}
      {depth > 0 && (
        <div style={{
          position: 'absolute', left: -20, top: 22,
          width: 18, height: 1, background: 'var(--border)'
        }} />
      )}

      <div
        style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          padding: '10px 14px', borderRadius: 10, marginBottom: 6,
          border: `1.5px solid ${isSelected ? cfg.color : cfg.border}`,
          background: isSelected ? cfg.bg : cfg.bg + '80',
          cursor: 'pointer',
          transition: 'all 0.15s',
          boxShadow: isSelected ? `0 0 0 2px ${cfg.color}30` : 'none',
        }}
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
          onSelect(node);
        }}
      >
        {/* Toggle */}
        {hasChildren ? (
          <div style={{
            width: 20, height: 20, borderRadius: 5, flexShrink: 0,
            background: cfg.color + '20', display: 'flex',
            alignItems: 'center', justifyContent: 'center', marginTop: 1
          }}>
            {expanded
              ? <ChevronDown size={12} color={cfg.color} />
              : <ChevronRight size={12} color={cfg.color} />
            }
          </div>
        ) : (
          <div style={{ width: 20, height: 20, flexShrink: 0 }} />
        )}

        {/* Icon */}
        <div style={{
          width: 28, height: 28, borderRadius: 7, flexShrink: 0,
          background: cfg.color + '18', border: `1px solid ${cfg.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon size={14} color={cfg.color} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {node.label}
          </div>
          <div style={{ fontSize: 12, color: cfg.color, fontWeight: 500, marginTop: 2 }}>
            {node.metric}
          </div>
        </div>

        {/* Severity badge */}
        <span style={{
          fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
          background: cfg.color + '18', color: cfg.color,
          border: `1px solid ${cfg.color}30`, flexShrink: 0
        }}>
          {cfg.label}
        </span>
      </div>

      {/* Children */}
      {expanded && hasChildren && (
        <div style={{ marginLeft: 48, paddingLeft: 20, position: 'relative', borderLeft: '1px solid var(--border)' }}>
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DetailPanel({ node }) {
  if (!node) {
    return (
      <div style={{
        padding: 40, textAlign: 'center',
        color: 'var(--text-muted)', fontSize: 13
      }}>
        <GitBranch size={40} color="var(--border)" style={{ margin: '0 auto 16px' }} />
        <p style={{ fontWeight: 600, marginBottom: 4 }}>Select a node to drill down</p>
        <p>Click any item in the RCA tree to view detailed analysis, contributing factors, and recommended actions.</p>
      </div>
    );
  }
  const cfg = severityConfig[node.severity] || severityConfig.info;

  const recommendations = {
    'c1-1': ['Issue emergency PO to backup supplier (Umicore SA) for 30% of requirements', 'Expedite ShanShan Carbon audit and capacity review', 'Activate dual-sourcing strategy for silicon anode category'],
    'c1-2': ['Coordinate with customs broker for pre-clearance documentation', 'Apply for advance authorization under MOOWR scheme', 'Evaluate alternate shipping route via air freight for critical batches'],
    'c1-3': ['Issue PO amendment with corrected plant code immediately', 'Implement mandatory plant code validation in SAP before PO release', 'Conduct vendor training on delivery address protocols'],
    'c2-1': ['Replace Gate 3 scanner device firmware (v2.1.4 → v3.0.2)', 'Mandate reinforced bin tag packaging for international shipments', 'Implement backup manual entry workflow for scan failures'],
    'c2-2': ['Arrange temporary inspection support from quality team in Plant 2', 'Brief backup inspectors on lithium-ion material acceptance criteria'],
    'root': ['Activate multi-pronged corrective action plan across top 3 delay drivers', 'Escalate ShanShan Carbon to Supplier Review Board', 'Initiate expedite logistics for 4 critical shipments'],
  };
  const recs = recommendations[node.id] || ['Investigate root driver in detail', 'Engage cross-functional team for corrective action', 'Set KPI monitoring alert for next 30 days'];

  return (
    <div style={{ padding: 20 }}>
      <div style={{
        padding: '16px', borderRadius: 10,
        background: cfg.bg, border: `1px solid ${cfg.border}`,
        marginBottom: 20
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: cfg.color + '20', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <cfg.icon size={16} color={cfg.color} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{node.label}</div>
            <div style={{ fontSize: 12, color: cfg.color, fontWeight: 500, marginTop: 2 }}>{node.metric}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: cfg.color + '18', color: cfg.color }}>
            {cfg.label} Severity
          </span>
          {node.children?.length > 0 && (
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 4, background: 'var(--surface-2)', color: 'var(--text-secondary)' }}>
              {node.children.length} sub-causes identified
            </span>
          )}
        </div>
      </div>

      {/* Impact quantification */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Impact Analysis
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'OTD Impact', value: '−3.2pp', negative: true },
            { label: 'Cost Impact', value: '$124K', negative: true },
            { label: 'Affected POs', value: '8', negative: false },
            { label: 'Recovery ETA', value: '14 days', negative: false },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '10px 12px', borderRadius: 8,
              background: 'var(--surface-2)', border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: item.negative ? 'var(--danger)' : 'var(--text-primary)' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          AI Recommended Actions
        </div>
        {recs.map((r, i) => (
          <div key={i} style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            padding: '10px 12px', borderRadius: 8, marginBottom: 6,
            background: 'var(--surface-2)', border: '1px solid var(--border)'
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
              background: 'var(--primary)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, color: '#fff', marginTop: 1
            }}>
              {i + 1}
            </div>
            <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
        <Zap size={14} /> Create Action Plan in SAP
      </button>
    </div>
  );
}

const kpiOptions = [
  { label: 'On-Time Delivery Drop (−2.3pp)', metric: 'OTD: 83.6%', active: true },
  { label: 'Quality Rejection Spike', metric: 'Rate: 3.2%', active: false },
  { label: 'Procurement Cycle Delay', metric: 'Cycle: 20.4d', active: false },
  { label: 'Invoice Processing Backlog', metric: 'Pending: 18', active: false },
  { label: 'Spend Variance vs Budget', metric: '+8.1% over', active: false },
];

export default function RCA() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeKPI, setActiveKPI] = useState(0);

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{
        padding: '16px 20px', background: 'var(--surface)',
        borderRadius: 12, border: '1px solid var(--border)',
        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: 'linear-gradient(135deg, #ef444420, #ef444440)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <GitBranch size={20} color="var(--danger)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', fontFamily: 'var(--font-jp)' }}>
            Intelligent Root Cause Analysis
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            AI-powered causal tree generation from SAP data · Click nodes to drill down
          </div>
        </div>
        <span className="badge badge-danger">3 Critical Issues</span>
        <button className="btn btn-outline btn-sm"><Zap size={12} /> AI Analyze All</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 300px', gap: 20 }}>
        {/* KPI Selector */}
        <div className="card" style={{ height: 'fit-content' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>KPI Anomalies</div>
          </div>
          {kpiOptions.map((k, i) => (
            <div
              key={i}
              onClick={() => setActiveKPI(i)}
              style={{
                padding: '12px 16px', cursor: 'pointer',
                borderBottom: '1px solid var(--border-light)',
                background: activeKPI === i ? 'var(--primary-light)' : 'transparent',
                transition: 'background 0.15s'
              }}
            >
              <div style={{
                fontSize: 12.5, fontWeight: activeKPI === i ? 600 : 500,
                color: activeKPI === i ? 'var(--primary)' : 'var(--text-primary)',
                marginBottom: 3, lineHeight: 1.3
              }}>{k.label}</div>
              <div style={{ fontSize: 11, color: activeKPI === i ? 'var(--primary)' : 'var(--text-muted)' }}>{k.metric}</div>
              {activeKPI === i && (
                <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--primary)' }} />
                  <span style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 600 }}>ACTIVE ANALYSIS</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tree */}
        <div className="card" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingDown size={16} color="var(--danger)" />
              <div className="section-title">{kpiOptions[activeKPI].label}</div>
            </div>
            <div className="section-sub">Causal tree — expand nodes to drill down into root causes</div>
          </div>
          <div style={{ padding: 20 }}>
            <TreeNode node={rcaTree} onSelect={setSelectedNode} selectedId={selectedNode?.id} />
          </div>
        </div>

        {/* Detail panel */}
        <div className="card" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
            <div className="section-title">Node Analysis</div>
            <div className="section-sub">Select a node to view details</div>
          </div>
          <DetailPanel node={selectedNode} />
        </div>
      </div>

      {/* Legend */}
      <div style={{
        marginTop: 20, display: 'flex', gap: 16, alignItems: 'center',
        padding: '12px 16px', background: 'var(--surface)', borderRadius: 8,
        border: '1px solid var(--border)'
      }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>SEVERITY:</span>
        {Object.entries(severityConfig).map(([key, cfg]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: cfg.color }} />
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{cfg.label}</span>
          </div>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>
          Click nodes to expand · Select to analyze
        </span>
      </div>
    </div>
  );
}
