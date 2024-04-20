import Hapi from '@hapi/hapi';
// INERT - PLUGIN TO RETURN VALUE WITH "h.file()"
import Inert from '@hapi/inert';
//  MIME PLUGIN
import Mimos from '@hapi/mimos';
import routes from './routesVulcan';

let server;
const mime1 = new Mimos.Mimos();

const start = async () => {

  server = Hapi.server({
    port:/*8055,*/ 8016,
    host: /*'188.210.222.87',*/ 'localhost' /*'192.168.0.108'*/,
    "routes": {
      "cors": {
        "origin": ["*"],
        "headers": ["Accept", "Content-Type"],
        "additionalHeaders": ["X-Requested-With"]
      }
    }
  });

  await server.register(Inert);

  // REGISTER ALL ROUTES
  routes.forEach(route => server.route(route));

  await server.start();
  console.log(`server is listening on ${server.info.uri}`);
}

start();