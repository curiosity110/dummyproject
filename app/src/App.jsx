import React, { useState } from 'react';
import { getRestaurants } from '~adapters/serpapi.adapter.js';
import { auditSeo } from '~adapters/openai.adapter.js';
import { uploadToDrive } from '~adapters/drive.adapter.js';
import { sendWhatsApp } from '~adapters/whatsapp.adapter.js';
import { mockSiteHtml } from './mock/siteHtml.js';
import { saveAsExcel } from './utils/excel.js';

const defaultCity = 'Strumica';
const defaultCountry = 'North Macedonia';

export default function App() {
  const [city, setCity] = useState(defaultCity);
  const [country, setCountry] = useState(defaultCountry);
  const [leads, setLeads] = useState([]);
  const [toast, setToast] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const runDemo = async () => {
    const results = await getRestaurants();
    const shuffled = [...results].sort(() => Math.random() - 0.5);
    const enriched = await Promise.all(
      shuffled.map(async r => {
        const html = mockSiteHtml[r.website] || '';
        const mailto = html.match(/mailto:([^"'>]+)/i);
        const textEmail = html.match(/[\w.-]+@[\w.-]+\.[A-Za-z]{2,}/i);
        const email = mailto ? mailto[1] : (textEmail ? textEmail[0] : null);
        const audit = await auditSeo(r.website);
        return {
          ...r,
          email,
          city,
          country,
          seoIssues: audit.issues,
          proposedFixes: audit.fixes,
          auditedAt: new Date().toISOString(),
          approved: false
        };
      })
    );
    setLeads(enriched);
    setUploaded(false);
    setToast('Demo data loaded');
    setTimeout(() => setToast(''), 2000);
  };

  const exportExcel = () => {
    saveAsExcel(leads, city, country);
  };

  const upload = async () => {
    setUploading(true);
    setUploaded(false);
    await uploadToDrive();
    setUploading(false);
    setUploaded(true);
  };

  const handleSend = async (lead) => {
    const message = `Hello ${lead.name}, we found SEO issues on ${lead.website}: ${lead.seoIssues.join(', ')}. We can help fix them.`;
    await sendWhatsApp(lead.phone, message);
    alert(`WhatsApp to ${lead.phone}:\n${message}`);
  };

  const toggleApprove = (idx) => {
    const updated = [...leads];
    updated[idx].approved = !updated[idx].approved;
    setLeads(updated);
  };

  return (
    <div className="container">
      <h1>Restaurant LeadGen Demo</h1>
      <div className="controls">
        <input value={city} onChange={e => setCity(e.target.value)} />
        <input value={country} onChange={e => setCountry(e.target.value)} />
        <button onClick={runDemo}>Run Demo</button>
        <button onClick={exportExcel} disabled={!leads.length}>Export Excel</button>
        <button onClick={upload} disabled={!leads.length || uploading}>{uploading ? 'Uploading…' : uploaded ? 'Uploaded ✓' : 'Upload to Drive (Demo)'}</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Business Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Website</th>
            <th>SEO Issues</th>
            <th>Proposed Fixes</th>
            <th>Approve</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <tr key={lead.website}>
              <td>{lead.name}</td>
              <td>{lead.address}</td>
              <td>{lead.phone}</td>
              <td>{lead.email || '—'}</td>
              <td><a href={lead.website} target="_blank" rel="noreferrer">{lead.website}</a></td>
              <td>{lead.seoIssues.join(', ')}</td>
              <td>{lead.proposedFixes.join(', ')}</td>
              <td><input type="checkbox" checked={lead.approved} onChange={() => toggleApprove(idx)} /></td>
              <td>
                <button onClick={() => handleSend(lead)} disabled={!lead.approved}>Send WhatsApp</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
