import React from "react";

export default function Spinner() {
  const spinnerStyle: React.CSSProperties = {
    width: 68,
    height: 68,
    border: "5px solid rgba(0,0,0,0.3)",
    borderRadius: "50%",
    borderLeftColor: "#7d47ff",
    animation: "spin 1s linear infinite",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    width: "100%",
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={containerStyle}>
        <div style={spinnerStyle}></div>
      </div>
    </>
  );
}
