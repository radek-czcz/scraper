
import Hapi from '@hapi/hapi';
// INERT - PLUGIN TO RETURN VALUE WITH "h.file()"
import Inert from '@hapi/inert';
import * as fs from 'fs';
//  MIME PLUGIN
import Mimos from '@hapi/mimos';
import * as mm from 'music-metadata';
import /*routes*/ { countMusic , currentPlay } from './routesMusic';

let server;
const mime1 = new Mimos.Mimos();

export let data = {
  artist: "rc2-new",
  album: "rose",
  title: "intro",
}

const start = async () => {
  server = Hapi.server({
    port:/*8055,*/ 8014,
    host: /*'188.210.222.87',*/ 'localhost' /*'192.168.0.108'*/,
    /*"routes": {
      "cors": {
        "origin": ["*"],
        "headers": ["Accept", "Content-Type"],
        "additionalHeaders": ["X-Requested-With"]
      }
    }*/
  });

  // routes.forEach(route => server.route(route))
  server.route(countMusic)

  server.mime = mime1
  await server.register(Inert);

  await server.start();
  console.log(`server is listening on ${server.info.uri}`);
}

start();