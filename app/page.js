import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import LandingPage from "./landing-page";
import CompetitorDashboard from "./dashboard/pages/_competer/page";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between p-2 bg-slate-100">
        <div>Hello There</div>
        <div className="bg-slate-200 p-1 rounded-lg cursor justify-center">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <div className="m-0 p-0 justify-center">
        <LandingPage />
      </div>
    </div>
  );
}
