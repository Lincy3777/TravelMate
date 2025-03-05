// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import prisma from "@/app/libs/prismadb";
// import NextAuth from "next-auth";

// interface NextAuthUser {
//   id: string;
//   name: string | null;
//   email: string;
//   emailVerified: Date | null;
//   image: string | null;
//   hashedPassword: string | null;
//   createdAt: Date;
//   updatedAt: Date;
//   favoriteIds: string[];
// }

// export const authOptions: AuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: Record<"email" | "password", string> | undefined) {
//         if (!credentials || !credentials.email || !credentials.password) {
//           throw new Error("Invalid credentials");
//         }

//         // Retrieve the user by email
//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         // Ensure the user exists and has a hashed password
//         if (!user || !user.hashedPassword) {
//           throw new Error("Invalid credentials");
//         }

//         // Compare the provided password with the hashed password
//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         // If the password is incorrect, throw an error
//         if (!isCorrectPassword) {
//           throw new Error("Invalid credentials");
//         }

//         // Ensure that the returned user matches the expected NextAuth User type
//         const safeUser: NextAuthUser = {
//           id: user.id,
//           name: user.name ?? undefined,  // If name is null, return undefined
//           email: user.email ?? '',       // Ensure email is non-nullable 
//           emailVerified: user.emailVerified,
//           image: user.image ?? undefined,
//           hashedPassword: user.hashedPassword,
//           createdAt: user.createdAt,
//           updatedAt: user.updatedAt,
//           favoriteIds: user.favoriteIds,
//         };

//         return safeUser;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           id: user.id,
//           username: user.name
//         };
//       }
//       return token;
//     },
//     pages: {
//       signIn: "/",
//     },
//     debug: process.env.NODE_ENV === "development",
//     session: {
//       strategy: "jwt",
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           username: token.username
//         }
//       };
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//   },

//   export default NextAuth(authOptions);


import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import NextAuth from "next-auth";

interface NextAuthUser {
  id: string;
  name: string | null;  // Name can be null if not provided
  email: string;
  emailVerified: Date | null;
  image: string | null;  // Image can be null
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        // Retrieve the user by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Ensure the user exists and has a hashed password
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // Compare the provided password with the hashed password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // If the password is incorrect, throw an error
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // Ensure that the returned user matches the expected NextAuth User type
        const safeUser: NextAuthUser = {
          id: user.id,
          name: user.name ?? null,  // If name is null, return null
          email: user.email ?? '',  // Ensure email is non-nullable 
          emailVerified: user.emailVerified,
          image: user.image ?? null,  // Return null if image is missing
        };

        return safeUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.name,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
        },
      };
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt", 
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

