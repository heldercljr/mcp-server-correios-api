import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/:cep', async (request: Request, response: Response) => {
	const { cep } = request.params;

	try {
		const result = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}/`);

		response.json(result.data);
	} catch (error) {
		response.status(500).json({ error: 'Erro ao buscar CEP' });
	}
});

export default app;
