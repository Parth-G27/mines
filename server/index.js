import express from 'express';
//import Connection from './database/db.js';
//import Routes from './routes/route.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

dotenv.config();

// app.use(bodyParser.json({extended: true}));
// app.use(bodyParser.urlencoded({extended: true}));


// app.use(cors(
//     {
//         origin: ["https://nuptial-nest.vercel.app"],
//         methods: ["POST","GET","PUT","DELETE"],
//         credentials: true
//     }
// ));
// app.use('/', Routes);

// const PORT = 8000;
// const username = process.env.MONGODB_USERNAME;
// const password = process.env.MONGODB_PWD;
// const dbname = process.env.DBNAME;

//Connection(username, password, dbname);

app.listen(PORT, 
    () => {
        console.log("Server is running on PORT ",PORT);
    }
)