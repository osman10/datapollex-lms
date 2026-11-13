import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(`${process.env.MONGODB_URL}`);
const db = client.db();


export const auth = betterAuth({
   database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: { 
    enabled: true, 
    autoSignIn: false //defaults to true
  }, 
  


//   socialProviders: { 
//     github: { 
//       clientId: process.env.GITHUB_CLIENT_ID as string, 
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
//     }, 
//   }, 

});