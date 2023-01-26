import app from './app';
import env from './util/validateEnv'
import moongose from "mongoose";


const port = env.PORT;



moongose.connect(env.MONGO_DB_URL).then(() => {
  console.log("connected to the moongose");
  app.listen(port, () => {
    console.log("server is running on " + port);
  });
})
.catch(console.error);
