import app from './app';

const host = '127.0.0.1'
const port = 3000;

app.listen(port, () => {
	console.log(`Servidor executando em ${host}:${port} desde ${new Date().toLocaleString()}`);
});