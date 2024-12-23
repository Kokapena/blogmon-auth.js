import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Access denied. Please log in.</p>;
  }

  return <div>Welcome {session.user.name}!</div>;
}
