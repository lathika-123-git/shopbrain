import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Dashboard = ({ products, sales, customers, openAddProductModal, setAppView, speakText }) => {
  const { t, userProfile } = useLanguage();

  // Metrics calculations
  let todaySales = 4850;
  let todayProfit = 1250;
  let todayBills = sales.length || 4;

  let totalCredit = 0;
  customers.forEach(c => totalCredit += c.credit);

  // Filter low stock and out of stock items
  const alertItems = products.filter(p => p.stock <= p.threshold);

  const speakBriefing = () => {
    const text = t('listen_briefing_prompt');
    speakText(text);
  };

  return (
    <div className="view-app">
      {/* Daily Shop Briefing Card */}
      <div className="daily-brief-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <h2>Good Morning, {userProfile.name}!</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-light)' }}>
              {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button className="btn btn-sm btn-ai-secondary" onClick={speakBriefing}>
            📢 {t('listen_briefing')}
          </button>
        </div>

        <div className="daily-brief-grid">
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-light)', textTransform: 'uppercase' }}>{t('yesterday_sales')}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-border)' }}>₹4,850</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-light)', textTransform: 'uppercase' }}>{t('estimated_profit')}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-border)' }}>₹1,250</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-light)', textTransform: 'uppercase' }}>{t('low_stock_items')}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--warning)' }}>08</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-light)', textTransform: 'uppercase' }}>{t('expiry_warnings')}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--error)' }}>02</div>
          </div>
        </div>

        <div style={{ fontSize: '0.9rem', color: '#e2e8f0', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ fontSize: '1.25rem' }}>✨</span>
          <span>{t('listen_briefing_prompt')}</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="quick-actions-bar">
        <div className="action-box" onClick={() => setAppView('billing')}>
          <div style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>🧾</div>
          <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{t('btn_billing')}</div>
        </div>
        <div className="action-box" onClick={() => setAppView('quick-sale')}>
          <div style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>🎙️</div>
          <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{t('btn_voicesale')}</div>
        </div>
        <div className="action-box" onClick={openAddProductModal}>
          <div style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>📦</div>
          <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{t('btn_addproduct')}</div>
        </div>
        <div className="action-box" onClick={() => setAppView('ai-assistant')}>
          <div style={{ fontSize: '1.5rem', color: 'var(--ai-purple)' }}>✨</div>
          <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{t('btn_askai')}</div>
        </div>
        <div className="action-box" onClick={() => setAppView('reports')}>
          <div style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>📊</div>
          <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{t('btn_reports')}</div>
        </div>
        <div className="action-box" onClick={() => setAppView('inventory')}>
          <div style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>📋</div>
          <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>View Stock</div>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="dashboard-grid">
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-medium)', textTransform: 'uppercase', fontWeight: 600 }}>{t('today_sales')}</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.25rem 0' }}>₹{todaySales.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>▲ 12.5% vs yesterday</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-medium)', textTransform: 'uppercase', fontWeight: 600 }}>{t('today_profit')}</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.25rem 0' }}>₹{todayProfit.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>▲ 6.3% vs yesterday</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-medium)', textTransform: 'uppercase', fontWeight: 600 }}>{t('orders_count')}</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.25rem 0' }}>{todayBills}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>▲ 10.2% vs yesterday</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-medium)', textTransform: 'uppercase', fontWeight: 600 }}>{t('credit_outstanding')}</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.25rem 0' }}>₹{totalCredit.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--slate-medium)' }}>3 customers pending</div>
        </div>
      </div>

      {/* Main Charts & Stock Warning Row */}
      <div className="dashboard-main-row">
        <div className="card">
          <h3>{t('sales_trend_lbl')}</h3>
          <div style={{ height: '200px', width: '100%', marginTop: '1rem' }}>
            {/* SVG Line Chart */}
            <svg style={{ width: '100%', height: '100%' }}>
              <line x1="30" y1="160" x2="450" y2="160" stroke="var(--border-color)" />
              <line x1="30" y1="100" x2="450" y2="100" stroke="var(--border-color)" strokeDasharray="4 4" />
              <line x1="30" y1="40" x2="450" y2="40" stroke="var(--border-color)" strokeDasharray="4 4" />
              
              <path d="M 40 140 L 100 110 L 160 130 L 220 80 L 280 50 L 340 30 L 400 20" fill="none" stroke="var(--primary)" strokeWidth="3" />
              <circle cx="400" cy="20" r="5" fill="white" stroke="var(--primary)" strokeWidth="3" />

              <text x="40" y="180" fontSize="11" fill="var(--slate-medium)">Mon</text>
              <text x="100" y="180" fontSize="11" fill="var(--slate-medium)">Tue</text>
              <text x="160" y="180" fontSize="11" fill="var(--slate-medium)">Wed</text>
              <text x="220" y="180" fontSize="11" fill="var(--slate-medium)">Thu</text>
              <text x="280" y="180" fontSize="11" fill="var(--slate-medium)">Fri</text>
              <text x="340" y="180" fontSize="11" fill="var(--slate-medium)">Sat</text>
              <text x="400" y="180" fontSize="11" fill="var(--slate-medium)">Sun</text>
            </svg>
          </div>
        </div>

        {/* Stock Alert Box */}
        <div className="card">
          <h3>{t('stock_health')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {alertItems.map(p => (
              <div key={p.id} style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', background: p.stock === 0 ? 'var(--error-light)' : 'var(--warning-light)', border: `1px solid ${p.stock===0?'var(--error-border)':'var(--warning-border)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <div>
                  <strong>{p.name}</strong>
                  <div style={{ fontSize: '0.75rem' }}>{p.stock === 0 ? 'Out of stock!' : `Low stock (${p.stock} left)`}</div>
                </div>
                <button className="btn btn-sm btn-outline" onClick={() => setAppView('inventory')}>Restock</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
