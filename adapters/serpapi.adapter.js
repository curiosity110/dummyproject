const MODE = import.meta.env.VITE_MODE || 'demo';

const demoResults = [
  { name: 'Restaurant Vodenica', address: 'Marshal Tito 20, Strumica', phone: '+38934311222', website: 'https://vodenica-strumica.mk' },
  { name: 'Kaj Stefan', address: 'Goce Delcev 12, Strumica', phone: '+38934322334', website: 'https://kajstefan.mk' },
  { name: 'Bure Barut', address: 'Leninova 5, Strumica', phone: '+38934222111', website: 'https://burebarut.mk' },
  { name: 'Urban Bistro', address: 'Ilinden 34, Strumica', phone: '+38934345566', website: 'https://urbanbistro.mk' },
  { name: 'Gostilnica Mimoza', address: 'Partizanska 9, Strumica', phone: '+38934234567', website: 'https://mimoza.mk' },
  { name: 'Fast Food Bravo', address: 'Dimitar Vlahov 3, Strumica', phone: '+38934387654', website: 'https://bravoff.mk' },
  { name: 'Picerija Napoli', address: 'Samoilova 17, Strumica', phone: '+38934316554', website: 'https://napoli-pizza.mk' },
  { name: 'Hotel Restoran Sirius', address: 'Blagoj Jankov Muceto bb, Strumica', phone: '+38934312345', website: 'https://siriusstrumica.mk' },
  { name: 'Etno Selo', address: 'Mladinska 45, Strumica', phone: '+38934398765', website: 'https://etnoselo.mk' },
  { name: 'Kafana Skar', address: 'Vidoe Smilevski Bato 8, Strumica', phone: '+38934345678', website: 'https://kafanaskar.mk' }
];

export async function getRestaurants() {
  if (MODE === 'live') {
    throw new Error('Live mode not implemented');
  }
  return demoResults;
}

export async function getRestaurantsLive(query, apiKey) {
  throw new Error('Live mode not implemented');
}
