import React, { useState, useEffect } from 'react';
import { useLanguage, LanguageProvider } from './context/LanguageContext';
import { initialProducts, initialSales, initialCustomers, initialSuppliers, initialExpenses } from './data/initialData';
import { Modals } from './components/Modals';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { Billing } from './components/Billing';
import { QuickSale } from './components/QuickSale';
import { Inventory } from './components/Inventory';
import { AIAssistant } from './components/AIAssistant';
import { Analytics, Forecast, Profit, Customers, Suppliers, Expenses, Reports, Settings } from './components/OtherViews';
import './App.css';

const MainAppContent = () => {
  const { lang, setLang, shopMode, userProfile, t } = useLanguage();

  // Navigation State
  const [shell, setShell] = useState('public'); // 'public' or 'app'
  const [view, setView] = useState('landing');   // sub-view
  const [activeModal, setActiveModal] = useState(null);

  // App Data State (persisted in localStorage)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sb_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('sb_sales');
    return saved ? JSON.parse(saved) : initialSales;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('sb_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem('sb_suppliers');
    return saved ? JSON.parse(saved) : initialSuppliers;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('sb_expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [activeReceipt, setActiveReceipt] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState([]);

  useEffect(() => {
    localStorage.setItem('sb_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sb_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('sb_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('sb_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('sb_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Data Mutators
  const addProduct = (prod) => setProducts([prod, ...products]);
  const updateProductStock = (id, newStock) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const status = newStock === 0 ? "Out of Stock" : (newStock <= p.threshold ? "Low Stock" : "In Stock");
        return { ...p, stock: newStock, status };
      }
      return p;
    }));
  };

  const addSale = (sale) => setSales([sale, ...sales]);
  const addCustomer = (cust) => setCustomers([...customers, cust]);
  const updateCustomerCredit = (name, addedCredit) => {
    setCustomers(customers.map(c => c.name === name ? { ...c, credit: c.credit + addedCredit } : c));
  };
  const settleCredit = (id) => {
    const cust = customers.find(c => c.id === id);
    if (cust && cust.credit > 0) {
      const amt = parseFloat(prompt(`Enter settlement amount for ${cust.name}. Total: ₹${cust.credit}`)) || 0;
      if (amt > 0) {
        setCustomers(customers.map(c => c.id === id ? { ...c, credit: Math.max(0, c.credit - amt) } : c));
      }
    }
  };

  const addSupplier = (supp) => setSuppliers([...suppliers, supp]);
  const addExpense = (exp) => setExpenses([exp, ...expenses]);

  // Speech Text-to-Speech Engine
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const clean = text.replace(/₹/g, "Rupees ");
      const utterance = new SpeechSynthesisUtterance(clean);
      window.speechSynthesis.speak(utterance);
    }
  };

  const openAppView = (viewName) => {
    setShell('app');
    setView(viewName);
  };

  const openPublicView = (viewName) => {
    setShell('public');
    setView(viewName);
  };

  return (
    <div>
      {/* Offline Status Notice */}
      {isOffline && (
        <div style={{ background: 'var(--error-light)', color: 'var(--error)', borderBottom: '1px solid var(--error-border)', fontSize: '0.8rem', padding: '0.25rem 1rem', textAlign: 'center', fontWeight: 'bold' }}>
          Offline Mode Active — Sales will be saved locally.
        </div>
      )}

      {/* Public Landing Shell */}
      {shell === 'public' && (
        <Landing
          currentView={view}
          setView={openPublicView}
          onStartFree={() => setActiveModal('auth')}
        />
      )}

      {/* Authenticated Dashboard Shell */}
      {shell === 'app' && (
        <div className="app-shell">
          {/* Desktop/Tablet Sidebar */}
          <aside className="app-sidebar">
            <div className="sidebar-brand" style={{ cursor: 'pointer' }} onClick={() => openPublicView('landing')}>
              ShopBrain.
            </div>
            <ul className="sidebar-menu">
              <li><span className={`sidebar-link ${view === 'dashboard' ? 'active' : ''}`} onClick={() => openAppView('dashboard')}>🏠 {t('menu_dashboard')}</span></li>
              <li><span className={`sidebar-link ${view === 'billing' ? 'active' : ''}`} onClick={() => openAppView('billing')}>🧾 {t('menu_billing')}</span></li>
              <li><span className={`sidebar-link ${view === 'quick-sale' ? 'active' : ''}`} onClick={() => openAppView('quick-sale')}>🎙️ {t('menu_quicksale')}</span></li>
              <li><span className={`sidebar-link ${view === 'inventory' ? 'active' : ''}`} onClick={() => openAppView('inventory')}>📦 {t('menu_inventory')}</span></li>
              <li><span className={`sidebar-link ${view === 'ai-assistant' ? 'ai-active' : ''}`} onClick={() => openAppView('ai-assistant')}>✨ {t('menu_ai')}</span></li>

              {shopMode === 'supermarket' && (
                <>
                  <li><span className={`sidebar-link ${view === 'analytics' ? 'active' : ''}`} onClick={() => openAppView('analytics')}>📊 {t('menu_analytics')}</span></li>
                  <li><span className={`sidebar-link ${view === 'forecast' ? 'active' : ''}`} onClick={() => openAppView('forecast')}>📈 {t('menu_forecast')}</span></li>
                  <li><span className={`sidebar-link ${view === 'profit' ? 'active' : ''}`} onClick={() => openAppView('profit')}>💡 {t('menu_profit')}</span></li>
                  <li><span className={`sidebar-link ${view === 'customers' ? 'active' : ''}`} onClick={() => openAppView('customers')}>🤝 {t('menu_credit')}</span></li>
                  <li><span className={`sidebar-link ${view === 'suppliers' ? 'active' : ''}`} onClick={() => openAppView('suppliers')}>🚚 {t('menu_suppliers')}</span></li>
                  <li><span className={`sidebar-link ${view === 'expenses' ? 'active' : ''}`} onClick={() => openAppView('expenses')}>💳 {t('menu_expenses')}</span></li>
                </>
              )}

              <li><span className={`sidebar-link ${view === 'reports' ? 'active' : ''}`} onClick={() => openAppView('reports')}>📋 {t('menu_reports')}</span></li>
              <li><span className={`sidebar-link ${view === 'settings' ? 'active' : ''}`} onClick={() => openAppView('settings')}>⚙️ {t('menu_settings')}</span></li>
            </ul>

            <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 'bold' }}>{userProfile.name}</div>
              <div style={{ color: 'var(--slate-medium)', fontSize: '0.75rem' }}>{userProfile.shopName}</div>
            </div>
          </aside>

          {/* Right Content View Area */}
          <div className="app-main">
            <header className="app-header">
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{view.toUpperCase()}</span>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button className="lang-btn btn-sm" onClick={() => setActiveModal('lang-select')}>
                  🌐 {lang.toUpperCase()}
                </button>
                <button className="btn btn-outline btn-sm" onClick={() => openPublicView('landing')}>Public Site</button>
              </div>
            </header>

            <main style={{ flexGrow: 1, overflowY: 'auto' }}>
              {view === 'dashboard' && <Dashboard products={products} sales={sales} customers={customers} openAddProductModal={() => setActiveModal('add-product')} setAppView={openAppView} speakText={speakText} />}
              {view === 'billing' && <Billing products={products} customers={customers} addSale={addSale} showReceiptModal={(receipt) => { setActiveReceipt(receipt); setActiveModal('receipt'); }} updateProductStock={updateProductStock} updateCustomerCredit={updateCustomerCredit} />}
              {view === 'quick-sale' && <QuickSale products={products} addSale={addSale} updateProductStock={updateProductStock} />}
              {view === 'inventory' && <Inventory products={products} updateProductStock={updateProductStock} openAddProductModal={() => setActiveModal('add-product')} />}
              {view === 'ai-assistant' && <AIAssistant products={products} customers={customers} speakText={speakText} />}
              {view === 'analytics' && <Analytics sales={sales} />}
              {view === 'forecast' && <Forecast products={products} />}
              {view === 'profit' && <Profit products={products} />}
              {view === 'customers' && <Customers customers={customers} openAddCustomerModal={() => setActiveModal('add-customer')} settleCredit={settleCredit} />}
              {view === 'suppliers' && <Suppliers suppliers={suppliers} openAddSupplierModal={() => setActiveModal('add-supplier')} />}
              {view === 'expenses' && <Expenses expenses={expenses} openAddExpenseModal={() => setActiveModal('add-expense')} />}
              {view === 'reports' && <Reports />}
              {view === 'settings' && <Settings />}
            </main>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      {shell === 'app' && (
        <nav className="mobile-nav-bar">
          <div className={`mobile-nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => openAppView('dashboard')}>
            <span>🏠 Home</span>
          </div>
          <div className={`mobile-nav-item ${view === 'billing' ? 'active' : ''}`} onClick={() => openAppView('billing')}>
            <span>🧾 Billing</span>
          </div>
          <div className={`mobile-nav-item ${view === 'quick-sale' ? 'active' : ''}`} onClick={() => openAppView('quick-sale')}>
            <span>🎙️ Voice</span>
          </div>
          <div className={`mobile-nav-item ${view === 'inventory' ? 'active' : ''}`} onClick={() => openAppView('inventory')}>
            <span>📦 Stock</span>
          </div>
          <div className={`mobile-nav-item ${view === 'ai-assistant' ? 'active' : ''}`} onClick={() => openAppView('ai-assistant')}>
            <span>✨ AI</span>
          </div>
        </nav>
      )}

      {/* Modals Provider */}
      <Modals
        activeModal={activeModal}
        closeModal={() => setActiveModal(null)}
        addProduct={addProduct}
        customers={customers}
        suppliers={suppliers}
        addCustomer={addCustomer}
        addSupplier={addSupplier}
        addExpense={addExpense}
        activeReceipt={activeReceipt}
        offlineQueue={offlineQueue}
        toggleOfflineMode={() => setIsOffline(!isOffline)}
        isOffline={isOffline}
        onCompleteAuth={(viewName) => openAppView(viewName || 'dashboard')}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
