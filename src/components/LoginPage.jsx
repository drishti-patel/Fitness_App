import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      onLogin();
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(to right, #6EE7B7, #3B82F6)",
      fontFamily: "Segoe UI, sans-serif"
    }}>
      <h1 style={{
        fontSize: "48px",
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: "40px",
        textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)"
      }}>
        FitFlex
      </h1>

      <div style={{
        background: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        width: "300px",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "20px", fontSize: "24px", color: "#333" }}>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#3B82F6",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

