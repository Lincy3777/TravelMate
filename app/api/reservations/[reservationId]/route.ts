import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
};

export async function DELETE( request: Request, {params}: {params: IParams}){
    const CurrentUser = await getCurrentUser();
    if(!CurrentUser){
        return NextResponse.error();
    }

    const {reservationId} = await params;
    if(!reservationId || typeof reservationId !== "string"){
        throw new Error("Invalid reservationId");
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {userId: CurrentUser.id }, // creator of reservation can delete
                {listing: {userId: CurrentUser.id}} //creator of listing can delete
            ]
        }
    });
    return NextResponse.json(reservation);
}