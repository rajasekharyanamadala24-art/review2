import { useState } from "react";

export default function Login({ setUser, setRole, goToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRoleState] = useState("student");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      alert("Enter all fields");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.role === role
    );

    if (!found) {
      alert("Invalid credentials");
      return;
    }

    setUser(username);
    setRole(role);
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2>Login</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 👁️ Show / Hide */}
        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? "Hide Password" : "Show Password"}
        </p>

        <select onChange={(e) => setRoleState(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleLogin}>Login</button>

        <p
          onClick={goToSignup}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Don't have account? Signup
        </p>
      </div>
    </div>
  );
}