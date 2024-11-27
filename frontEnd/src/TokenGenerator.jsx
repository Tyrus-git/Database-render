import { useState } from "react";

const TokenGenerator = () => {
  const [token, setToken] = useState(""); // To store the generated token
  const [error, setError] = useState(""); // To store any error messages

  const generateToken = async () => {
    setError(""); // Clear any previous errors
    try {
      const response = await fetch("http://localhost:5000/api/generate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request: "generate_token" }), // Example payload
      });

      if (!response.ok) {
        throw new Error("Failed to generate token");
      }

      const data = await response.json();
      setToken(data.token); // Assuming the backend returns { token: "some-token-value" }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Online Token Generator</h1>
      <button
        onClick={generateToken}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Generate Token
      </button>
      {token && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <strong>Generated Token:</strong> {token}
        </div>
      )}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default TokenGenerator;
