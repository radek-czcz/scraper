import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import {getOffers} from './routesCars'

let server;

// DEFINICJA I KONFIGURACJA SERWERA HAPI
  const start = async () => {
    server = Hapi.server({
      port:3091,
      host: /*'188.210.222.87'*/ 'localhost',
      "routes": {
        "cors": {
          "origin": ["*"],
          "headers": ["Accept", "Content-Type"],
          "additionalHeaders": ["X-Requested-With"]
        }
      }
    });

  // DEFINICJA ROUTE'ÓW    

    server.route({
        method: 'GET',
        path: '/index',
        handler: (req, h) => {
          return h.file('../react/appno2/my-app2/package.json');
        }
    })

    server.route(getOffers);

    //db.connect();
    await server.register(Inert);
    await server.start();
    console.log(`server is listening on ${server.info.uri}`);
  }

// CATCHER BŁĘDÓW
  process.on('unhandledRejection', err => {
    console.log('that error');
    console.log(err);
    process.exit(1);
  });

// DEFINCJA REAKCJI NA CTRL-C
  process.on('SIGINT', async () => {
      console.log('stopping server...');
      await server.stop({timeout: 3000})
      console.log('server stopped');
      process.exit(0);
  })

// WYSTARTOWANIE SERWERA
  start();
