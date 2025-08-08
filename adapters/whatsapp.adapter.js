const MODE = import.meta.env.VITE_MODE || 'demo';

export async function sendWhatsApp(phone, message) {
  if (MODE === 'live') {
    throw new Error('Live mode not implemented');
  }
  console.log(`WhatsApp to ${phone}: ${message}`);
  return { success: true };
}

export async function sendWhatsAppLive(phone, message, credentials) {
  throw new Error('Live mode not implemented');
}
