import { Button } from "@radix-ui/themes";

interface ShareProps {
  label: string;
  url: string;
  text: string;
  title: string;
}

function ShareButton({ label, url, text, title }: ShareProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url, title, text });
      } catch (error) {
        console.log("Failed to share.");
      }
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <Button className="share-button" onClick={handleShare}>
      <span className="share-button-text">{label}</span>
    </Button>
  );
}

export { ShareButton };
