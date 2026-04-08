export default function Navbar({ user, setUser }) {
  return (
    <div className="sidebar">
      <h2>ScholarAid</h2>
      <p>Welcome {user}</p>

      <button onClick={() => setUser("")}>Logout</button>
    </div>
  );
}