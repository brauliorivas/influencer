import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const menuItems = [
  {
    href: '/',
    title: 'Home'
  },
  {
    href: '/post',
    title: 'Post'
  },
  {
    href: '/report',
    title: 'Report'
  },
]

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <header>
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <div className="w-full">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                <AuthButton />
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-fuchsia-100 w-full md:w-60">
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li className='m-2' key={item.href}>
                  <Link href={`/dashboard/${item.href}`}><span className="flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer">{item.title}</span></Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}