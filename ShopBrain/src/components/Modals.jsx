import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Modals = ({
  activeModal,
  closeModal,
  addProduct,
  customers,
  suppliers,
  addCustomer,
  addSupplier,
  addExpense,
  activeReceipt,
  offlineQueue,
  toggleOfflineMode,
  isOffline,
  onCompleteAuth
}) => {
  const { lang, setLang, shopMode, setShopMode, userProfile, setUserProfile } = useLanguage();

  // Signup flow local state
  const [signupStep, setSignupStep] = useState(1);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'login'
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [shopNameInput, setShopNameInput] = useState(userProfile.shopName);
  const [tempShopType, setTempShopType] = useState(shopMode);
  const [tempLang, setTempLang] = useState(lang);

  // New Product form local state
  const [prodName, setProdName] = useState('');
  const [prodCat, setProdCat] = useState('Dairy');
  const [prodBarcode, setProdBarcode] = useState('');
  const [prodPurchase, setProdPurchase] = useState('');
  const [prodSelling, setProdSelling] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodThreshold, setProdThreshold] = useState('5');
  const [prodExpiry, setProdExpiry] = useState('');

  // Customer form
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custCredit, setCustCredit] = useState('0');
  const [custDue, setCustDue] = useState('');

  // Supplier form
  const [suppName, setSuppName] = useState('');
  const [suppPerson, setSuppPerson] = useState('');
  const [suppPhone, setSuppPhone] = useState('');
  const [suppCat, setSuppCat] = useState('');
  const [suppBal, setSuppBal] = useState('0');

  // Expense form
  const [expAmt, setExpAmt] = useState('');
  const [expCat, setExpCat] = useState('Rent');
  const [expNotes, setExpNotes] = useState('');
  const [expPay, setExpPay] = useState('Cash');

  if (!activeModal) return null;

  // Handle product submission
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!prodName || !prodSelling) {
      alert("Product Name and Selling Price are required!");
      return;
    }
    const stockVal = parseInt(prodStock) || 0;
    const threshVal = parseInt(prodThreshold) || 5;

    const newProd = {
      id: String(1000 + Math.floor(Math.random() * 9000)),
      barcode: prodBarcode || String(Math.floor(100000 + Math.random() * 900000)),
      name: prodName,
      category: prodCat,
      stock: stockVal,
      purchasePrice: parseFloat(prodPurchase) || 0,
      sellingPrice: parseFloat(prodSelling) || 0,
      threshold: threshVal,
      status: stockVal === 0 ? "Out of Stock" : (stockVal <= threshVal ? "Low Stock" : "In Stock"),
      expiryDate: prodExpiry || "N/A"
    };

    addProduct(newProd);
    closeModal();
    setProdName('');
    setProdBarcode('');
    setProdPurchase('');
    setProdSelling('');
    setProdStock('');
    alert("New product saved successfully!");
  };

  // Complete Signup & Route to Dashboard
  const handleFinishSignup = () => {
    setUserProfile({
      name: nameInput || "Ramesh Kumar",
      shopName: shopNameInput || "Ramesh Store",
      onboarded: true
    });
    setShopMode(tempShopType);
    setLang(tempLang);
    closeModal();

    // Directly navigate into the App Dashboard
    if (onCompleteAuth) {
      onCompleteAuth('dashboard');
    }
  };

  // Fast Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      onboarded: true
    });
    closeModal();

    if (onCompleteAuth) {
      onCompleteAuth('dashboard');
    }
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (!custName || !custPhone) {
      alert("Customer name and phone are required!");
      return;
    }
    addCustomer({
      id: `c${Date.now()}`,
      name: custName,
      phone: custPhone,
      credit: parseFloat(custCredit) || 0,
      lastTx: new Date().toISOString().split('T')[0],
      due: custDue || "N/A",
      status: parseFloat(custCredit) > 0 ? "Active" : "Cleared"
    });
    closeModal();
    setCustName('');
    setCustPhone('');
  };

  const handleSupplierSubmit = (e) => {
    e.preventDefault();
    if (!suppName) return;
    addSupplier({
      id: `s${Date.now()}`,
      name: suppName,
      person: suppPerson,
      phone: suppPhone,
      categories: suppCat,
      balance: parseFloat(suppBal) || 0,
      rank: "Excellent (5.0)"
    });
    closeModal();
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expAmt) return;
    addExpense({
      date: new Date().toISOString().split('T')[0],
      category: expCat,
      amount: parseFloat(expAmt) || 0,
      notes: expNotes,
      paymentType: expPay
    });
    closeModal();
  };

  return (
    <>
      {/* AUTH & ONBOARDING MODAL */}
      {activeModal === 'auth' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{authMode === 'login' ? 'Log In to ShopBrain' : 'Sign Up to ShopBrain'}</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <label className="form-label">Phone Number / Mobile</label>
                    <input type="text" className="form-control" placeholder="Enter 10-digit number..." required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="••••••••" required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Log In</button>
                  <p style={{ fontSize: '0.8rem', textAlign: 'center', marginTop: '1rem', color: 'var(--slate-medium)' }}>
                    Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setAuthMode('signup'); setSignupStep(1); }}>Sign Up</a>
                  </p>
                </form>
              ) : (
                <>
                  {signupStep === 1 && (
                    <div>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="Ramesh Kumar..." />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Mobile Number</label>
                        <input type="text" className="form-control" placeholder="9876543210" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="••••••••" />
                      </div>
                      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSignupStep(2)}>Continue to Shop Setup</button>
                      <p style={{ fontSize: '0.8rem', textAlign: 'center', marginTop: '1rem', color: 'var(--slate-medium)' }}>
                        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setAuthMode('login'); }}>Log In</a>
                      </p>
                    </div>
                  )}

                  {signupStep === 2 && (
                    <div>
                      <label className="form-label" style={{ textAlign: 'center', fontSize: '1rem', marginBottom: '1rem' }}>What type of shop do you run?</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div 
                          className={`card ${tempShopType === 'small-shop' ? 'selected' : ''}`}
                          style={{ border: tempShopType === 'small-shop' ? '2px solid var(--primary)' : '1px solid var(--border-color)', background: tempShopType === 'small-shop' ? 'var(--primary-light)' : 'white', cursor: 'pointer', textAlign: 'center', padding: '1rem' }}
                          onClick={() => setTempShopType('small-shop')}
                        >
                          <div style={{ fontSize: '2rem' }}>📱</div>
                          <div style={{ fontWeight: 'bold' }}>Small Shop</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--slate-medium)' }}>Kirana, petty stalls, simple smartphone billing.</div>
                        </div>
                        <div 
                          className={`card ${tempShopType === 'supermarket' ? 'selected' : ''}`}
                          style={{ border: tempShopType === 'supermarket' ? '2px solid var(--ai-purple)' : '1px solid var(--border-color)', background: tempShopType === 'supermarket' ? 'var(--ai-purple-light)' : 'white', cursor: 'pointer', textAlign: 'center', padding: '1rem' }}
                          onClick={() => setTempShopType('supermarket')}
                        >
                          <div style={{ fontSize: '2rem' }}>🏬</div>
                          <div style={{ fontWeight: 'bold' }}>Supermarket</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--slate-medium)' }}>Computers, barcode scanners, multi-counter.</div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Shop Name</label>
                        <input type="text" className="form-control" value={shopNameInput} onChange={e => setShopNameInput(e.target.value)} placeholder="Ramesh Store..." />
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setSignupStep(1)}>Back</button>
                        <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setSignupStep(3)}>Next Step</button>
                      </div>
                    </div>
                  )}

                  {signupStep === 3 && (
                    <div>
                      <label className="form-label" style={{ textAlign: 'center', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Choose your Preferred Language</label>
                      
                      {/* LANGUAGE SELECTION GRID WITH GREEN HIGHLIGHTING */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {[
                          { code: 'en', label: 'English' },
                          { code: 'ta', label: 'Tamil (தமிழ்)' },
                          { code: 'hi', label: 'Hindi (हिन्दी)' },
                          { code: 'te', label: 'Telugu (తెలుగు)' },
                          { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
                          { code: 'ml', label: 'Malayalam (മലയാളം)' },
                          { code: 'bn', label: 'Bengali (বাংলা)' },
                          { code: 'mr', label: 'Marathi (मराठी)' }
                        ].map(item => (
                          <button
                            key={item.code}
                            type="button"
                            className={`lang-btn ${tempLang === item.code ? 'selected' : ''}`}
                            onClick={() => setTempLang(item.code)}
                          >
                            {tempLang === item.code ? `✓ ${item.label}` : item.label}
                          </button>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setSignupStep(2)}>Back</button>
                        <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleFinishSignup}>Finish Setup</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LANGUAGE SELECTOR MODAL */}
      {activeModal === 'lang-select' && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h3>Select Preferred Language</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { code: 'en', label: 'English' },
                  { code: 'ta', label: 'Tamil (தமிழ்)' },
                  { code: 'hi', label: 'Hindi (हिन्दी)' },
                  { code: 'te', label: 'Telugu (తెలుగు)' },
                  { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
                  { code: 'ml', label: 'Malayalam (മലയാളം)' },
                  { code: 'bn', label: 'Bengali (বাংলা)' },
                  { code: 'mr', label: 'Marathi (मराठी)' }
                ].map(item => (
                  <button
                    key={item.code}
                    type="button"
                    className={`lang-btn ${lang === item.code ? 'selected' : ''}`}
                    onClick={() => { setLang(item.code); closeModal(); }}
                  >
                    {lang === item.code ? `✓ ${item.label}` : item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {activeModal === 'add-product' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>

            <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input type="text" className="form-control" value={prodName} onChange={e => setProdName(e.target.value)} placeholder="e.g. Milk, Biscuit..." required />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-control" value={prodCat} onChange={e => setProdCat(e.target.value)}>
                    <option value="Dairy">Dairy</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Bakery">Bakery</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Barcode ID</label>
                  <input type="text" className="form-control" value={prodBarcode} onChange={e => setProdBarcode(e.target.value)} placeholder="234..." />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Purchase Price (₹)</label>
                    <input type="number" className="form-control" value={prodPurchase} onChange={e => setProdPurchase(e.target.value)} placeholder="50" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Selling Price (₹) *</label>
                    <input type="number" className="form-control" value={prodSelling} onChange={e => setProdSelling(e.target.value)} placeholder="52" required />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Initial Stock Count</label>
                    <input type="number" className="form-control" value={prodStock} onChange={e => setProdStock(e.target.value)} placeholder="10" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Warning Threshold</label>
                    <input type="number" className="form-control" value={prodThreshold} onChange={e => setProdThreshold(e.target.value)} placeholder="5" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Expiry Date</label>
                  <input type="date" className="form-control" value={prodExpiry} onChange={e => setProdExpiry(e.target.value)} />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECEIPT PREVIEW MODAL */}
      {activeModal === 'receipt' && activeReceipt && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h3>Invoice Receipt</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body" style={{ background: '#fff', fontFamily: 'monospace', fontSize: '0.85rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2 style={{ margin: 0 }}>{userProfile.shopName}</h2>
                <p>GSTIN: 33AAAAA1111A1Z1</p>
                <hr style={{ border: 'none', borderTop: '1px dashed #000', margin: '0.5rem 0' }} />
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <div>Bill ID: {activeReceipt.id}</div>
                <div>Customer: {activeReceipt.customer}</div>
                <div>Date: {new Date(activeReceipt.date).toLocaleString()}</div>
                <hr style={{ border: 'none', borderTop: '1px dashed #000', margin: '0.5rem 0' }} />
              </div>
              {activeReceipt.items.map((itm, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{itm.name} (x{itm.qty})</span>
                  <span>₹{itm.sellingPrice * itm.qty}</span>
                </div>
              ))}
              <hr style={{ border: 'none', borderTop: '1px dashed #000', margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1rem' }}>
                <span>TOTAL:</span>
                <span>₹{activeReceipt.grandTotal}</span>
              </div>
            </div>
            <div className="modal-footer" style={{ flexDirection: 'column' }}>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { alert("Receipt sent via WhatsApp!"); closeModal(); }}>Share over WhatsApp</button>
              <button className="btn btn-outline" style={{ width: '100%' }} onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD CUSTOMER MODAL */}
      {activeModal === 'add-customer' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Customer Credit Account</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleCustomerSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Customer Name *</label>
                  <input type="text" className="form-control" value={custName} onChange={e => setCustName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="text" className="form-control" value={custPhone} onChange={e => setCustPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Initial Credit (₹)</label>
                  <input type="number" className="form-control" value={custCredit} onChange={e => setCustCredit(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-control" value={custDue} onChange={e => setCustDue(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SUPPLIER MODAL */}
      {activeModal === 'add-supplier' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Supplier</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSupplierSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Supplier Name</label>
                  <input type="text" className="form-control" value={suppName} onChange={e => setSuppName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Person</label>
                  <input type="text" className="form-control" value={suppPerson} onChange={e => setSuppPerson(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-control" value={suppPhone} onChange={e => setSuppPhone(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Categories</label>
                  <input type="text" className="form-control" value={suppCat} onChange={e => setSuppCat(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Supplier</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD EXPENSE MODAL */}
      {activeModal === 'add-expense' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Record Expense</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleExpenseSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Expense Amount (₹) *</label>
                  <input type="number" className="form-control" value={expAmt} onChange={e => setExpAmt(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-control" value={expCat} onChange={e => setExpCat(e.target.value)}>
                    <option value="Rent">Rent</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Transport">Transport</option>
                    <option value="Stock purchases">Stock purchases</option>
                    <option value="Employee wages">Employee wages</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <input type="text" className="form-control" value={expNotes} onChange={e => setExpNotes(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
