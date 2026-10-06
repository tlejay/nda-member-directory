import { MemberCard } from "@/components/member-card";
import { PixelMark } from "@/components/pixel-mark";
import { loadMembers } from "@/lib/members";

export default function Home() {
  // Reads members/index.ts + members/*.json at build time.
  // A malformed card throws here and fails the build.
  const members = loadMembers();

  return (
    <div className="relative">
      <div className="pixel-field pointer-events-none absolute inset-x-0 top-0 h-80" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-12 pb-16 sm:px-8 sm:pt-20">
        <header className="max-w-2xl">
          <div className="flex items-center gap-3">
            <PixelMark />
            <p className="text-sm font-medium tracking-wide text-nda-dark">
              Vibe Code Club by NDA
            </p>
          </div>
          <h1 className="mt-6 text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
            NDA Member Directory
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            ทำเนียบสมาชิก Vibe Code Club by NDA สมาคมดิจิทัลนครราชสีมา
            ทุกการ์ดในหน้านี้ เจ้าของการ์ดเป็นคนเพิ่มเองผ่าน Pull Request
          </p>
        </header>

        <div className="mt-12 flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
          <p className="font-bold">สมาชิกทั้งหมด</p>
          <p className="text-sm text-ink/60">
            <span className="text-base font-bold text-ink">{members.length}</span> การ์ด
          </p>
        </div>

        <main>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <MemberCard key={member.github} member={member} />
            ))}
          </ul>
        </main>

        <footer className="mt-16 flex flex-col gap-2 border-t border-ink/15 pt-6 text-sm text-ink/60 sm:flex-row sm:justify-between">
          <p>
            อยากมีการ์ดของตัวเอง? เพิ่มไฟล์ <code className="text-ink">members/ชื่อ-github.json</code>{" "}
            แล้วเปิด Pull Request — ขั้นตอนอยู่ใน README
          </p>
          <p className="shrink-0">สมาคมดิจิทัลนครราชสีมา (NDA)</p>
        </footer>
      </div>
    </div>
  );
}
