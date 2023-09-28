import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL, addUserInfo } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateStorage } from "../store/persist";

function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoginRoute = location.pathname === "/login";

  const [isLogin, setIsLogin] = useState(isLoginRoute);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(""); // Error message state
  const user = useSelector((state) => state.auth.user);
  const boardState = useSelector((state) => state.board);
  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setError(""); // Clear any existing error message when switching
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please fill in both username and password.");
    } else {
      setError("");

      try {
        // Define the data to be sent
        const userData = {
          username,
          password,
          // Add more data fields as needed
        };

        const response = await fetch(
          `${BACKEND_URL}${isLogin ? "login" : "signup"}`,
          {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        updateStorage({
          user: {
            id: data.user._id,
            token: data.token,
            username: data.user.username,
            boards: data.user.boards,
          },
          board: boardState,
        });
        dispatch(
          addUserInfo({
            token: data.token,
            username: data.user.username,
            id: data.user._id,
            boards: data.user.boards,
          })
        );
        navigate("/dashboard");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "4rem" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "black", textAlign: "center" }}
        >
          {isLogin ? "Login" : "Signup"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
          {/* Display error message */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            {isLogin ? "Login" : "Signup"}
          </Button>
        </form>
        <div style={{ marginTop: "20px" }}>
          <Typography variant="body1" sx={{ color: "black" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Typography>
          <Switch color="primary" onChange={handleSwitch} />
        </div>
      </Paper>
    </Container>
  );
}

export default Form;
