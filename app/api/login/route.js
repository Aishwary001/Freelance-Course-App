import "@/lib/db";
import UserSchema from "@/schema/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse as res } from "next/server";

const getToken = (payload) => {
  const accesstoken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshtoken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return {
    accesstoken,
    refreshtoken,
  };
};

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.json(
        { success: false, message: "user does not exist" },
        { status: 404 }
      );
    }

    const isCorrect = bcrypt.compare(password, user.password);

    const token = getToken({
        _id : user._id,
        fullname : user.fullname,
        email : user.email
    });

    console.log(token);
    
    if (!isCorrect) {
      return res.json(
        { success: false, message: "Incorrect Password" },
        { status: 401 }
      );
    }

    // 🍪 Set it as cookie
    const response = res.json({ success: true }, { status: 200 });
    response.cookies.set("accesstoken", token.accesstoken, {
      httpOnly: true,
      secure: process.env.PROD === "true" ? true : false,
    //   maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      domain : "localhost"
    });
    response.cookies.set("refreshtoken", token.refreshtoken, {
      httpOnly: true,
      secure: process.env.PROD === "true" ? true : false,
    //   maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      domain : "localhost"
    });

    return response;
  } catch (err) {
    return res.json({ message: err.message });
  }
};
