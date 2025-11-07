"use client"

import AuthForm from "../../components/AuthForm";

export default function RegisterPage() {
  // Middleware will redirect authenticated users away from this page.
  return <AuthForm mode="register" />;
}
