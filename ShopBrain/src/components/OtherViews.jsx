import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

/* Analytics Component */
export const Analytics = ({ sales }) => {
  let grossRev = 0;
  let grossProfit = 0;
  sales.forEach(s => { grossRev += s.grandTotal; grossProfit += s.profit; });

  const marginPct = grossRev > 0 ? Math.round((grossProfit / grossRev) * 100) : 0;
  const avgTicket = sales.length > 0 ? Math.round(grossRev / sales.length) : 0;

  return (
    <div className="view-app">
      <h2>Sales Performance Analytics</h2>
      <div className="dashboard-grid" style={{ margin: '1.5rem 0' }}>
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-medium)' }}>TOTAL GROSS REVENUE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹{Math.round(grossRev).toLocaleString()}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-medium)' }}>GROSS PROFIT</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>₹{Math.round(grossProfit).toLocaleString()}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-medium)' }}>NET MARGIN</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{marginPct}%</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-medium)' }}>AVERAGE TICKET SIZE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>₹{avgTicket}</div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Transactions</h3>
        <div className="table-responsive" style={{ marginTop: '1rem' }}>
          <table className="table-custom">
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Time</th>
                <th>Total Amt</th>
                <th>Profit</th>
                <th>Method</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              {sales.slice().reverse().map(sale => (
                <tr key={sale.id}>
                  <td><strong>{sale.id}</strong></td>
                  <td>{new Date(sale.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>₹{Math.round(sale.grandTotal)}</td>
                  <td style={{ color: 'var(--primary)', fontWeight: 'bold' }}>₹{Math.round(sale.profit)}</td>
                  <td><span className="badge badge-info">{sale.paymentMethod}</span></td>
                  <td>{sale.customer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* Demand Forecast Component */
export const Forecast = ({ products }) => {
  return (
    <div className="view-app">
      <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--ai-purple)' }}>
        <h3>🤖 AI Demand Prediction Model</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--slate-medium)' }}>Predicts stockout velocity over 30 days to optimize wholesale orders.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {products.map(p => {
          const velocity = p.id === '1001' ? 18 : p.id === '1002' ? 8 : 2;
          const daysLeft = Math.round(p.stock / velocity);
          const recommend = daysLeft <= 2 ? Math.round(velocity * 10 - p.stock) : 0;

          return (
            <div key={p.id} className="card" style={{ borderLeft: `4px solid ${daysLeft <= 2 ? 'var(--warning)' : 'var(--primary)'}` }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{p.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-medium)', margin: '0.25rem 0' }}>Category: {p.category}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: '0.85rem', margin: '0.75rem 0' }}>
                <span>Current Stock:</span> <strong>{p.stock} units</strong>
                <span>Daily Sales Velocity:</span> <strong>{velocity} units</strong>
                <span>Stockout In:</span> <strong style={{ color: daysLeft <= 2 ? 'var(--error)' : 'inherit' }}>{daysLeft} days</strong>
              </div>
              <div style={{ background: 'var(--bg-light)', padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                👉 {recommend > 0 ? `Order ${recommend} units recommended.` : 'Enough stock available.'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* Profit Intel Component */
export const Profit = ({ products }) => {
  return (
    <div className="view-app">
      <h2 style={{ marginBottom: '1rem' }}>Profit Margin Intelligence</h2>
      <div className="table-responsive">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th style={{ textAlign: 'right' }}>Purchase Price</th>
              <th style={{ textAlign: 'right' }}>Selling Price</th>
              <th style={{ textAlign: 'right' }}>Margin / Unit</th>
              <th style={{ textAlign: 'right' }}>Margin %</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const diff = p.sellingPrice - p.purchasePrice;
              const margin = Math.round((diff / p.sellingPrice) * 100);
              return (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td><span className="badge badge-info">{p.category}</span></td>
                  <td style={{ textAlign: 'right' }}>₹{p.purchasePrice}</td>
                  <td style={{ textAlign: 'right' }}>₹{p.sellingPrice}</td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--primary)' }}>₹{diff}</td>
                  <td style={{ textAlign: 'right' }}>{margin}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* Customer Credit Component */
export const Customers = ({ customers, openAddCustomerModal, settleCredit }) => {
  return (
    <div className="view-app">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2>Customer Credit Accounts (Khata)</h2>
        <button className="btn btn-primary" onClick={openAddCustomerModal}>+ Add Account</button>
      </div>

      <div className="table-responsive">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone</th>
              <th style={{ textAlign: 'right' }}>Outstanding Credit</th>
              <th>Last Transaction</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td><strong>{c.name}</strong></td>
                <td>{c.phone}</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold', color: c.credit > 0 ? 'var(--error)' : 'var(--success)' }}>₹{c.credit.toLocaleString()}</td>
                <td>{c.lastTx}</td>
                <td>{c.due}</td>
                <td>
                  <button className="btn btn-sm btn-secondary" onClick={() => settleCredit(c.id)}>Settle Payment</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* Suppliers Component */
export const Suppliers = ({ suppliers, openAddSupplierModal }) => {
  return (
    <div className="view-app">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2>Supplier Restock Directory</h2>
        <button className="btn btn-primary" onClick={openAddSupplierModal}>+ Add Supplier</button>
      </div>

      <div className="table-responsive">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Contact Person</th>
              <th>Phone</th>
              <th>Categories</th>
              <th style={{ textAlign: 'right' }}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s.id}>
                <td><strong>{s.name}</strong></td>
                <td>{s.person}</td>
                <td>{s.phone}</td>
                <td><span className="badge badge-info">{s.categories}</span></td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₹{s.balance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* Expenses Component */
export const Expenses = ({ expenses, openAddExpenseModal }) => {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="view-app">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2>Shop Operating Expenses</h2>
        <button className="btn btn-primary" onClick={openAddExpenseModal}>+ Record Expense</button>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--slate-medium)' }}>TOTAL EXPENSES THIS MONTH</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--error)' }}>₹{total.toLocaleString()}</div>
      </div>

      <div className="table-responsive">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th>Notes</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, idx) => (
              <tr key={idx}>
                <td>{e.date}</td>
                <td><span className="badge badge-warning">{e.category}</span></td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₹{e.amount}</td>
                <td>{e.notes}</td>
                <td>{e.paymentType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* Reports Component */
export const Reports = () => {
  const download = (title) => alert(`Compiling ${title}... Download started.`);
  return (
    <div className="view-app">
      <h2>Business Reports & Summaries</h2>
      <div className="dashboard-grid" style={{ marginTop: '1.5rem' }}>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => download('Sales Report')}>
          <div style={{ fontSize: '2rem' }}>📝</div>
          <h4>Sales Report</h4>
        </div>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => download('Profit Report')}>
          <div style={{ fontSize: '2rem' }}>📊</div>
          <h4>Profit & Loss</h4>
        </div>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => download('Inventory Report')}>
          <div style={{ fontSize: '2rem' }}>📦</div>
          <h4>Inventory Valuation</h4>
        </div>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => download('Tax Report')}>
          <div style={{ fontSize: '2rem' }}>🏛️</div>
          <h4>Tax / GST Report</h4>
        </div>
      </div>
    </div>
  );
};

/* Settings Component */
export const Settings = () => {
  const { userProfile, setUserProfile, shopMode, setShopMode } = useLanguage();
  const [name, setName] = useState(userProfile.name);
  const [shop, setShop] = useState(userProfile.shopName);

  const save = () => {
    setUserProfile({ ...userProfile, name, shopName: shop });
    alert("Settings saved!");
  };

  return (
    <div className="view-app">
      <h2>Shop Settings</h2>
      <div className="card" style={{ maxWidth: '600px', marginTop: '1.5rem' }}>
        <div className="form-group">
          <label className="form-label">Owner Name</label>
          <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Shop Name</label>
          <input type="text" className="form-control" value={shop} onChange={e => setShop(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Shop Operating Mode</label>
          <select className="form-control" value={shopMode} onChange={e => setShopMode(e.target.value)}>
            <option value="small-shop">Small Shop Mode (Mobile-First)</option>
            <option value="supermarket">Supermarket Mode (Multi-counter)</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={save}>Save Settings</button>
      </div>
    </div>
  );
};
