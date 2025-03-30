import cors from 'cors';
import app from './app';

const PORT = process.env.PORT || 3000;

app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});