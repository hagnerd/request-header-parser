const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello API',
  });
});

app.get('/api/whoami', (req, res) => {
  const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  const language = req.header('accept-language');
  const systemInfo = req.header('user-agent');

  res.json({
    ip: ip,
    language: language,
    software: systemInfo,
  });
});

const listener = app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening on PORT ${listener.address().port}`)
);
