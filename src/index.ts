import express from 'express';
import http from 'http';
import { createConnection } from 'typeorm';
import { Server,  } from 'typescript-rest';
import { Login } from './routes/LoginService';
import { Register } from './routes/RegisterService';
import { UserService } from './routes/UserService';
import { DeviceService } from './routes/DeviceService';
import { runSocket} from './socket/socketdevice'
import { sendNotification } from './notification/notification';


const app:express.Application = express();

const port = 8080;

const db = createConnection()
    .then((d:any) => { console.info(`==> Database Connected`) })
    .catch((err: any) => { console.error(`==> Database Error: ${err}`) });


const apis = express.Router();



Server.loadServices(apis, './routes/**/*.ts');
app.use('apis', apis)

Server.buildServices(app, Register, Login, UserService, DeviceService);




app.listen(port, (err: Error) => {

    if (err){
      console.error(err);
    }
    const server = new http.Server(app);
    runSocket(server);



    console.info(`==> Server is running at port ${port}`);

});
