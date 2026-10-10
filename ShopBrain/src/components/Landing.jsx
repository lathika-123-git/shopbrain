import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Landing = ({ onStartFree, currentView, setView }) => {
  const { t } = useLanguage();

  return (
    <div className="view-public">
      {/* Public Header Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--border-color)', height: '70px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', fontSize: '1.4rem', color: 'var(--dark-navy)', cursor: 'pointer' }} onClick={() => setView('landing')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3"><path d="M2 20h20M5 17V5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v12M9 22V12h6v10"/></svg>
            ShopBrain<span style={{ color: 'var(--primary)' }}>.</span>
          </div>

          <nav style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ fontWeight: 600, color: currentView === 'landing' ? 'var(--primary)' : 'var(--slate-medium)', cursor: 'pointer' }} onClick={() => setView('landing')}>Home</span>
            <span style={{ fontWeight: 600, color: currentView === 'features' ? 'var(--primary)' : 'var(--slate-medium)', cursor: 'pointer' }} onClick={() => setView('features')}>Features</span>
            <span style={{ fontWeight: 600, color: currentView === 'how-it-works' ? 'var(--primary)' : 'var(--slate-medium)', cursor: 'pointer' }} onClick={() => setView('how-it-works')}>How It Works</span>
            <span style={{ fontWeight: 600, color: currentView === 'pricing' ? 'var(--primary)' : 'var(--slate-medium)', cursor: 'pointer' }} onClick={() => setView('pricing')}>Pricing</span>
          </nav>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline btn-sm" onClick={onStartFree}>Log In</button>
            <button className="btn btn-primary btn-sm" onClick={onStartFree}>Start Free</button>
          </div>
        </div>
      </header>

      {/* 1. LANDING / HERO PAGE */}
      {currentView === 'landing' && (
        <>
          <div style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '3.5rem', lineHeight: 1.15, marginBottom: '1.5rem' }}>
                Your Shop.<br />Your Language.<br />
                <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your AI.</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--slate-medium)', marginBottom: '2rem', lineHeight: 1.6 }}>
                Manage inventory, billing, sales and business decisions with an AI assistant built for every retailer. Designed for roadside shops to multi-branch supermarket chains.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                <button className="btn btn-primary btn-lg" onClick={onStartFree}>Start Free Now</button>
                <button className="btn btn-outline btn-lg" onClick={() => setView('how-it-works')}>See How It Works</button>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--slate-medium)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Ask in your own language:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', background: 'white', border: '1px solid var(--border-color)', borderRadius: '9999px' }}>Tamil: “நாளைக்கு என்ன வாங்கணும்?”</span>
                  <span style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', background: 'white', border: '1px solid var(--border-color)', borderRadius: '9999px' }}>Hindi: “मेरे स्टॉक में क्या कम है?”</span>
                  <span style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem', background: 'white', border: '1px solid var(--border-color)', borderRadius: '9999px' }}>English: “Which products are selling fastest?”</span>
                </div>
              </div>
            </div>

            {/* Smartphone Graphic Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: 'var(--dark-navy)', borderRadius: '24px', padding: '0.6rem', border: '4px solid var(--slate-dark)', boxShadow: 'var(--shadow-premium)', maxWidth: '340px', width: '100%' }}>
                <div style={{ background: 'var(--bg-light)', borderRadius: '16px', padding: '0.875rem', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                    <span>ShopBrain AI</span>
                    <span>10:42 AM</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ background: 'white', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <div style={{ color: 'var(--slate-medium)', fontSize: '0.65rem' }}>Today's Sales</div>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--primary)' }}>₹4,850</div>
                    </div>
                    <div style={{ background: 'white', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <div style={{ color: 'var(--slate-medium)', fontSize: '0.65rem' }}>Low Stock</div>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--error)' }}>08 Items</div>
                    </div>
                  </div>
                  <div style={{ background: 'var(--ai-purple-light)', border: '1px solid var(--ai-purple-border)', borderRadius: '6px', padding: '0.625rem', marginBottom: '0.75rem' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--ai-purple)', fontSize: '0.7rem' }}>ShopBrain AI Assistant</div>
                    <div style={{ fontStyle: 'italic', margin: '0.25rem 0' }}>"என்ன stock குறைவா இருக்கு?"</div>
                    <div style={{ fontWeight: 600 }}>"Milk, Biscuit and Bread levels are low. Order 25 packets of Milk."</div>
                  </div>
                  <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={onStartFree}>Open Demo Counter</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 2. DEDICATED FEATURES PAGE */}
      {currentView === 'features' && (
        <div style={{ maxWidth: '1200px', margin: '3rem auto 5rem auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem' }}>Full Capabilities</span>
            <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Features Built for Every Retailer</h1>
            <p style={{ color: 'var(--slate-medium)', fontSize: '1.1rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
              Whether you operate a small kirana stall or a multi-counter supermarket, ShopBrain adapts to your hardware and language.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎙️</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Voice & Text AI Billing</h3>
              <p style={{ color: 'var(--slate-medium)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Dictate sales in Tamil, Hindi, English, Telugu, Kannada, Malayalam, Bengali, or Marathi. Say "2 milk, 1 biscuit sold" to bill in seconds.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Smart Inventory Management</h3>
              <p style={{ color: 'var(--slate-medium)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Real-time stock deduction during billing. Automated warnings when items reach minimum threshold limits before you run out.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧾</div>
              <h3 style={{ marginBottom: '0.5rem' }}>POS & Barcode Billing</h3>
              <p style={{ color: 'var(--slate-medium)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Scan barcodes with external scanners or mobile camera. Generate instant invoices, compute 18% GST, and share bills via WhatsApp.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
              <h3 style={{ marginBottom: '0.5rem' }}>AI Demand Forecasting</h3>
              <p style={{ color: 'var(--slate-medium)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                ShopBrain evaluates 30-day sales velocity to predict stockout dates and generate wholesale reorder quantities automatically.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Customer Credit (Khata)</h3>
              <p style={{ color: 'var(--slate-medium)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Keep complete digital customer ledger accounts. Record partial credit payments, track due dates, and view outstanding balances via voice.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌐</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Offline & Low-Network Mode</h3>
              <p style={{ color: 'var(--slate-medium)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Works seamlessly without internet. Record sales offline, store transactions locally, and auto-sync when network returns.
              </p>
            </div>
          </div>

          {/* Mode Comparison Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>📱 Small Shop Mode</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li><strong>Smartphone-first Navigation:</strong> Large touch targets and minimal text.</li>
                <li><strong>Voice Sale Counter:</strong> Dictate morning or evening batch sales instantly.</li>
                <li><strong>Khata Ledger:</strong> Direct balance lookup in local regional language.</li>
                <li><strong>Stock Alerts:</strong> Audio notifications when milk or bread is running low.</li>
              </ul>
            </div>
            <div className="card" style={{ borderLeft: '4px solid var(--ai-purple)' }}>
              <h3 style={{ color: 'var(--ai-purple)', marginBottom: '1rem' }}>🏬 Supermarket Mode</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li><strong>Multi-counter Sync:</strong> Connect multiple billing screens simultaneously.</li>
                <li><strong>Barcode Scanner Integration:</strong> Ultra-fast cashier scanning checkout.</li>
                <li><strong>Supplier Purchase Orders:</strong> Generate supplier invoices and track balances.</li>
                <li><strong>Advanced Analytics:</strong> Product-wise profit margins and expense tracking.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. DEDICATED HOW IT WORKS PAGE */}
      {currentView === 'how-it-works' && (
        <div style={{ maxWidth: '1000px', margin: '3rem auto 5rem auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem' }}>Step-by-Step Flow</span>
            <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>How ShopBrain Works in 5 Steps</h1>
            <p style={{ color: 'var(--slate-medium)', fontSize: '1.1rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
              From initial product entry to automated AI restock recommendations.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { num: "1", title: "Add Your Products", desc: "Scan product barcodes or enter product name, purchase price, selling price, and initial stock count.", icon: "📦" },
              { num: "2", title: "Record Sales easily", desc: "Scan barcode at counter, search product name, or speak voice commands like '2 milk, 1 biscuit sold'.", icon: "🧾" },
              { num: "3", title: "Automatic Database Updates", desc: "ShopBrain automatically updates stock levels, revenue, gross profit, and customer credit ledgers with zero manual effort.", icon: "⚡" },
              { num: "4", title: "AI Business Analysis", desc: "The AI engine evaluates daily sales velocity, calculates profit margins per item, and monitors product expiry dates.", icon: "🧠" },
              { num: "5", title: "Smart Recommendations & Action", desc: "Get voice or text alerts in your native language: 'Buy 25 packets of Milk tomorrow to avoid running out.'", icon: "🚀" }
            ].map(step => (
              <div key={step.num} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0, border: '1px solid var(--primary-border)', justifyContent: 'center' }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{step.icon}</span> {step.title}
                  </h3>
                  <p style={{ color: 'var(--slate-medium)', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn btn-primary btn-lg" onClick={onStartFree}>Try ShopBrain Demo Now</button>
          </div>
        </div>
      )}

      {/* 4. DEDICATED PRICING PAGE */}
      {currentView === 'pricing' && (
        <div style={{ maxWidth: '1200px', margin: '3rem auto 5rem auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem' }}>Clear & Transparent</span>
            <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>Simple Plans for Every Shop Size</h1>
            <p style={{ color: 'var(--slate-medium)', fontSize: '1.1rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
              No hidden hardware costs or setup fees. Cancel anytime.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {/* Small Shop */}
            <div className="card">
              <h3>Small Shop</h3>
              <p style={{ color: 'var(--slate-medium)', fontSize: '0.85rem', margin: '0.25rem 0' }}>For single kirana shops, petty stalls, mobile billing.</p>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--dark-navy)', margin: '1rem 0' }}>₹299<span style={{ fontSize: '1rem', color: 'var(--slate-medium)' }}>/month</span></div>
              <button className="btn btn-outline" style={{ width: '100%', marginBottom: '1.5rem' }} onClick={onStartFree}>Start Small Shop Plan</button>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li>✔️ Voice billing (dictate sales)</li>
                <li>✔️ 8 regional languages support</li>
                <li>✔️ Stock alert warnings</li>
                <li>✔️ Customer credit tracker (Khata)</li>
                <li>✔️ Offline mode local storage</li>
              </ul>
            </div>

            {/* Retail Store */}
            <div className="card" style={{ border: '2px solid var(--primary)', position: 'relative' }}>
              <span className="badge badge-success" style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>Most Popular</span>
              <h3>Retail Store</h3>
              <p style={{ color: 'var(--slate-medium)', fontSize: '0.85rem', margin: '0.25rem 0' }}>For grocery stores and hardware outlets.</p>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--dark-navy)', margin: '1rem 0' }}>₹799<span style={{ fontSize: '1rem', color: 'var(--slate-medium)' }}>/month</span></div>
              <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }} onClick={onStartFree}>Start Retail Store Plan</button>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li>✔️ Everything in Small Shop</li>
                <li>✔️ Barcode scanner integration</li>
                <li>✔️ Supplier purchase order bills</li>
                <li>✔️ Advanced profit margin insights</li>
                <li>✔️ 2 simultaneous billing counters</li>
              </ul>
            </div>

            {/* Supermarket */}
            <div className="card">
              <h3>Supermarket / Chain</h3>
              <p style={{ color: 'var(--slate-medium)', fontSize: '0.85rem', margin: '0.25rem 0' }}>For supermarkets and multi-branch chains.</p>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--dark-navy)', margin: '1rem 0' }}>₹1,999<span style={{ fontSize: '1rem', color: 'var(--slate-medium)' }}>/month</span></div>
              <button className="btn btn-outline" style={{ width: '100%', marginBottom: '1.5rem' }} onClick={onStartFree}>Start Supermarket Plan</button>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li>✔️ Everything in Retail Store</li>
                <li>✔️ Unlimited billing counters</li>
                <li>✔️ Multi-branch dashboard sync</li>
                <li>✔️ Employee shift permissions</li>
                <li>✔️ Custom tax & GST reports</li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem' }}>Do I need a computer or barcode scanner to use ShopBrain?</h4>
                <p style={{ color: 'var(--slate-medium)', fontSize: '0.9rem' }}>No! Small Shop Mode works completely on any Android or iOS smartphone using touch and voice inputs.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem' }}>Which regional languages are supported?</h4>
                <p style={{ color: 'var(--slate-medium)', fontSize: '0.9rem' }}>ShopBrain supports Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi, and English for both text UI and voice interaction.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem' }}>What happens if the internet goes down?</h4>
                <p style={{ color: 'var(--slate-medium)', fontSize: '0.9rem' }}>ShopBrain automatically switches to Offline Mode. All sales are saved safely on your device and automatically sync when internet connection returns.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Public Footer */}
      <footer style={{ background: 'var(--slate-dark)', color: 'white', padding: '3rem 1.5rem', textAlign: 'center', marginTop: '4rem' }}>
        <p>&copy; 2026 ShopBrain Technologies Private Limited. All rights reserved.</p>
      </footer>
    </div>
  );
};
