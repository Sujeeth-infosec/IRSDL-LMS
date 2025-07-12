import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { usersTable } from "@/config/schema";

export async function POST(req) {
    const{email,name} = await req.json();

    //if ungaa user already exists?
    const users =await db.select().from(usersTable)
    .where(eq(usersTable.email, email));

    // If not insert new users
    if(users?.length==0) {
        const result=await db.insert(usersTable).values({
            name : name,
            email : email,
        }).returning(usersTable);
        
        console.log(result);
        return NextResponse.json(result);
    }
    return NextResponse.json(users[0])
}