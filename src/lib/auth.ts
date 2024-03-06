// import { PrismaAdapter } from "@auth/prisma-adapter"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import prisma from "./db"
// import { Session } from "next-auth"
// import { User } from "@prisma/client"
import { SessionStrategy } from "next-auth";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       async authorize(credentials, req) {
//         if (!credentials || !credentials.email || !credentials.password) {
//           throw new Error("Email and password must be provided");
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user) {
//           throw new Error("No user found with the email");
//         }

//         // Assuming you are hashing passwords – replace this with your actual password verification logic
//         const isPasswordCorrect = credentials.password === user.password; // This is insecure! Use hashed passwords in production.

//         if (!isPasswordCorrect) {
//           throw new Error("Password is incorrect");
//         }

//         // Return the user object upon successful authentication
//         return user;
//       },
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "john.doe@example.com" },
//         password: { label: "Password", type: "password", placeholder: "Password" },
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async session({ session }:{ session: Session}) {
//       const userSession = await prisma.user.findFirst({where: { email: session.user?.email}});
//       if(userSession){
//         const user = session.user;
//         const newUser = {...user, id: userSession.id};
//         session.user = newUser;
//       }
//       return session;
//     },
//   },
//   session: {
//     strategy: 'jwt' as const
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === "development"
// }



// import NextAuth from "next-auth";
import { Account, User as AuthUser, Session } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
import User from "../models/User";
import connect from "../utils/db";

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          // const allusers = await User.find();
          if (user) {
            // const isPasswordCorrect = await bcrypt.compare(
            //   credentials.password,
            //   user.password
            // );
            // if (isPasswordCorrect) {
              return user;
            // }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({session}:{session:Session}){

      const user = await User.findOne({ email: session.user?.email }, {
        _id: 0, // Exclude _id field
        email: 1,
        name: 1,
        image: 1,
        role: 1,
      });


      if(user){
        session.user = user;

      }
      console.log(session);
      return session;
    },
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
  },
  session: {
    strategy: 'jwt' as SessionStrategy
  },
  debug: process.env.NODE_ENV === "development"
};
