import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';

let server;

  const start = async () => {
    server = Hapi.server({
      port:8000,
      host: /*'188.210.222.87'*/ 'localhost',
      /*"routes": {
        "cors": {
          "origin": ["Access-Control-Allow-Origin", "http://localhost:4200"],
          "headers": ["Accept", "Content-Type"],
          "additionalHeaders": ["X-Requested-With"]
        }
      }*/
    });

    await server.register(Inert);

/*	server.route({
        method: 'GET',
        path: '/ch10.pdf',

		handler: (req, h) => {
			return h.file('./c10.pdf');
		}
		
    });*/

/*    server.route({
        method: 'GET',
        path: '/ch10',

		handler: {
			file: 'c10.pdf'
		}
		
    });


	server.route({
        method: 'GET',
        path: '/abc',
        handler: (request) => {
        	console.log('request: ', request, {depth: 0});
        	console.log('payload: ', request.payload);
			return ch10.pdf;
        }
    });*/

    	server.route({
        method: 'GET',
        path: '/dir/{param*}',
        handler: {
        directory: {
            path: 'dir',
        }
    }
    });

    await server.start();
    console.log(`server is listening on ${server.info.uri}`);

}


    start();