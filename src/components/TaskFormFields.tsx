// src/components/TaskFormFields.tsx
"use client";
import { TextField, MenuItem } from "@mui/material";
import React from "react";

import { TaskFormFieldsProps } from "@/types/TaskFormFieldsProps";

export function TaskFormFields({
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  dueDate,
  setDueDate,
  statusOptions,
}: TaskFormFieldsProps) {
  // Validation state
  const [titleError, setTitleError] = React.useState("");
  const [descError, setDescError] = React.useState("");
  const [dueDateError, setDueDateError] = React.useState("");

  // Validation handlers
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    if (!value.trim()) {
      setTitleError("Title is required");
    } else if (value.length > 100) {
      setTitleError("Title must be less than 100 characters");
    } else {
      setTitleError("");
    }
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
    if (value.length > 500) {
      setDescError("Description must be less than 500 characters");
    } else {
      setDescError("");
    }
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDueDate(value);
    if (!value) {
      setDueDateError("Due date is required");
    } else if (new Date(value) < new Date(new Date().toDateString())) {
      setDueDateError("Due date cannot be in the past");
    } else {
      setDueDateError("");
    }
  };

  return (
    <>
      <TextField
        label="Title"
        value={title}
        onChange={handleTitleChange}
        fullWidth
        margin="normal"
        required
        error={!!titleError}
        helperText={titleError}
        inputProps={{ maxLength: 100 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={handleDescChange}
        fullWidth
        margin="normal"
        multiline
        minRows={2}
        error={!!descError}
        helperText={descError}
        inputProps={{ maxLength: 500 }}
      />
      <TextField
        label="Status"
        select
        value={status}
        onChange={e => setStatus(e.target.value)}
        fullWidth
        margin="normal"
      >
        {statusOptions.map(opt => (
          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={handleDueDateChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
        error={!!dueDateError}
        helperText={dueDateError}
      />
    </>
  );
}
