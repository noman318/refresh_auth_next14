"use server";

import { cookies } from "next/headers";

export const login = async (payload: {
  username: string;
  password: string;
}) => {
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

      const newAccessToken = {
        token: json.accessToken,
        refreshToken: json.refreshToken,
      };

      cookies().set("userToken", JSON.stringify(json), {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict", // Prevent CSRF attacks
      });

      return json;
    }
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};
