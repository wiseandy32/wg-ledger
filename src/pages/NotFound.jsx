import { Button } from "@/components/ui/button";
import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NotFoundError() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">Oops! Page Not Found.</span>
        <p className="text-center text-muted-foreground">
          It seems like the page you&apos;re looking for does not exist or might
          have been removed.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button variant="gooeyLeft" onClick={() => navigate("/")}>
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
