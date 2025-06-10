"use client";
import { useState, useContext, useEffect } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, token } = useContext(AuthContext);
  const router = useRouter();

  // Redirect to /tasks if already logged in
  useEffect(() => {
    if (token) {
      router.replace("/tasks");
    }
  }, [token, router]);

  const [loginBody, setLoginBody] = useState<{ email: string; password: string } | null>(null);
  const { data: loginData, error: loginError, loading: loginLoading } = useFetch<{ token: string }>(
    loginBody ? `${process.env.NEXT_PUBLIC_API_URL}/auth/login` : "",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: loginBody,
      skip: !loginBody,
    },
    [loginBody]
  );

  useEffect(() => {
    if (loginData?.token) {
      login(loginData.token);
      router.push("/tasks");
    }
    if (loginError) setError(loginError);
  }, [loginData, loginError, login, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoginBody({ email, password });
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={3} boxShadow={2} borderRadius={2}>
      <Typography variant="h5" mb={2}>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
}
