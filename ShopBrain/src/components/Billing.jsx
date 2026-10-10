import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Billing = ({ products, customers, addSale, showReceiptModal, updateProductStock, updateCustomerCredit }) => {
  const { t } = useLanguage();
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [discount, setDiscount] = useState(0);

  const addToCart = (product) => {
    if (product.stock === 0) {
      alert("Product is out of stock!");
      return;
    }

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty >= product.stock) {
        alert("Cannot add more than available stock!");
        return;
      }
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existing = cart.find(item => item.id === productId);
    if (existing.qty === 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => item.id === productId ? { ...item, qty: item.qty - 1 } : item));
    }
  };

  const clearCart = () => setCart([]);

  // Calculate cart totals
  let subtotal = 0;
  let purchaseCost = 0;
  cart.forEach(item => {
    subtotal += item.sellingPrice * item.qty;
    purchaseCost += item.purchasePrice * item.qty;
  });

  const tax = Math.round(subtotal * 0.18);
  const grandTotal = Math.max(0, subtotal + tax - (parseFloat(discount) || 0));
  const profit = Math.max(0, grandTotal - purchaseCost);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Shopping cart is empty!");
      return;
    }

    const billObj = {
      id: `SB-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString(),
      items: [...cart],
      subtotal,
      tax,
      discount: parseFloat(discount) || 0,
      grandTotal,
      profit,
      paymentMethod,
      customer: selectedCustomer || "Walk-in"
    };

    addSale(billObj);

    // Update stock levels
    cart.forEach(item => {
      updateProductStock(item.id, item.stock - item.qty);
    });

    // Update credit ledger if Credit method selected
    if (paymentMethod === 'Credit' && selectedCustomer) {
      updateCustomerCredit(selectedCustomer, grandTotal);
    }

    showReceiptModal(billObj);
    clearCart();
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.barcode.includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="view-app">
      <div className="billing-split">
        {/* Left Side: Product Selector */}
        <div>
          <div className="card" style={{ marginBottom: '1rem', padding: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search products or barcode..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
              {['All', 'Dairy', 'Snacks', 'Grocery', 'Bakery'].map(cat => (
                <span
                  key={cat}
                  className={`badge ${categoryFilter === cat ? 'badge-success' : 'badge-info'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="product-catalog-grid">
            {filteredProducts.map(p => (
              <div
                key={p.id}
                className="catalog-item-card"
                style={{ opacity: p.stock === 0 ? 0.5 : 1 }}
                onClick={() => addToCart(p)}
              >
                <div style={{ fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{p.name}</div>
                <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>₹{p.sellingPrice}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--slate-medium)' }}>
                  {p.stock === 0 ? <span style={{ color: 'var(--error)', fontWeight: 'bold' }}>SOLD OUT</span> : `${p.stock} units`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Cart Checkout */}
        <div className="checkout-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <h3>Shopping Cart</h3>
            <button className="btn btn-sm btn-outline" style={{ color: 'var(--error)' }} onClick={clearCart}>Clear</button>
          </div>

          <div style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {cart.length === 0 ? (
              <div style={{ color: 'var(--slate-medium)', textAlignment: 'center', padding: '2rem 0', fontSize: '0.9rem', textAlign: 'center' }}>
                Cart is empty. Tap products to add.
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', borderBottom: '1px solid var(--bg-light)', paddingBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-medium)' }}>₹{item.sellingPrice} each</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button className="btn btn-sm btn-outline" style={{ width: '24px', height: '24px', padding: 0 }} onClick={() => removeFromCart(item.id)}>-</button>
                    <span style={{ fontWeight: 'bold' }}>{item.qty}</span>
                    <button className="btn btn-sm btn-outline" style={{ width: '24px', height: '24px', padding: 0 }} onClick={() => addToCart(item)}>+</button>
                    <span style={{ width: '60px', textAlign: 'right', fontWeight: 'bold' }}>₹{item.sellingPrice * item.qty}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Customer Selection */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Customer (Optional for Credit)</label>
            <select
              className="form-control"
              value={selectedCustomer}
              onChange={e => setSelectedCustomer(e.target.value)}
            >
              <option value="">-- Cash / Walk-in Customer --</option>
              {customers.map(c => (
                <option key={c.id} value={c.name}>{c.name} (Credit: ₹{c.credit})</option>
              ))}
            </select>
          </div>

          {/* Cart Summary */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{t('subtotal_lbl')}</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>GST (18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{t('discount_lbl')}</span>
              <input type="number" className="form-control" style={{ width: '80px', padding: '0.2rem', textAlign: 'right', fontSize: '0.8rem' }} value={discount} onChange={e => setDiscount(e.target.value)} min="0" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 'bold', borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
              <span>{t('total_lbl')}</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Payment Method</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {['Cash', 'UPI', 'Card'].map(method => (
                <button
                  key={method}
                  className={`btn btn-sm ${paymentMethod === method ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setPaymentMethod(method)}
                >
                  {method}
                </button>
              ))}
              {selectedCustomer && (
                <button
                  className={`btn btn-sm ${paymentMethod === 'Credit' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setPaymentMethod('Credit')}
                  style={{ gridColumn: 'span 3' }}
                >
                  🤝 Add to Customer Credit ({selectedCustomer})
                </button>
              )}
            </div>
          </div>

          <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={handleCheckout}>
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};
