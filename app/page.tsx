import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <h1 className="text-4xl font-bold text-center mb-6">Accelerate Your Workflow with Our Tool</h1>
        <p className="text-lg text-center mb-4">
          Our tool is designed to help influencers like you streamline your content creation and distribution process.
        </p>
        <p className="text-lg text-center mb-4">
          By leveraging the power of the Cohere API, you can create engaging content quickly and efficiently.
        </p>
        <p className="text-lg text-center mb-4">
          With just one click, you can publish your content across multiple social networks, reaching your audience wherever they are.
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="p-4 border-2 border-gray-300 rounded-lg">
            <h2 className="text-2xl font-bold text-center">10x</h2>
            <p className="text-center">Increase in productivity</p>
          </div>
          <div className="p-4 border-2 border-gray-300 rounded-lg">
            <h2 className="text-2xl font-bold text-center">3+</h2>
            <p className="text-center">Social networks supported</p>
          </div>
          <div className="p-4 border-2 border-gray-300 rounded-lg">
            <h2 className="text-2xl font-bold text-center">100%</h2>
            <p className="text-center">Satisfaction from our users</p>
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
