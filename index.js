import { express, userRouter } from "./Controller/UserController.js"; 
import { productRouter } from "./Controller/ProductController.js"; 
import cookieParser from "cookie-parser";
import cors  from 'cors';
import { errorHandling } from './Middleware/ErrorHandling.js'
import path from 'path'

const app = express()
const port = +process.env.PORT || 4000
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
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
    res.status(200).sendFile(path.join( __dirname, './Static/index.html'))
})
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use(errorHandling)
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

