import { FollowUs } from "~/components/home";
import { Footer } from "~/components/ui/footer/footer";
import { NavigationBar } from "~/components/ui/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      <main className="flex flex-col items-center text-[14px] sm:text-[16px]">
        {children}
      </main>
      <FollowUs />
      <Footer />
    </>
  );
}