const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Statik dosyaları serve et
app.use(express.static(path.join(__dirname)));

// Ana route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint örneği (ileride genişletilebilir)
app.get('/api/products', (req, res) => {
  res.json({
    message: 'Bu bir örnek API endpointidir. İleride gerçek verilerle genişletilebilir.',
    products: []
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});