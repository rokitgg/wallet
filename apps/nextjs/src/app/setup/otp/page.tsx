import { Footer } from "~/components/layout/footer";
import { OTP } from "./_components/otp";
export default async function VerifyOTP({
  searchParams,
}: { searchParams: Promise<{ email: string }> }) {
  const { email } = await searchParams;
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 max-w-sm mx-auto">
      <OTP email={email} />
      <Footer />
    </main>
  );
}
