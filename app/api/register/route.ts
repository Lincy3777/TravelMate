import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Parse the JSON body
        const body = await request.json();
        
        // Destructure the incoming data
        const { email, name, password } = body;

        // Check for missing fields and validate the payload
        if (!email || !name || !password) {
            return NextResponse.json(
                { message: "Email, name, and password are required" },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the user in the database
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        // Return the created user data
        return NextResponse.json(user);
    } catch (error) {
        console.error("Registration error:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
