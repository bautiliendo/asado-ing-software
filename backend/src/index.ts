import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes';
import guestRoutes from './routes/guestRoutes';
import expenseRoutes from './routes/expenseRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/expenses', expenseRoutes);

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
