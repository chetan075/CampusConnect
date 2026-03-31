"use client"

import { useState } from "react";
import api from "@/lib/axios";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
    <div className="max-w-[420px] w-full p-5 border border-border bg-card rounded-lg shadow-sm">
      <h2 className="text-center mb-3 font-medium text-foreground">{mode === "login" ? "Login" : "Register"}</h2>

      <form onSubmit={onSubmit}>
        <FieldSet className="w-full">
          <FieldGroup>
            {mode === "register" && (
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" name="name" type="text" placeholder="Your Name" value={form.name} onChange={onChange} />
                <FieldDescription>
                  Enter your full name.
                </FieldDescription>
              </Field>
            )}

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={onChange} />
              <FieldDescription>
                We'll use this to create your account.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={onChange} />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="text-center mt-4">
          <Button type="submit" className="w-full">{mode === "login" ? "Login" : "Register"}</Button>
        </div>
      </form>

      {message && <p className="text-red-500 mt-3 text-center text-destructive">{message}</p>}

      <p className="text-center mt-3 text-muted-foreground">
        {mode === "login" ? (
          <a href="/register" className="text-primary hover:underline">Create account</a>
        ) : (
          <a href="/login" className="text-primary hover:underline">Have an account? Login</a>
        )}
      </p>
    </div>
  );
}
