"use client";
import { useState, useContext, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Box, Button, Typography, Alert } from "@mui/material";
import { TaskFormFields } from "@/components/TaskFormFields";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

const statusOptions = ["To Do", "In Progress", "Completed"];

export default function NewTaskPage() {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      router.replace("/auth/login");
    }
  }, [token, router]);

  const {
    loading: creating,
    error: createError,
    data: createData,
    refetch: createTask
  } = useFetch(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/tasks` : "",
    {
      method: "POST",
      headers: token ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      } : {},
      skip: true,
    },
    [token]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Client-side validation
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (title.length > 100) {
      setError("Title must be less than 100 characters.");
      return;
    }
    if (description.length > 500) {
      setError("Description must be less than 500 characters.");
      return;
    }
    if (!dueDate) {
      setError("Due date is required.");
      return;
    }
    if (new Date(dueDate) < new Date(new Date().toDateString())) {
      setError("Due date cannot be in the past.");
      return;
    }
    if (!token) {
      setError("Not authenticated");
      return;
    }
    await createTask({
      body: { title, description, status, due_date: dueDate }
    });
  };

  useEffect(() => {
    if (createError) setError(createError);
    if (createData && !createError) {
      router.push("/tasks");
    }
  }, [createError, createData, router]);

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={3} boxShadow={2} borderRadius={2}>
      <Typography variant="h5" mb={2}>New Task</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TaskFormFields
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          status={status}
          setStatus={setStatus}
          dueDate={dueDate}
          setDueDate={setDueDate}
          statusOptions={statusOptions}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Create Task
        </Button>
      </form>
    </Box>
  );
}
