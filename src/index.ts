import { server } from "./server/Server";
server.listen(process.env.PORT, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT || 1511}`)
);