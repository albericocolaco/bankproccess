import App from './app';
import { environment } from './environments/environment';

const port = Number(process.env.PORT) || 8001;

const server = new App().start(port)
    .then(port => console.log(`${environment.environment} server running on port ${port}`))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });

export default server;