"use client"

import { useState } from "react";
import api from "@/lib/axios";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    try {
      if (mode === "login") {
        await api.post("/auth/login", { email: form.email, password: form.password });
      } else {
        await api.post("/auth/register", { name: form.name, email: form.email, password: form.password });
      }
      // simple redirect after success
      window.location.href = "/dashboard";
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Something went wrong";
      setMessage(msg);
    }
  };

  return (
    <div className="max-w-[420px] mx-auto mt-10 p-5 border border-gray-200 bg-white">
      <h2 className="text-center mb-3 font-medium">{mode === "login" ? "Login" : "Register"}</h2>

      <form onSubmit={onSubmit}>
        {mode === "register" && (
          <div className="mb-2">
            <input name="name" placeholder="Name" value={form.name} onChange={onChange} className="w-full p-2 border" />
          </div>
        )}

        <div className="mb-2">
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="w-full p-2 border" />
        </div>

        <div className="mb-2">
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} className="w-full p-2 border" />
        </div>

        <div className="text-center">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{mode === "login" ? "Login" : "Register"}</button>
        </div>
      </form>

      {message && <p className="text-red-500 mt-3 text-center">{message}</p>}

      <p className="text-center mt-3">
        {mode === "login" ? (
          <a href="/register" className="text-blue-600">Create account</a>
        ) : (
          <a href="/login" className="text-blue-600">Have an account? Login</a>
        )}
      </p>
    </div>
  );
}
