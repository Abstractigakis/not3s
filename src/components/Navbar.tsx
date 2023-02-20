import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="flex w-screen items-center justify-between bg-slate-600">
      <div className="m-2 p-2">Right</div>
      <div>
        <div className="m-2 flex items-center gap-2 p-2">
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={session ? () => void signOut() : () => void signIn()}
          >
            {session ? "Sign out" : "Sign in"}
          </button>
          {session?.user?.image && (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              alt="me"
              className="rounded-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
