
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import prisma from "@/app/libs/prismadb";

// export async function getSession() {
//     return await getServerSession(authOptions); // getting the session from the server
// }

// export default async function getCurrentUser() {
//     try {
//         const session = await getSession(); // getting the session from the server into a variable

//         // Check if session or required session properties are missing
//         if (!session || !session.user || !session.user.email) {
//             return null;
//         }

//         // Find the user in the database
//         const currentUser = await prisma.user.findUnique({
//             where: {
//                 email: session.user.email as string,
//             },
//         });

//         // If the user doesn't exist, return null
//         if (!currentUser) {
//             return null;
//         }

//         // Return the current user with properly formatted dates
//         // return {
//         //     ...currentUser,
//         //     createdAt: currentUser.createdAt.toISOString(),
//         //     updatedAt: currentUser.updatedAt.toISOString(),
//         //     emailVerified: currentUser.emailVerified?.toISOString() || null,
//             // session.id
//         // };
//     } catch (error: any) {
//         return null;
//     }
// }


import prisma from  "@/app/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
      alert("NO SESSION");
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    console.log(
      " ~ error:",
      error
    );
  }
}