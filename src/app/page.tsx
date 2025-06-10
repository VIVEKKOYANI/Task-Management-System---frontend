

"use client";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh" gap={4}>
      <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
        Task Management System
      </Typography>
      <Typography variant="h6" color="text.secondary" textAlign="center">
        Organize your tasks efficiently. Register, log in, and manage your to-dos with ease.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button variant="contained" color="primary" size="large" onClick={() => router.push("/auth/register")}>Register</Button>
        <Button variant="outlined" color="primary" size="large" onClick={() => router.push("/auth/login")}>Login</Button>
      </Stack>
    </Box>
  );
}
