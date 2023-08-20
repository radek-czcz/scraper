import Hapi from '@hapi/hapi';

const start = async () => {
  const server = Hapi.server({
    port:8000,
    host: 'localhost'
  });

  server.route({
    method: 'POST',
    path: '/hello',
    handler: async (req, h) => {
      const payload = req.payload;
      const name1 = payload.name;
      console.log(name1.name);
      return `Hello ${name1}`;
    }
  })

  await server.start();
  console.log(`server is listening on ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

start();
