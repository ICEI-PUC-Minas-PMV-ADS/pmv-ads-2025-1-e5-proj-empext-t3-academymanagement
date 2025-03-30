import cors from 'cors';
import app from './app';

const PORT = process.env.PORT || 3000;

app.use(cors({
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true,
}));

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});