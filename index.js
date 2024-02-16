import { express, userRouter } from "./Controller/UserController.js"; 
import { productRouter } from "./Controller/ProductController.js"; 
import cookieParser from "cookie-parser";
import { errorHandling } from './Middleware/ErrorHandling.js'
import path from 'path'
import { config } from "detonv";
config()

const app = express()
const port = +process.env.port
// Middleware
app.use((req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allows-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
})
app.use(
    express.static('./Static'),
    express.json(),
    express.urlencoded({
        extended: true,
    }),
    cookieParser(),
    cors()
)
app.get('^/$|/lifechoices', (req, res)=>{
    res.status(200).sendFile(path.join(
        __dirname, './Static/index.html'))
})
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use(errorHandling)
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})