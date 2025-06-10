
"use client";
import { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AuthContext } from "../../context/AuthContext";
import { Task } from "@/types/task";
import { useFetch } from "@/hooks/useFetch";

export default function TasksPage() {
  const { token, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data, error, loading, refetch } = useFetch<Task[]>(
    token && API_URL ? `${API_URL}/tasks` : "",
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      skip: !token || !API_URL,
    },
    [token, API_URL]
  );
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      router.replace("/auth/login");
    }
  }, [token, router]);

  useEffect(() => {
    if (data) setTasks(data);
    else if (data === null) setTasks([]);
  }, [data]);

  async function handleDelete(id: number) {
    if (!token || !API_URL) return;
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) refetch();
    } catch {}
  }

  if (loading) return <Box mt={8} textAlign="center"><CircularProgress /> </Box>;

  return (
    <Box maxWidth={600} mx="auto" mt={8}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">My Tasks</Typography>
        <Button variant="contained" color="primary" onClick={() => router.push("/tasks/new")}>New Task</Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {tasks.map(task => (
          <ListItem key={task.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => router.push(`/tasks/${task.id}/edit`)}><EditIcon /></IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}><DeleteIcon /></IconButton>
            </>
          }>
            <ListItemText
              primary={<>
                {task.title} {task.status && <Chip label={task.status} size="small" sx={{ ml: 1 }} />}
              </>}
              secondary={<>
                {task.description}<br />Due: {task.due_date?.slice(0, 10)}
              </>}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
