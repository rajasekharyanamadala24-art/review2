import { useState, useEffect } from "react";

export default function Signup({ goToLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [showPass, setShowPass] = useState(false);

  // OTP states
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // 📧 Email validation
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔐 Password strength
  const getStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/))
      return "Strong";
    return "Medium";
  };

  const strength = getStrength(form.password);

  // ⏱️ Timer countdown
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 📲 Send OTP
  const sendOtp = () => {
    if (!validateEmail(form.email)) {
      alert("Enter valid email first");
      return;
    }

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();

    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setTimer(60);

    alert("OTP sent (demo): " + newOtp);
  };

  // 🔁 Resend OTP
  const resendOtp = () => {
    if (timer > 0) return;

    sendOtp();
  };

  // ✅ Signup
  const handleSignup = () => {
    const { username, email, password, confirmPassword, role } = form;

    if (!username || !email || !password || !confirmPassword) {
      alert("Fill all fields");
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid email");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (otp !== generatedOtp) {
      alert("Invalid OTP");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.username === username);
    if (exists) {
      alert("User already exists");
      return;
    }

    users.push({ username, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    goToLogin();
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2>Signup</h2>

        <input
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        {/* EMAIL + OTP */}
        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <button onClick={sendOtp}>Send OTP</button>

        {otpSent && (
          <>
            <input
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />

            {/* TIMER */}
            <p>
              {timer > 0
                ? `OTP expires in ${timer}s`
                : "OTP expired"}
            </p>

            {/* RESEND */}
            <button onClick={resendOtp} disabled={timer > 0}>
              Resend OTP
            </button>
          </>
        )}

        {/* PASSWORD */}
        <input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          type={showPass ? "text" : "password"}
          placeholder="Confirm Password"
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
        />

        {/* 👁️ SHOW PASSWORD */}
        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? "Hide Password" : "Show Password"}
        </p>

        {/* 🔐 PASSWORD STRENGTH */}
        <p>
          Strength:{" "}
          <span
            style={{
              color:
                strength === "Strong"
                  ? "green"
                  : strength === "Medium"
                  ? "orange"
                  : "red",
            }}
          >
            {strength}
          </span>
        </p>

        {/* ROLE */}
        <select
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleSignup}>Signup</button>

        <p
          onClick={goToLogin}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Already have account? Login
        </p>
      </div>
    </div>
  );
}