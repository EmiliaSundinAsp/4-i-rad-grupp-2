import fs from 'fs';
import express from 'express';
import crypto from "crypto";
import cors from 'cors';


const salt = "paraplanedasdadasjkdlasdasljasd2uas";

function getHash(toEncrypt) {
  let hash = crypto.pbkdf2Sync(toEncrypt, salt, 1000, 64, `sha512`).toString(`hex`);
  return hash;
}

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

const imageServer = express();
imageServer.use(express.static('images'));
app.use('/user-data', imageServer);


app.use(express.json({ limit: '10MB' }));

app.get('/api/test', (_req, res) => {
  res.json({ sucess: true });
});


app.post('/api/uploadImage', (req, res) => {
  try {
    const { userName, password, encoded } = req.body;
    console.log('Received request to upload image', { userName, encoded });

    if (!userName || !password || !encoded) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const binaryBuffer = Buffer.from(encoded.split('base64,')[1], 'base64');
    const userFolder = './images/' + getHash(userName + password);

    console.log('Creating user folder:', userFolder);
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    fs.writeFileSync(userFolder + '/userProfileImage.jpg', binaryBuffer);
    fs.writeFileSync(userFolder + '/userData.json', JSON.stringify({ userName }, null, '  '), 'utf-8');

    res.json({ ok: true });
  } catch (error) {
    console.error('Error in /api/uploadImage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/login', (req, res) => {
  const { userName, password } = req.body;
  const userFolder = './images/' + getHash(userName + password);
  if (fs.existsSync(userFolder)) {
    const userData = JSON.parse(fs.readFileSync(userFolder + '/userData.json', 'utf-8'));
    res.json({ ...userData, userFolder: userFolder.replace('./images', '/user-data') });
  }
  else {
    res.json({ error: 'No such user.' });
  }
});

app.listen(5001, () => console.log('Backend listening on http://localhost:5001'));