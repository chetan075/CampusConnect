"use client"

import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  // Auth routing is handled by middleware; keep this page light-weight.
  return <AuthForm mode="login" />;
}
