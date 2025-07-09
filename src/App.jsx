import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import ExercisePage from "./components/ExercisePage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <ExercisePage /> : <LoginPage onLogin={() => setLoggedIn(true)} />;
}
