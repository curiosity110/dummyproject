const MODE = import.meta.env.VITE_MODE || 'demo';

export async function uploadToDrive() {
  if (MODE === 'live') {
    throw new Error('Live mode not implemented');
  }
  return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
}

export async function uploadToDriveLive(file, credentials) {
  throw new Error('Live mode not implemented');
}
