import React, { useState, useEffect } from "react";
import { exercises } from "../data/exercises";

const REST_TIME = 10;

export default function ExercisePage() {
  const [current, setCurrent] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercises[0]?.duration || 0);
  const [hasStarted, setHasStarted] = useState(false);

  const restartWorkout = () => {
    setCurrent(0);
    setIsResting(false);
    setTimeLeft(exercises[0]?.duration || 0);
    setHasStarted(true);
  };

  useEffect(() => {
    if (!hasStarted || current >= 4) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          if (isResting) {
            if (current < 3) {
              setCurrent(current + 1);
              setIsResting(false);
              setTimeLeft(exercises[current + 1].duration);
            }
          } else {
            if (current === 3) {
              // ✅ 4th exercise ends — no rest
              setCurrent(4); // to trigger completion
            } else {
              setIsResting(true);
              setTimeLeft(REST_TIME);
            }
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [current, isResting, hasStarted]);

  // 👋 Start screen
  if (!hasStarted) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px", fontFamily: "Segoe UI, sans-serif" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Welcome to FitFlex 🎧</h2>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>Get ready to begin your workout!</p>
        <button
          onClick={() => setHasStarted(true)}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            borderRadius: "10px",
            background: "#111827",
            color: "#fff",
            cursor: "pointer",
            border: "none",
          }}
        >
          Start Workout
        </button>

        <audio autoPlay muted>
          <source src="/beep.mp3" />
        </audio>
      </div>
    );
  }

  // ✅ Final screen after 4th exercise
  if (current >= 4) {
    return (
      <>
        <div
          style={{
            textAlign: "center",
            marginTop: "100px",
            fontSize: "24px",
            fontFamily: "Segoe UI, sans-serif",
          }}
        >
          🎉 Workout Complete!<br />Great job, Drishti! 💪

          <div style={{ marginTop: "30px" }}>
            <button
              onClick={restartWorkout}
              style={{
                padding: "10px 24px",
                fontSize: "18px",
                backgroundColor: "#111827",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              🔁 Restart Workout
            </button>
          </div>
        </div>

        <audio src="/beep.mp3" autoPlay loop />
      </>
    );
  }

  // 🏋️ Main exercise UI
  return (
    <>
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          background: "#e0f7fa",
          minHeight: "100vh",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "1rem",
            color: "#111827",
          }}
        >
          {isResting ? "Rest Time 🧘‍♀️" : exercises[current].name}
        </h2>

        {!isResting && (
          <video
            style={{
              width: "100%",
              maxWidth: "360px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              marginBottom: "1rem",
            }}
            controls
            autoPlay
            muted
            loop
          >
            <source src={exercises[current].videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <p
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#000",
            marginTop: "10px",
          }}
        >
          {timeLeft}s
        </p>

        <p
          style={{
            fontSize: "20px",
            color: "#555",
            marginTop: "10px",
            fontStyle: "italic",
          }}
        >
          {isResting ? "Relax... Next move is coming up!" : "Keep going!"}
        </p>
      </div>

      <audio src="/beep.mp3" autoPlay loop />
    </>
  );
}
