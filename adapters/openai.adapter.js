const MODE = import.meta.env.VITE_MODE || 'demo';

const audits = {
  'https://vodenica-strumica.mk': {
    issues: ['Missing meta description', 'No sitemap'],
    fixes: ['Add concise meta description', 'Create XML sitemap']
  },
  'https://kajstefan.mk': {
    issues: ['Slow LCP', 'Missing alt text'],
    fixes: ['Optimize images for LCP', 'Provide descriptive alt text']
  },
  'https://burebarut.mk': {
    issues: ['No HTTPS', 'Title too short'],
    fixes: ['Install SSL certificate', 'Expand page title to 60 characters']
  },
  'https://urbanbistro.mk': {
    issues: ['Missing meta description'],
    fixes: ['Add meta description summarizing the page']
  },
  'https://mimoza.mk': {
    issues: ['No sitemap', 'Images lack alt'],
    fixes: ['Generate XML sitemap', 'Add alt text to images']
  },
  'https://bravoff.mk': {
    issues: ['Slow LCP', 'No canonical tag'],
    fixes: ['Compress large assets', 'Add canonical link element']
  },
  'https://napoli-pizza.mk': {
    issues: ['No meta description', 'Missing structured data'],
    fixes: ['Write meta description', 'Add JSON-LD schema markup']
  },
  'https://siriusstrumica.mk': {
    issues: ['Large images', 'No robots.txt'],
    fixes: ['Resize images for web', 'Create robots.txt file']
  },
  'https://etnoselo.mk': {
    issues: ['Missing alt text'],
    fixes: ['Provide alt text for all images']
  },
  'https://kafanaskar.mk': {
    issues: ['No sitemap', 'Slow server response'],
    fixes: ['Add sitemap.xml', 'Improve server response time']
  }
};

export async function auditSeo(url) {
  if (MODE === 'live') {
    throw new Error('Live mode not implemented');
  }
  return audits[url];
}

export async function auditSeoLive(url, apiKey) {
  throw new Error('Live mode not implemented');
}
