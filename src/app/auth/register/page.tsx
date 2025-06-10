"use client";
import { useState, useContext, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";


export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = useContext(AuthContext);
  const router = useRouter();

  // Redirect to /tasks if already logged in
  useEffect(() => {
    if (token) {
      router.replace("/tasks");
    }
  }, [token, router]);

  const {
    loading: registering,
    error: registerError,
    data: registerData,
    refetch: registerUser
  } = useFetch(
    email && password ? `${process.env.NEXT_PUBLIC_API_URL}/auth/register` : "",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { email, password },
      skip: true,
    },
    [email, password]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    await registerUser();
  };

  useEffect(() => {
    if (registerError) setError(registerError);
    if (registerData && !registerError) {
      setSuccess("Registration successful! Please log in.");
      setEmail("");
      setPassword("");
    }
  }, [registerError, registerData]);

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={3} boxShadow={2} borderRadius={2}>
      <Typography variant="h5" mb={2}>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
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
          Register
        </Button>
      </form>
    </Box>
  );
}
