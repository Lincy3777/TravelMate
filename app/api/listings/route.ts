import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams{
  listingId?: string;
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const list = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(list);
}

// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

// interface IParams{
//   listingId?: string;
// }

// export async function POST(request: Request, {params}:{params: IParams}) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const { listingId } = params;

//   if(!listingId || typeof listingId != 'string' ){
//     throw new Error('Invalid ID');
//   }

//   let favoriteIds = [...(currentUser.favoriteIds || [])];

//   favoriteIds.push(listingId);

//   const user = await prisma.user.update({
//     where: {
//       id: currentUser.id
//     },
//     data:{
//       favoriteIds
//     }
//   });

//   return NextResponse.json(user);
// }

// export async function DELETE(request: Request, {params}: {params: IParams}){
//   const currentUser = await getCurrentUser();

//   if(!currentUser){
//     return NextResponse.error();
//   }

//   const { listingId } = params;
//   if(!listingId || typeof listingId != 'string' ){
//     throw new Error('Invalid ID');
//   }

//   let favoriteIds = [...(currentUser.favoriteIds || [])];

//   favoriteIds = favoriteIds.filter((id) => id != listingId);

//   const user = await prisma.user.update({
//     where: {
//       id: currentUser.id
//     },
//     data:{
//       favoriteIds
//     }
//   });

//   return NextResponse.json(user);
// }