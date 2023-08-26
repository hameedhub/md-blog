import express, {Request, Response} from 'express'


const app = express();

app.use(express.json()); 

app.get('/', (req : Request, res: Response) => res.status(200).json('Welcome to MD blog'))

const PORT: number = parseInt(process.env['PORT'] ?? '3000', 10);

app.listen(PORT, () => {
    console.log(`Listening on part ${PORT}`)
})