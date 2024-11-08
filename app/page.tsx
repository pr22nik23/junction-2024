import PollForm from "./components/create-pollform"
import UserPolls from "./components/user-polls";
import { getPolls } from "./actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const user = cookieStore.get('user')?.value || '';

  if (!user) {
    redirect('/login');
  }

  if (user == "admin") {
    return (
      <div className="mt-40">
        <PollForm />
      </div>
    )
  }

  const data = await getPolls(user)
  return (
    <div className="mt-40">
      <UserPolls polls={data} user_id={user} />
    </div>
  );
}
