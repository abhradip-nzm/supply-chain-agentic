import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell
} from 'recharts';
import {
  TrendingUp, TrendingDown, Minus, AlertTriangle,
  Package, Clock, DollarSign, Truck, ShieldCheck,
  BarChart3, ArrowUpRight, ArrowDownRight, Info, Sparkles, Eye
} from 'lucide-react';
import { kpiData, monthlyTrends, supplierPerformance, recentPOs, rfqData } from '../../data/mockData';

const COLORS = ['#2ca6ff', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

function KPICard({ label, value, unit, trend, status, predictive, icon: Icon }) {
  const isUp = trend > 0;
  const isPositiveTrend = status === 'success' ? isUp : !isUp;
  return (
    <div className={`kpi-card ${status}`}>
      <div className="flex-between" style={{ marginBottom: 10 }}>
        <div className="kpi-label">{label}</div>
        {Icon && (
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--primary-light)', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <Icon size={15} color="var(--primary)" />
          </div>
        )}
      </div>
      <div className="kpi-value">{value}<span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginLeft: 3 }}>{unit}</span></div>
      <div className="kpi-sub">
        <span className={`kpi-badge ${isPositiveTrend ? 'up' : trend === 0 ? 'neutral' : 'down'}`}>
          {isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {Math.abs(trend)}{unit === '%' ? 'pp' : unit === 'days' ? 'd' : ''}
        </span>
        <span className="color-muted">vs last month</span>
      </div>
      {predictive && (
        <div style={{
          marginTop: 10, paddingTop: 8, borderTop: '1px dashed var(--border)',
          display: 'flex', alignItems: 'center', gap: 5
        }}>
          <Sparkles size={11} color="var(--primary)" />
          <span style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 500 }}>
            AI Forecast: <strong>{predictive}{unit}</strong> next quarter
          </span>
        </div>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--border)', borderRadius: 8,
      padding: '10px 14px', boxShadow: 'var(--shadow)', fontSize: 12
    }}>
      <p style={{ fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
          <span style={{ color: 'var(--text-secondary)' }}>{p.name}:</span>
          <strong style={{ color: 'var(--text-primary)' }}>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

function PredictiveBanner() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #e0f2ff 0%, #f0f9ff 100%)',
      border: '1px solid #bde0ff', borderRadius: 12,
      padding: '14px 20px', marginBottom: 24,
      display: 'flex', alignItems: 'center', gap: 14
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: 'linear-gradient(135deg, #2ca6ff, #0072e5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <Sparkles size={20} color="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)', fontFamily: 'var(--font-jp)', marginBottom: 2 }}>
          AI Predictive Insights — Q2 FY2025 Forecast Active
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
          ML model trained on 36 months of SAP data · Confidence: <strong>87.3%</strong> · 
          OTD projected to improve to <strong style={{ color: 'var(--success)' }}>91.2%</strong> · 
          Spend forecast: <strong style={{ color: 'var(--warning)' }}>$42.1M</strong> (+9.6%) · 
          <span style={{ color: 'var(--primary)', fontWeight: 500, cursor: 'pointer' }}> View full forecast →</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <span className="badge badge-success">↑ 87% Confidence</span>
        <span className="badge badge-primary">Live</span>
      </div>
    </div>
  );
}

function AlertsPanel() {
  const alerts = [
    { type: 'danger', msg: 'ShanShan Carbon: PO-0894 delayed 14 days — silicon anode backlog', time: '2h ago' },
    { type: 'warning', msg: 'SKC Inc separator shipment stuck at customs — ETA pushed to Apr 12', time: '5h ago' },
    { type: 'warning', msg: '3 contracts expiring in next 30 days — renewal required', time: '1d ago' },
    { type: 'info', msg: 'AI detected price anomaly in LiFSI market — negotiate before RFQ-044 closes', time: '3h ago' },
    { type: 'success', msg: 'CATL Materials delivered PO-0891 2 days ahead of schedule', time: '6h ago' },
  ];
  const colorMap = { danger: 'var(--danger)', warning: 'var(--warning)', info: 'var(--primary)', success: 'var(--success)' };
  const bgMap = { danger: '#fee2e2', warning: '#fef3c7', info: '#e0f2ff', success: '#dcfce7' };
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="section-title">Live Alerts</div>
          <div className="section-sub">AI-powered anomaly detection</div>
        </div>
        <span className="badge badge-danger">5 Active</span>
      </div>
      <div style={{ padding: '8px 0' }}>
        {alerts.map((a, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '10px 20px', borderBottom: i < alerts.length - 1 ? '1px solid var(--border-light)' : 'none'
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', marginTop: 5, flexShrink: 0,
              background: colorMap[a.type]
            }} />
            <div style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4 }}>{a.msg}</div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const spendData = Object.entries(kpiData.categorySpend).map(([k, v]) => ({ name: k, value: v }));

  const radarData = [
    { subject: 'OTD', A: 87 }, { subject: 'Quality', A: 97 },
    { subject: 'Cost', A: 81 }, { subject: 'Risk', A: 68 },
    { subject: 'Compliance', A: 92 }, { subject: 'Agility', A: 75 },
  ];

  return (
    <div className="fade-in">
      <PredictiveBanner />

      {/* Tab selector */}
      <div className="flex-between mb-24">
        <div className="tabs">
          {['overview', 'suppliers', 'orders', 'predictions'].map(t => (
            <button key={t} className={`tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* KPI Grid */}
          <div style={{ marginBottom: 8 }}>
            <div className="section-title mb-16">Core Procurement KPIs</div>
          </div>
          <div className="kpi-grid">
            <KPICard label="On-Time Delivery" value="87.4" unit="%" trend={2.1} status="warning" predictive="91.2%" icon={Truck} />
            <KPICard label="Procurement Cycle Time" value="18.2" unit=" days" trend={-3.1} status="success" predictive="15.8 days" icon={Clock} />
            <KPICard label="Cost Savings YTD" value="$4.72" unit="M" trend={12.4} status="success" predictive="$5.8M" icon={DollarSign} />
            <KPICard label="PO Accuracy" value="96.3" unit="%" trend={0.8} status="success" predictive="97.1%" icon={ShieldCheck} />
            <KPICard label="Quality Rejection" value="3.2" unit="%" trend={-0.6} status="success" predictive="2.4%" icon={Package} />
            <KPICard label="Supplier OTIF" value="83.6" unit="%" trend={-1.4} status="warning" predictive="86.1%" icon={TrendingUp} />
            <KPICard label="Inventory Turnover" value="8.7" unit="x" trend={0.4} status="success" predictive="9.3x" icon={BarChart3} />
            <KPICard label="Spend Compliance" value="91.5" unit="%" trend={1.8} status="success" predictive="94%" icon={ShieldCheck} />
            <KPICard label="Total Active Suppliers" value="42" unit="" trend={3} status="info" icon={Package} />
            <KPICard label="Active Contracts" value="127" unit="" trend={8} status="info" icon={BarChart3} />
            <KPICard label="Invoice Cycle Time" value="4.8" unit=" days" trend={-1.2} status="success" predictive="3.9 days" icon={Clock} />
            <KPICard label="Supplier Risk Score" value="32" unit="/100" trend={-4} status="success" predictive="28/100" icon={AlertTriangle} />
          </div>

          {/* Charts row */}
          <div className="grid-2 mt-24">
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="section-title">OTD & Quality Trend</div>
                  <div className="section-sub">12 months actual + 3 months AI forecast</div>
                </div>
                <span className="badge badge-primary"><Sparkles size={10} /> AI Forecast</span>
              </div>
              <div className="card-body" style={{ paddingTop: 8 }}>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="otd" stroke="#2ca6ff" strokeWidth={2} dot={{ r: 3 }} name="OTD %" activeDot={{ r: 5 }} strokeDasharray={(d) => d.predicted ? '5 3' : '0'} />
                    <Line type="monotone" dataKey="quality" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Rejection %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <div className="section-title">Monthly Spend ($M)</div>
                  <div className="section-sub">Actuals vs AI-projected spend</div>
                </div>
              </div>
              <div className="card-body" style={{ paddingTop: 8 }}>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={monthlyTrends}>
                    <defs>
                      <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2ca6ff" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#2ca6ff" stopOpacity={0.01} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="spend" stroke="#2ca6ff" fill="url(#spendGrad)" strokeWidth={2.5} name="Spend $M" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Spend by category + Radar */}
          <div className="grid-2 mt-24">
            <div className="card">
              <div className="card-header">
                <div className="section-title">Spend by Category</div>
              </div>
              <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie data={spendData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                      dataKey="value" paddingAngle={3}>
                      {spendData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => `$${v}M`} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex: 1 }}>
                  {spendData.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                      <span style={{ fontSize: 12, flex: 1, color: 'var(--text-secondary)' }}>{d.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>${d.value}M</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <div className="section-title">Supplier Performance Radar</div>
                  <div className="section-sub">Aggregated across all active vendors</div>
                </div>
              </div>
              <div className="card-body" style={{ paddingTop: 0 }}>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                    <Radar name="Score" dataKey="A" stroke="#2ca6ff" fill="#2ca6ff" fillOpacity={0.18} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="mt-24">
            <AlertsPanel />
          </div>
        </>
      )}

      {activeTab === 'suppliers' && (
        <div className="card fade-in">
          <div className="card-header">
            <div>
              <div className="section-title">Supplier Performance Scorecard</div>
              <div className="section-sub">All active vendors — SAP integrated data</div>
            </div>
            <button className="btn btn-primary btn-sm">Export</button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Category</th>
                  <th>OTD %</th>
                  <th>Quality %</th>
                  <th>Spend ($M)</th>
                  <th>Risk Level</th>
                  <th>Contracts</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {supplierPerformance.map((s, i) => (
                  <tr key={i}>
                    <td>{s.name}</td>
                    <td><span className="badge badge-neutral">{s.category}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="telemetry-bar" style={{ width: 60 }}>
                          <div className="telemetry-bar-fill" style={{
                            width: `${s.otd}%`,
                            background: s.otd >= 90 ? 'var(--success)' : s.otd >= 80 ? 'var(--warning)' : 'var(--danger)'
                          }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{s.otd}%</span>
                      </div>
                    </td>
                    <td>{s.quality}%</td>
                    <td>${s.spend}M</td>
                    <td>
                      <span className={`badge ${s.risk === 'Low' ? 'badge-success' : s.risk === 'Medium' ? 'badge-warning' : 'badge-danger'}`}>
                        {s.risk}
                      </span>
                    </td>
                    <td>{s.contracts}</td>
                    <td>
                      <span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="fade-in">
          <div className="card">
            <div className="card-header">
              <div>
                <div className="section-title">Recent Purchase Orders</div>
                <div className="section-sub">Last 7 days — live SAP data</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost btn-sm">Filter</button>
                <button className="btn btn-primary btn-sm">New PO</button>
              </div>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>Vendor</th>
                    <th>Material</th>
                    <th>Quantity</th>
                    <th>Value</th>
                    <th>Order Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPOs.map((po, i) => {
                    const statusMap = {
                      Delivered: 'badge-success', 'In Transit': 'badge-primary',
                      'GRN Pending': 'badge-warning', Delayed: 'badge-danger',
                      Processing: 'badge-neutral', Approved: 'badge-primary'
                    };
                    return (
                      <tr key={i}>
                        <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{po.id}</td>
                        <td>{po.vendor}</td>
                        <td>{po.material}</td>
                        <td>{po.qty}</td>
                        <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{po.value}</td>
                        <td>{po.date}</td>
                        <td><span className={`badge ${statusMap[po.status] || 'badge-neutral'}`}>{po.status}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="section-title">Active RFQs</div>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>RFQ ID</th>
                    <th>Material</th>
                    <th>Vendors Invited</th>
                    <th>Responses</th>
                    <th>Deadline</th>
                    <th>Best Quote</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rfqData.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.id}</td>
                      <td>{r.material}</td>
                      <td>{r.vendors}</td>
                      <td>{r.responses}/{r.vendors}</td>
                      <td>{r.deadline}</td>
                      <td style={{ fontWeight: 600, color: 'var(--success)' }}>{r.bestQuote}</td>
                      <td><span className={`badge ${r.status === 'Open' ? 'badge-primary' : r.status === 'Evaluating' ? 'badge-warning' : r.status === 'Negotiation' ? 'badge-success' : 'badge-neutral'}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'predictions' && (
        <div className="fade-in">
          <div style={{
            background: 'linear-gradient(135deg, #e0f2ff, #f0faff)',
            border: '1px solid #bde0ff', borderRadius: 12, padding: 20, marginBottom: 24
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <Sparkles size={20} color="var(--primary)" />
              <div className="section-title">AI Predictive Analytics — Q2 FY2025</div>
            </div>
            <div className="section-sub">
              Powered by SAP HANA ML + LLM ensemble · Training window: 36 months · Confidence interval: 85–91%
            </div>
          </div>

          <div className="kpi-grid" style={{ marginBottom: 24 }}>
            {[
              { label: 'Predicted OTD — Q2', value: '91.2', unit: '%', color: 'success' },
              { label: 'Predicted Spend — Q2', value: '$42.1', unit: 'M', color: '' },
              { label: 'Predicted Savings — Q2', value: '$2.54', unit: 'M', color: 'success' },
              { label: 'Predicted Rejection Rate', value: '2.4', unit: '%', color: 'success' },
              { label: 'High-Risk Vendors Forecast', value: '4', unit: '', color: 'warning' },
              { label: 'Contract Renewals Due', value: '12', unit: '', color: 'warning' },
            ].map((k, i) => (
              <div key={i} className={`kpi-card ${k.color}`}>
                <div className="kpi-label">{k.label}</div>
                <div className="kpi-value">{k.value}<span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginLeft: 3 }}>{k.unit}</span></div>
                <div className="kpi-sub">
                  <Sparkles size={11} color="var(--primary)" />
                  <span style={{ color: 'var(--primary)', fontSize: 11 }}>AI Forecast — 87% confidence</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <div className="section-title">12-Month Trend + 3-Month Forecast</div>
                <div className="section-sub">Shaded area = AI-predicted range · Dashed = forecast</div>
              </div>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyTrends}>
                  <defs>
                    <linearGradient id="otdGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2ca6ff" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2ca6ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cycleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="otd" stroke="#2ca6ff" fill="url(#otdGrad)" strokeWidth={2} name="OTD %" />
                  <Area type="monotone" dataKey="cycle" stroke="#22c55e" fill="url(#cycleGrad)" strokeWidth={2} name="Cycle Days" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
