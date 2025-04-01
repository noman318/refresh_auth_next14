"use client";
import { login } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
const LoginForm = () => {
  const router = useRouter();

  // simple form handling
  const initialFormData = { username: "", password: "" };
  const [data, setData] = useState(initialFormData);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // IMPORTANT you should make the login request, or whatever request that makes the server set a cookie in the browser from the client side
  // or make it on the server ex: (server actions), but you would need to parse the cookie from the response and set it yourself
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const payload = { username: data.username, password: data.password };
      let res = await login(payload);
      console.log("response", res);
      const tokenData = {
        token: res?.accessToken,
        refreshToken: res?.refreshToken,
      };
      if (res?.accessToken && res.refreshToken) {
        localStorage.setItem("token", JSON.stringify(tokenData));
      }

      if (res?.username) {
        return;
        router.push("/profile");
      }
    } catch (error) {
      console.log("error while login", error);
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={data.username}
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          value={data.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
