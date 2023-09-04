import { Button } from "@radix-ui/themes";
import { useCreateGame } from "../store/useStore";

export function NewGameLanding() {
  const [error, isLoading, , action] = useCreateGame();

  return (
    <div>
      {error && <div>error</div>}
      {!isLoading ? (
        <Button onClick={action}>Create Game</Button>
      ) : (
        <div>Creating Game please wait</div>
      )}
    </div>
  );
}
