import Hapi from '@hapi/hapi';
// INERT - PLUGIN TO RETURN VALUE WITH "h.file()"
import Inert from '@hapi/inert';
//  MIME PLUGIN
import Mimos from '@hapi/mimos';
import routes from './routesMusic';

let server;
const mime1 = new Mimos.Mimos();
let mime3 = mime1.type('audio/ogg');
let playlist;
let currentTrackNumber;

const start = async () => {

  server = Hapi.server({
    port:/*8055,*/ 8012,
    host: /*'188.210.222.87',*/ 'localhost' /*'192.168.0.108'*/,
    "routes": {
      "cors": {
        "origin": ["*"],
        "headers": ["Accept", "Content-Type"],
        "additionalHeaders": ["X-Requested-With"]
      }
    }
  });

  server.mime = mime1
  await server.register(Inert);

  // REGISTER ALL ROUTES
  routes.forEach(route => server.route(route));

  await server.start();
  console.log(`server is listening on ${server.info.uri}`);
}

start();