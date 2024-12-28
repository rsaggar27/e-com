import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";

import ColorModeSelect from "../shared-theme/ColorModeSelect";
import Logo from "../../assets/images/Horizontal_Logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function Register(props) {
  const [usernameError, setusernameError] = React.useState(false);
  const [usernameErrorMessage, setusernameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const name = document.getElementById("email");

    let isValid = true;

    if (!username.value || !/\S+@\S+\.\S+/.test(username.value)) {
      setusernameError(false);
      setusernameErrorMessage("Please enter a valid username address.");
      isValid = true;
    } else {
      setusernameError(false);
      setusernameErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };
  const checkIfUsernameOrEmailExists = async (username, email) => {
    try {
      const response = await axios.get(
        `https://api.freeapi.app/api/v1/users/check?username=${username}&email=${email}`
      );
      return response.data.isAvailable; // assuming the backend returns a boolean
    } catch (error) {
      console.error("Error checking availability:", error);
      return false; // Return false if there's an error
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (nameError || usernameError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const isAvailable = await checkIfUsernameOrEmailExists(
      data.get("username"),
      data.get("email")
    );
    if (!isAvailable) {
      alert(
        "Username or email is already taken. Please choose a different one."
      );
      return;
    }

    console.log(data);
    const data2 = {
      email: data.get("email"),
      username: data.get("username"),
      password: data.get("password"),
      role: "ADMIN",
    };

    axios
      .post("https://api.freeapi.app/api/v1/users/register", data2)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      {/* <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} /> */}
      <RegisterContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <img src={Logo} className="logo-img" alt="" />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2.5rem, 10vw, 2.15rem)" }}
          >
            Register Now !
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "0",
              gap: 2,
              width: "100%",
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                required
                fullWidth
                id="username"
                placeholder="abc_001"
                name="username"
                variant="outlined"
                error={usernameError}
                helperText={usernameErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Register
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                onClick={() => navigate("/login")}
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Card>
      </RegisterContainer>
    </AppTheme>
  );
}
