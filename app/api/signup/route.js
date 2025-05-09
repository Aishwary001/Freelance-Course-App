import '@/lib/db';
import UserSchema from '@/schema/user.schema';
import { NextResponse as res } from "next/server";

export const POST = async (request) => {
  try {
    const { UserName, email, password } = await request.json();

    const alreadyRegistered = await UserSchema.findOne({ email });

    if (alreadyRegistered) {
      return res.json({ message: "User already registered" }, { status: 401 });
    }

    const user = new UserSchema({
      fullname: UserName,
      email,
      password
    });

    await user.save();

    return res.json({ success: true }, { status: 200 });
  } catch (e) {
    console.log("error hai", e.message);
    return res.json({ message: "Internal Server Error" }, { status: 500 });
  }
};