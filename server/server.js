import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import racketRoutes from './routes/rackets.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.send('DIY Delight API'));
app.use('/api', racketRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
