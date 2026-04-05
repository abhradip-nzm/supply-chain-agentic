import React, { useState } from 'react';
import {
  BarChart2, Download, Play, Clock, CheckCircle2, Loader,
  Calendar, Zap, RefreshCw, FileText, Filter, AlertCircle,
  Activity, Database, Cpu, Wifi, Server
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { reportTemplates, telemetryMetrics, monthlyTrends } from '../../data/mockData';

function TelemetryPanel() {
  const icons = [Wifi, Database, Cpu, Activity, Zap, AlertCircle];
  const statusColors = { healthy: 'var(--success)', warning: 'var(--warning)', error: 'var(--danger)' };
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="section-title">System Telemetry</div>
          <div className="section-sub">Real-time pipeline health monitoring</div>
        </div>
        <div className="flex-center gap-8">
          <div className="status-dot green" />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--success)' }}>5/6 Healthy</span>
        </div>
      </div>
      <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {telemetryMetrics.map((m, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={i} style={{
              padding: '12px 14px', borderRadius: 10,
              border: `1px solid ${m.status === 'warning' ? '#fde68a' : 'var(--border)'}`,
              background: m.status === 'warning' ? '#fffbeb' : 'var(--surface-2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Icon size={13} color={statusColors[m.status]} />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{m.label}</span>
                <div style={{ marginLeft: 'auto' }}>
                  <div className="status-dot" style={{ background: statusColors[m.status] }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>LATENCY</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{m.latency}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>UPTIME</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--success)' }}>{m.uptime}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Realtime sparkline */}
      <div style={{ padding: '0 24px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>Query Throughput (last 12h)</div>
        <ResponsiveContainer width="100%" height={60}>
          <LineChart data={[
            {t:1,v:120},{t:2,v:145},{t:3,v:132},{t:4,v:178},{t:5,v:156},
            {t:6,v:189},{t:7,v:201},{t:8,v:167},{t:9,v:212},{t:10,v:198},
            {t:11,v:234},{t:12,v:221}
          ]}>
            <Line type="monotone" dataKey="v" stroke="#2ca6ff" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ReportCard({ report, onRun }) {
  const [running, setRunning] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 2200);
    onRun(report);
  };

  const statusIcon = {
    Completed: <CheckCircle2 size={13} color="var(--success)" />,
    Running: <Loader size={13} color="var(--primary)" className="spinner" />,
    Scheduled: <Clock size={13} color="var(--warning)" />,
  };
  const statusBadge = {
    Completed: 'badge-success', Running: 'badge-primary', Scheduled: 'badge-warning'
  };
  const catColor = {
    Procurement: '#2ca6ff', Risk: '#ef4444', Quality: '#22c55e',
    Inventory: '#f59e0b', Contracts: '#8b5cf6', Finance: '#06b6d4'
  };

  return (
    <div className="card" style={{ transition: 'box-shadow 0.2s' }}>
      <div style={{ padding: '18px 20px' }}>
        <div className="flex-between" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: catColor[report.category] + '18',
              border: `1px solid ${catColor[report.category]}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <FileText size={16} color={catColor[report.category]} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--text-primary)' }}>{report.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{report.id} · {report.frequency}</div>
            </div>
          </div>
          <span className={`badge ${statusBadge[report.status]}`}>
            {statusIcon[report.status]} {report.status}
          </span>
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
          {report.description}
        </p>

        {/* Metrics chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
          {report.metrics.map((m, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 500, padding: '2px 8px',
              borderRadius: 4, background: 'var(--surface-2)',
              border: '1px solid var(--border)', color: 'var(--text-secondary)'
            }}>{m}</span>
          ))}
        </div>

        {/* Telemetry mini stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 8, padding: '10px', background: 'var(--surface-2)',
          borderRadius: 8, marginBottom: 14
        }}>
          {[
            { label: 'Data Points', value: report.telemetry.dataPoints.toLocaleString() },
            { label: 'Runtime', value: report.telemetry.runtime },
            { label: 'Freshness', value: report.telemetry.freshness },
            { label: 'Coverage', value: report.telemetry.coverage },
          ].map((t, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>{t.value}</div>
              <div style={{ fontSize: 9.5, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleRun}
            style={{ flex: 1, justifyContent: 'center', position: 'relative' }}
            disabled={running}
          >
            {running ? <><Loader size={12} className="spinner" /> Generating...</> : <><Play size={12} /> Run Report</>}
          </button>
          <button className="btn btn-ghost btn-sm"><Download size={12} /></button>
          <button className="btn btn-ghost btn-sm"><Calendar size={12} /></button>
        </div>

        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>
          Last run: {report.lastRun}
        </div>
      </div>
    </div>
  );
}

export default function Reports() {
  const [filter, setFilter] = useState('All');
  const [generatedReport, setGeneratedReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = ['All', 'Procurement', 'Risk', 'Quality', 'Inventory', 'Contracts', 'Finance'];
  const filtered = filter === 'All' ? reportTemplates : reportTemplates.filter(r => r.category === filter);

  const handleRun = (report) => {
    setLoading(true);
    setTimeout(() => {
      setGeneratedReport(report);
      setLoading(false);
    }, 2200);
  };

  const spendData = monthlyTrends.slice(0, 12).map(m => ({ month: m.month, savings: m.savings, spend: m.spend }));

  return (
    <div className="fade-in">
      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24,
        padding: '16px 20px', background: 'var(--surface)', borderRadius: 12,
        border: '1px solid var(--border)'
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: 'linear-gradient(135deg, #2ca6ff20, #2ca6ff40)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <BarChart2 size={20} color="var(--primary)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', fontFamily: 'var(--font-jp)' }}>
            AI-Powered Report Generator
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Connected to SAP HANA · All reports use live data · Supports scheduling & export
          </div>
        </div>
        <button className="btn btn-outline btn-sm"><Zap size={12} /> AI Auto-Generate</button>
        <button className="btn btn-ghost btn-sm"><RefreshCw size={12} /> Refresh All</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        <div>
          {/* Category filter */}
          <div style={{ marginBottom: 16 }}>
            <div className="tabs">
              {categories.map(c => (
                <button key={c} className={`tab ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
              ))}
            </div>
          </div>

          {/* Report cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {filtered.map((r, i) => (
              <ReportCard key={r.id} report={r} onRun={handleRun} />
            ))}
          </div>

          {/* Generated report viewer */}
          {(loading || generatedReport) && (
            <div className="card mt-24 fade-in">
              <div className="card-header">
                <div>
                  <div className="section-title">
                    {loading ? 'Generating Report...' : `Report: ${generatedReport?.name}`}
                  </div>
                  <div className="section-sub">
                    {loading ? 'Querying SAP HANA and running AI analysis...' : 'AI-generated insights with telemetry'}
                  </div>
                </div>
                {!loading && <button className="btn btn-primary btn-sm"><Download size={12} /> Export PDF</button>}
              </div>
              {loading ? (
                <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                  <Loader size={32} color="var(--primary)" className="spinner" style={{ margin: '0 auto 16px' }} />
                  <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Fetching data from SAP HANA...</p>
                </div>
              ) : (
                <div className="card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                    {[
                      { label: 'Total Spend', value: '$38.4M', sub: '+7.2% YoY', color: 'var(--primary)' },
                      { label: 'Cost Savings', value: '$4.72M', sub: '+12.4% YoY', color: 'var(--success)' },
                      { label: 'Avg OTD', value: '87.4%', sub: '+2.1pp MoM', color: 'var(--warning)' },
                      { label: 'Quality Rate', value: '96.8%', sub: '+0.6pp MoM', color: 'var(--success)' },
                    ].map((s, i) => (
                      <div key={i} style={{
                        padding: '14px', background: 'var(--surface-2)',
                        borderRadius: 8, border: '1px solid var(--border)'
                      }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{s.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: 'var(--text-primary)' }}>Spend vs Savings Trend</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={spendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                      <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                      <Tooltip />
                      <Bar dataKey="spend" fill="#e0f2ff" stroke="#2ca6ff" radius={[4, 4, 0, 0]} name="Spend $M" />
                      <Bar dataKey="savings" fill="#2ca6ff" radius={[4, 4, 0, 0]} name="Savings $M" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{
                    marginTop: 16, padding: '14px', background: '#f0fdf4',
                    borderRadius: 8, border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: '#15803d', marginBottom: 4 }}>AI Summary</div>
                    <p style={{ fontSize: 12.5, color: '#166534', lineHeight: 1.6 }}>
                      Procurement performance improved across 8 of 12 tracked KPIs this period. 
                      Top opportunity: accelerating ShanShan Carbon corrective action could unlock an 
                      additional $0.4M in savings and restore 3–4pp OTD by Q2. Contract renewal 
                      pipeline requires attention — 3 high-value agreements expire in 30 days.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Telemetry sidebar */}
        <div>
          <TelemetryPanel />
        </div>
      </div>
    </div>
  );
}
