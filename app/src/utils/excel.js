import { utils, writeFileXLSX } from 'xlsx';

export function saveAsExcel(leads, city, country) {
  if (!leads.length) return;
  const data = leads.map(l => ({
    'Business Name': l.name,
    'Address': l.address,
    'Phone': l.phone,
    'Email': l.email || '',
    'Website': l.website,
    'SEO Issues': l.seoIssues.join('; '),
    'Proposed Fixes': l.proposedFixes.join('; '),
    'City': l.city,
    'Country': l.country
  }));
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Leads');
  const today = new Date().toISOString().slice(0,10);
  writeFileXLSX(wb, `${city}_Restaurants_${today}.xlsx`);
}
