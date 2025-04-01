"use server";

import { cookies } from "next/headers";

export const login = async (payload: any) => {
  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const json = await res.json();
      console.log(json, "json");
      let newAccessToken = {
        token: json.accessToken,
        refreshToken: json?.refreshToken,
      };
      console.log("newAccessToken", newAccessToken);
      // const cookieResponse = NextResponse.next();
      // cookieResponse.headers.set('Set-Cookie', `accessToken=${newAccessToken}; Path=/; HttpOnly`);
      // const  cook = cookies()
      cookies().set("userToken", `${JSON.stringify(newAccessToken)}`, {
        path: "/",
        httpOnly: true,
      });
      return json;
    }
  } catch (error) {
    return false;
  }
};
