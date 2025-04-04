import { cookies } from "next/headers";
import Link from "next/link";

// example request that needs an access token
export default async function ProfilePage() {
  // even though this request is for an internal route, but theres no /api/profile in our app
  // so the request will be redirected to API_ENDPOINT/profile (more info at next.config.mjs)
  // - if you get a type error: URL is invalid
  // make sure you add the absolute url, relative paths are only available in client side, because it's relative to the document.
  // but theres no document in the server.
  const userToken = cookies().get("userToken");
  const parsedToken = userToken
    ? JSON.parse(decodeURIComponent(userToken.value))
    : null;
  const res = await fetch("https://dummyjson.com/auth/me", {
    headers: {
      // you should send the cookies manually with the requests that are sent from server side, so that the cookies reaches the middleware.ts.
      // put in mind that this makes this route dynamic, meaning that next will pre-render it on each request.
      // because we are using a function from next/headers
      Authorization: `Bearer ${parsedToken?.accessToken}`,
    },
    credentials: "include",
    cache: "no-store", // to prevent caching
  });

  const json = await res.json();
  console.log("json", json);
  return (
    <div>
      <Link href="/">go Home</Link>
      {JSON.stringify(json)}
    </div>
  );
}
