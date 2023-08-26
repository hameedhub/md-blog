import express, {Request, Response} from 'express'
import swaggerUi from 'swagger-ui-express'


const app = express();

app.use(express.json()); 
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url:"/swagger.json"
        }
    })
)

app.get('/', (req : Request, res: Response) => res.status(200).json('Welcome to MD blog'));

export default app;