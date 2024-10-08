import Link from "next/link";
import { LinkIt } from "react-linkify-it";
import UserLinkWithTooltip from "./UserLinkWithTooltip";

interface LinkifyProps {
  children: React.ReactNode;
}

export default function Linkify({ children }: LinkifyProps) {
  return (
    <LinkifyUsername>
      <LinkifyHashtag>
        <LinkifyUrl>{children}</LinkifyUrl>
      </LinkifyHashtag>
    </LinkifyUsername>
  );
}

function LinkifyUrl({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={
        /(https?:?\/\/\S+)|(www\.\S+\.[a-z]{2,})|([a-z0-9-]+\.(?:com|net|org|edu|gov|mil|io|app|dev)(?!\S))/gi
      }
      component={(match, key) => {
        let href = match;
        if (href.startsWith("https://")) {
          href = href.replace("https://", "https://");
        } else if (
          !href.startsWith("http://") &&
          !href.startsWith("https://")
        ) {
          href = `https://${href}`;
        }
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {match}
          </a>
        );
      }}
    >
      {children}
    </LinkIt>
  );
}

function LinkifyUsername({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9_-]+)/}
      component={(match, key) => (
        <UserLinkWithTooltip key={key} username={match.slice(1)}>
          {match}
        </UserLinkWithTooltip>
      )}
    >
      {children}
    </LinkIt>
  );
}

function LinkifyHashtag({ children }: LinkifyProps) {
  return (
    <LinkIt
      regex={/(#[a-zA-Z0-9]+)/}
      component={(match, key) => (
        <Link
          key={key}
          href={`/hashtag/${match.slice(1)}`}
          className="text-primary hover:underline"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
}
