import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Sparkles, BarChart2, GitBranch, Loader, Mic,
  TrendingUp, MessageSquare, Clock, RefreshCw, ChevronRight,
  Bot, User
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { botResponses, suggestedQuestions, monthlyTrends } from '../../data/mockData';

const COLORS = ['#2ca6ff', '#22c55e', '#f59e0b', '#ef4444'];

function ChartBlock({ chartDef }) {
  if (!chartDef) return null;
  const { type, data, xKey, yKey, label } = chartDef;
  const color = '#2ca6ff';

  return (
    <div style={{
      marginTop: 16, padding: '16px', background: 'var(--surface-2)',
      borderRadius: 10, border: '1px solid var(--border)'
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12 }}>{label}</div>
      <ResponsiveContainer width="100%" height={180}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
            <XAxis dataKey={xKey} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
            <Tooltip />
            <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} name={label} />
          </BarChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="nlpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
            <XAxis dataKey={xKey} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
            <Tooltip />
            <Area type="monotone" dataKey={yKey} stroke={color} fill="url(#nlpGrad)" strokeWidth={2} name={label} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div style={{
      display: 'flex', gap: 10, marginBottom: 20,
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-start'
    }}>
      {/* Avatar */}
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        background: isUser ? 'var(--primary)' : 'linear-gradient(135deg, #e0f2ff, #bde0ff)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: isUser ? 'none' : '1px solid #bde0ff'
      }}>
        {isUser ? <User size={15} color="#fff" /> : <Bot size={15} color="var(--primary)" />}
      </div>

      <div style={{ maxWidth: '80%' }}>
        <div style={{
          padding: '12px 16px',
          borderRadius: isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
          background: isUser ? 'var(--primary)' : 'var(--surface)',
          border: isUser ? 'none' : '1px solid var(--border)',
          color: isUser ? '#fff' : 'var(--text-primary)',
          fontSize: 13.5, lineHeight: 1.6,
          boxShadow: 'var(--shadow-sm)'
        }}>
          {msg.content}
        </div>

        {msg.chart && <ChartBlock chartDef={msg.chart} />}

        {msg.showRCA && (
          <div style={{
            marginTop: 10, padding: '10px 14px',
            background: '#fff7ed', borderRadius: 8, border: '1px solid #fed7aa',
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <GitBranch size={14} color="var(--warning)" />
            <span style={{ fontSize: 12.5, color: '#92400e', flex: 1 }}>
              Want to analyze the root cause of this pattern?
            </span>
            <button className="btn btn-sm" style={{
              background: 'var(--warning)', color: '#fff',
              padding: '4px 10px', fontSize: 11, fontWeight: 600
            }}>
              Run RCA <ChevronRight size={11} />
            </button>
          </div>
        )}

        {msg.sources && (
          <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {msg.sources.map((s, i) => (
              <span key={i} style={{
                fontSize: 10.5, padding: '2px 8px', borderRadius: 4,
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                color: 'var(--text-muted)', fontWeight: 500
              }}>{s}</span>
            ))}
          </div>
        )}

        <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 5, textAlign: isUser ? 'right' : 'left' }}>
          {msg.time}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'flex-start' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        background: 'linear-gradient(135deg, #e0f2ff, #bde0ff)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid #bde0ff'
      }}>
        <Bot size={15} color="var(--primary)" />
      </div>
      <div style={{
        padding: '14px 18px', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: '12px 12px 12px 4px',
        display: 'flex', gap: 5, alignItems: 'center'
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)',
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const INIT_MESSAGES = [
  {
    id: 1, role: 'ai',
    content: 'Hello! I\'m your Procurement Intelligence Assistant, connected to SAP HANA. I can answer questions about procurement history, supplier performance, spend trends, and forecast future scenarios. I\'ll accompany my answers with relevant charts and data visualizations. What would you like to know?',
    time: now(),
    sources: ['SAP HANA · Live', 'ML Forecast Model v3.2', 'ERP Purchase Register']
  }
];

function getResponse(q) {
  const lower = q.toLowerCase();
  if (lower.includes('spend')) return 'spend trend';
  if (lower.includes('deliver') || lower.includes('otd') || lower.includes('otif')) return 'delivery performance';
  if (lower.includes('quality') || lower.includes('reject') || lower.includes('defect')) return 'quality rejection';
  if (lower.includes('saving') || lower.includes('cost')) return 'cost savings';
  return null;
}

export default function NLPBot() {
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', content: text, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 1400 + Math.random() * 800));

    const key = getResponse(text);
    const resp = key && botResponses[key];

    let aiContent = resp
      ? resp.text
      : `Based on your SAP HANA procurement data, here is what I found regarding "${text}": The system has analyzed 38,400+ transactions across 42 active suppliers. Current procurement cycle time stands at 18.2 days (improved from 22 days in Q1 FY2024). Predictive models indicate this will further improve to 15.8 days by Q2. Would you like me to drill into a specific supplier or category?`;

    const aiMsg = {
      id: Date.now() + 1,
      role: 'ai',
      content: aiContent,
      chart: resp?.chart || null,
      showRCA: !!resp,
      time: now(),
      sources: ['SAP HANA Purchase Register', 'ML Forecast Engine', 'Supplier Scorecard DB']
    };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, height: 'calc(100vh - 140px)' }}>
      {/* Chat main */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 12
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg, #2ca6ff, #0072e5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Sparkles size={18} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', fontFamily: 'var(--font-jp)' }}>
              Procurement NLP Intelligence Bot
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <div className="status-dot green" style={{ width: 6, height: 6 }} />
              Connected to SAP HANA · Answers historical & predictive questions
            </div>
          </div>
          <button className="btn btn-ghost btn-sm"><RefreshCw size={12} /> Clear</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(0.85)} }`}</style>
          {messages.map(msg => <Message key={msg.id} msg={msg} />)}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '16px 20px', borderTop: '1px solid var(--border)',
          background: 'var(--surface-2)'
        }}>
          <div style={{
            display: 'flex', gap: 10, alignItems: 'flex-end',
            background: 'var(--surface)', border: '1.5px solid var(--border)',
            borderRadius: 12, padding: '10px 12px',
            transition: 'border-color 0.15s',
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about procurement spend, supplier OTD, quality trends, forecasts…"
              rows={1}
              style={{
                flex: 1, border: 'none', background: 'transparent', resize: 'none',
                fontSize: 13.5, color: 'var(--text-primary)', outline: 'none',
                fontFamily: 'var(--font-main)', lineHeight: 1.5, maxHeight: 120,
                overflowY: 'auto'
              }}
            />
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <button className="btn btn-ghost btn-sm" style={{ padding: '6px', borderRadius: 8 }}>
                <Mic size={15} />
              </button>
              <button
                className="btn btn-primary"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                style={{ padding: '7px 14px', borderRadius: 8, opacity: (!input.trim() || loading) ? 0.5 : 1 }}
              >
                {loading ? <Loader size={14} className="spinner" /> : <Send size={14} />}
              </button>
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, textAlign: 'center' }}>
            Press Enter to send · Shift+Enter for new line · Responses include charts and RCA links
          </div>
        </div>
      </div>

      {/* Sidebar: suggested + context */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Suggested questions */}
        <div className="card">
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Suggested Questions
            </div>
          </div>
          <div style={{ padding: '8px' }}>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                  padding: '9px 10px', borderRadius: 8, width: '100%',
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  textAlign: 'left', marginBottom: 2, transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-light)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <ChevronRight size={13} color="var(--primary)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{q}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Data context */}
        <div className="card">
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Data Context
            </div>
          </div>
          <div style={{ padding: '14px 16px' }}>
            {[
              { label: 'Data Window', value: 'Apr 2024 – Mar 2025' },
              { label: 'Total Records', value: '1.2M+ transactions' },
              { label: 'Suppliers Covered', value: '42 active vendors' },
              { label: 'Forecast Horizon', value: 'Q2–Q3 FY2025' },
              { label: 'Model Confidence', value: '87.3%' },
              { label: 'Last SAP Sync', value: '3 minutes ago' },
            ].map((d, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '7px 0', borderBottom: i < 5 ? '1px solid var(--border-light)' : 'none'
              }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className="card">
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Bot Capabilities
            </div>
          </div>
          <div style={{ padding: '10px 16px' }}>
            {[
              { icon: TrendingUp, label: 'Trend Analysis', sub: 'Historical KPI trends' },
              { icon: Sparkles, label: 'AI Forecasting', sub: 'Future projections' },
              { icon: BarChart2, label: 'Chart Generation', sub: 'Visual data insights' },
              { icon: GitBranch, label: 'RCA Integration', sub: 'Root cause analysis' },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border-light)' : 'none' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 7,
                    background: 'var(--primary-light)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Icon size={13} color="var(--primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)' }}>{c.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
