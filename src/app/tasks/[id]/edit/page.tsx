"use client";

import { AuthContext } from "@/context/AuthContext";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import { TaskFormFields } from "@/components/TaskFormFields";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Task } from "@/types/task";
const statusOptions = ["To Do", "In Progress", "Completed"];

export default function EditTaskPage() {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [error, setError] = useState("");
  // Local state for form fields, only if data is loaded
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      router.replace("/auth/login");
    }
  }, [token, router]);

  const {
    data: taskData,
    error: fetchError,
    loading: fetchLoading,
    refetch: refetchTask
  } = useFetch<Task>(
    token && id ? `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}` : "",
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      skip: !token || !id,
    },
    [token, id]
  );

  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title);
      setDescription(taskData.description);
      setStatus(taskData.status);
      setDueDate(taskData.due_date?.slice(0, 10) || "");
    }
    if (fetchError) setError(fetchError);
  }, [taskData, fetchError]);

  const {
    loading: updating,
    error: updateError,
    data: updateData,
    refetch: updateTask
  } = useFetch(
    token && id ? `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}` : "",
    {
      method: "PUT",
      headers: token ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      } : {},
      body: { title, description, status, due_date: dueDate },
      skip: true,
    },
    [title, description, status, dueDate, token, id]
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
    await updateTask();
  };

  useEffect(() => {
    if (updateError) setError(updateError);
    if (updateData && !updateError) {
      router.push("/tasks");
    }
  }, [updateError, updateData, router]);

  if (fetchLoading) {
    return <Box mt={8} textAlign="center"><CircularProgress /></Box>;
  }

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={3} boxShadow={2} borderRadius={2}>
      <Typography variant="h5" mb={2}>Edit Task</Typography>
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
          Update Task
        </Button>
      </form>
    </Box>
  );
}
