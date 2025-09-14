import { FollowUs } from "~/components/home/follow-us/follow-us";
import { Footer } from "~/components/ui/footer/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex flex-col items-center text-[14px] sm:text-[16px]">
        {children}
      </main>
      <FollowUs />
      <Footer />
    </>
  );
}