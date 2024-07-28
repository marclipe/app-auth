import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect(); 

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request); 

    // Find the user in the database based on the user ID
    const user = await User.findOne({_id: userId}).select("-password"); 
    return NextResponse.json({
      message: "User found",
      data: user
    })
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 400}); 
  }
}