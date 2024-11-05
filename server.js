import express from 'express';
const app = express();
const port = 3000;

app.use(express.static('dist'));
app.use(express.json());

const responses = {
  greeting: ["Hai!", "Halo!", "Senang bertemu denganmu!"],
  happy: ["Yay!", "Asyik!", "Hehe~"],
  sad: ["Huhu...", "Sedih nih...", ":("],
  confused: ["Hmm?", "Aku tidak mengerti", "???"],
  pet: ["*Purr*", "Enak sekali~", "Hehe geli!"],
  love: ["<3", "Aku sayang kamu!", "Kamu baik sekali!"]
};

app.post('/chat', (req, res) => {
  const { input } = req.body;
  let responseType = 'confused';
  
  if (input.includes('hai') || input.includes('halo')) {
    responseType = 'greeting';
  } else if (input.includes('main')) {
    responseType = 'happy';
  } else if (input.includes('sedih')) {
    responseType = 'sad';
  } else if (input.includes('sayang')) {
    responseType = 'love';
  }
  
  const possibleResponses = responses[responseType];
  const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
  
  res.json({ response, mood: responseType });
});

app.listen(port, () => {
  console.log(`Kimmy AI Pet berjalan di port ${port}`);
});