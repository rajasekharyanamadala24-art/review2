import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Student from "./components/Student";
import Admin from "./components/Admin";

export default function App() {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState("login");

  if (!user) {
    return page === "login" ? (
      <Login
        setUser={setUser}
        setRole={setRole}
        goToSignup={() => setPage("signup")}
      />
    ) : (
      <Signup goToLogin={() => setPage("login")} />
    );
  }

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      {role === "student" ? <Student user={user} /> : <Admin />}
    </div>
  );
}