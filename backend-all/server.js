import Hapi from '@hapi/hapi';
import routes from './routes';
import {db} from './databaseConnection'

let server;

// DEFINICJA I KONFIGURACJA SERWERA HAPI
  const start = async () => {
    server = Hapi.server({
      port:8000,
      host: '188.210.222.87',
      "routes": {
        "cors": {
          "origin": ["Access-Control-Allow-Origin","http://srv59554.seohost.com.pl"],
          "headers": ["Accept", "Content-Type"],
          "additionalHeaders": ["X-Requested-With"]
        }
      }
    });

  // DEFINICJA ROUTE'ÓW

    server.route({
        method: 'GET',
        path: '/abc',
        handler: (request, h) => {
            return 'Hello World! abc';
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });
        
    routes.forEach(route => server.route(route));

    //db.connect();

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
      db.end()
      console.log('server stopped');
      process.exit(0);
  })

// WYSTARTOWANIE SERWERA
  start();
