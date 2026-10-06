import type { Member } from "@/lib/members";
import { PixelAvatar } from "./pixel-avatar";

// The seed card learners copy from. It gets a visible "example" badge.
const EXAMPLE_ID = "example-member";

function displayHost(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function MemberCard({ member }: { member: Member }) {
  const isExample = member.github === EXAMPLE_ID;

  return (
    <li className="card-lift flex flex-col border border-ink/15 bg-white p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <PixelAvatar seed={member.github} />
        <div className="min-w-0 flex-1">
          <h2 className="text-lg leading-snug font-bold break-words">{member.name}</h2>
          <a
            href={`https://github.com/${member.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm break-all text-ink/60 underline-offset-4 hover:text-nda-dark hover:underline"
          >
            @{member.github}
          </a>
        </div>
        {isExample ? (
          <span className="shrink-0 bg-ink px-2 py-1 text-xs font-medium text-paper">
            ตัวอย่าง
          </span>
        ) : null}
      </div>

      <p className="mt-5 leading-relaxed break-words">{member.business}</p>

      {member.tagline ? (
        <p className="mt-3 border-l-4 border-nda pl-3 text-sm leading-relaxed break-words text-ink/70">
          {member.tagline}
        </p>
      ) : null}

      <div className="mt-auto pt-6">
        {member.url ? (
          <a
            href={member.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center gap-2 bg-ink px-4 py-2.5 text-sm font-medium text-paper hover:bg-nda-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nda-dark"
          >
            <span className="size-2 shrink-0 bg-nda" aria-hidden="true" />
            <span className="truncate">{displayHost(member.url)}</span>
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(เปิดในแท็บใหม่)</span>
          </a>
        ) : (
          <p className="text-sm text-ink/50">ยังไม่มีลิงก์ผลงาน — กำลังสร้างอยู่</p>
        )}
      </div>
    </li>
  );
}
