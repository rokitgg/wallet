import { Footer } from "~/components/layout/footer";
import { EmailSetup } from "./_components/email";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 max-w-sm mx-auto">
      <EmailSetup />
      <Footer />
    </main>
  );
}
