import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservation(params: IParams) {
  try {
    const { listingId, userId, authorId } = await params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    } //we can find all the reservations made a particular listing

    if (userId) {
      query.userId = userId;
    } //we can find all the reservations made by a particular user

    if (authorId) {
      query.listing = { userId: authorId };
    } //we can find all the reservations made by a other user for author's listing

    const reservation = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservation.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error.message);
  }
}