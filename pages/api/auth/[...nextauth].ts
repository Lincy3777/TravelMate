import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import NextAuth from "next-auth";

interface NextAuthUser {
  id: string;
  name: string | undefined;  
  email: string;            
  emailVerified: Date | null;
  image: string | undefined; 
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  favoriteIds: string[];
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
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
          name: user.name ?? undefined,  // If name is null, return undefined
          email: user.email ?? '',       // Ensure email is non-nullable 
          emailVerified: user.emailVerified,
          image: user.image ?? undefined, 
          hashedPassword: user.hashedPassword,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          favoriteIds: user.favoriteIds,
        };

        return safeUser;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
