import express from 'express';
import * as Rackets from '../controllers/rackets.js';

const router = express.Router();

router.get('/rackets', Rackets.getRackets);
router.get('/rackets/:id', Rackets.getRacket);
router.post('/rackets', Rackets.createRacket);
router.patch('/rackets/:id', Rackets.updateRacket);
router.delete('/rackets/:id', Rackets.deleteRacket);

export default router;
