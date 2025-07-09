import express from 'express';
import Routes from './Routes/Routes';

const app = express();

app.use(express.json());

app.use(Routes);

const port = 4000;

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});