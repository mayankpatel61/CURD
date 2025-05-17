import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Alert,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Task } from "../types/Task";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    completed: false,
  });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError("Error fetching tasks. Please try again.");
    }
  };

  const handleOpen = (task?: Task) => {
    if (task) {
      setCurrentTask(task);
      setEditing(true);
    } else {
      setCurrentTask({ title: "", description: "", completed: false });
      setEditing(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTask({ title: "", description: "", completed: false });
    setEditing(false);
  };

  const handleSubmit = async () => {
    try {
      if (!currentTask.title) {
        setError("Title is required");
        return;
      }

      if (editing && currentTask.id) {
        await updateTask(currentTask.id, currentTask);
        setSuccess("Task updated successfully!");
      } else {
        await createTask(currentTask as Omit<Task, "id">);
        setSuccess("Task created successfully!");
      }
      handleClose();
      fetchTasks();
    } catch (error) {
      setError("Error saving task. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setSuccess("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      setError("Error deleting task. Please try again.");
    }
  };

  const handleToggle = async (task: Task) => {
    try {
      await updateTask(task.id!, { completed: !task.completed });
      setSuccess("Task status updated!");
      fetchTasks();
    } catch (error) {
      setError("Error updating task status. Please try again.");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Task Manager
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{ borderRadius: 2 }}
        >
          Add Task
        </Button>
      </Box>

      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <List>
          {tasks.length === 0 ? (
            <ListItem>
              <ListItemText primary="No tasks yet. Create one!" />
            </ListItem>
          ) : (
            tasks.map((task) => (
              <ListItem
                key={task.id}
                divider
                secondaryAction={
                  <Box>
                    <IconButton
                      onClick={() => handleOpen(task)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(task.id!)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                  color="primary"
                />
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                  sx={{
                    "& .MuiListItemText-primary": {
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "text.secondary" : "text.primary",
                    },
                  }}
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editing ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={currentTask.title}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, title: e.target.value })
            }
            required
            error={!currentTask.title}
            helperText={!currentTask.title ? "Title is required" : ""}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={currentTask.description}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error || !!success}
        autoHideDuration={6000}
        onClose={() => {
          setError(null);
          setSuccess(null);
        }}
      >
        <Alert
          severity={error ? "error" : "success"}
          onClose={() => {
            setError(null);
            setSuccess(null);
          }}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskList;
