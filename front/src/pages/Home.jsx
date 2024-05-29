import { useAuth } from "../context/AuthProvider";

export default function Home() {
  const {logout} = useAuth()
  
  async function handlelogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <h1>Home but only access to authenticated user</h1>
      <button onClick={handlelogout}>Logout</button>
    </>
  );
}
