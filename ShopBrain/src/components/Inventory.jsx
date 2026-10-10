import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Inventory = ({ products, updateProductStock, openAddProductModal }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = products.filter(p => {
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.barcode.includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  const handleAddStockPrompt = (product) => {
    const qty = parseInt(prompt(`Add stock for ${product.name}. Current count: ${product.stock}`)) || 0;
    if (qty > 0) {
      updateProductStock(product.id, product.stock + qty);
    }
  };

  return (
    <div className="view-app">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexGrow: 1, maxWidth: '600px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or barcode..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <select
            className="form-control"
            style={{ width: '160px' }}
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Dairy">Dairy</option>
            <option value="Snacks">Snacks</option>
            <option value="Grocery">Grocery</option>
            <option value="Bakery">Bakery</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={openAddProductModal}>
          + {t('btn_addproduct')}
        </button>
      </div>

      <div className="table-responsive">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Barcode</th>
              <th>Product Name</th>
              <th>Category</th>
              <th style={{ textAlign: 'right' }}>Stock Count</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Purchase (₹)</th>
              <th style={{ textAlign: 'right' }}>Selling (₹)</th>
              <th style={{ textAlign: 'right' }}>Margin</th>
              <th>Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const marginPct = Math.round(((p.sellingPrice - p.purchasePrice) / p.sellingPrice) * 100);
              let statusBadge = "badge-success";
              if (p.status === "Low Stock") statusBadge = "badge-warning";
              if (p.status === "Out of Stock") statusBadge = "badge-danger";

              return (
                <tr key={p.id}>
                  <td><code>{p.barcode}</code></td>
                  <td><strong>{p.name}</strong></td>
                  <td><span className="badge badge-info">{p.category}</span></td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{p.stock} units</td>
                  <td><span className={`badge ${statusBadge}`}>{p.status}</span></td>
                  <td style={{ textAlign: 'right' }}>₹{p.purchasePrice}</td>
                  <td style={{ textAlign: 'right' }}>₹{p.sellingPrice}</td>
                  <td style={{ textAlign: 'right', color: 'var(--primary)', fontWeight: 'bold' }}>{marginPct}%</td>
                  <td>{p.expiryDate || "N/A"}</td>
                  <td>
                    <button className="btn btn-sm btn-outline" onClick={() => handleAddStockPrompt(p)}>+ Add Stock</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
