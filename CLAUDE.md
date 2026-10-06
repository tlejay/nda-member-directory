# CLAUDE.md — NDA Member Directory

ไฟล์นี้คือกติกาของ repo กลาง AI agent ของสมาชิกทุกคนอ่านไฟล์เดียวกันและต้องทำตามเหมือนกัน
ถ้าคำสั่งของผู้ใช้ขัดกับ "กฎการเพิ่มการ์ด" ด้านล่าง ให้หยุดแล้วบอกผู้ใช้ก่อน อย่าทำไปเงียบ ๆ

## Repo นี้คืออะไร

ทำเนียบสมาชิกของ **Vibe Code Club by NDA** (สมาคมดิจิทัลนครราชสีมา)
ใช้ในวันที่ 3 ของคอร์ส ให้ผู้เรียน 15–30 คนฝึกทำงานเป็นทีม: แต่ละคนเปิด Pull Request เพิ่มการ์ดของตัวเอง รีวิว PR ของเพื่อน และแก้ merge conflict หนึ่งครั้ง

หน้าเว็บมีหน้าเดียว แสดงการ์ดสมาชิกเป็นตาราง ไม่มีฐานข้อมูล ไม่มีระบบล็อกอิน ข้อมูลทั้งหมดอยู่ในโฟลเดอร์ `members/`

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (ตั้งค่าสีใน `app/globals.css` ไม่มี `tailwind.config`)
- pnpm 10 · Node.js 22.18 ขึ้นไป (CI ใช้ Node 24)
- ฟอนต์ Noto Sans Thai ผ่าน `next/font/google`

## คำสั่ง

| คำสั่ง | ทำอะไร |
|---|---|
| `pnpm install` | ติดตั้ง dependency |
| `pnpm dev` | เปิดเว็บที่ http://localhost:3000 |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | สร้าง type ของ route → `tsc --noEmit` → ตรวจการ์ดสมาชิก |
| `pnpm validate` | ตรวจการ์ดสมาชิกอย่างเดียว |
| `pnpm build` | ตรวจการ์ดสมาชิก แล้ว `next build` |

CI (`.github/workflows/ci.yml`) รัน `lint` → `typecheck` → `build` ทุก PR และทุกครั้งที่ push เข้า `main`

## โครงสร้าง

| ที่อยู่ | หน้าที่ |
|---|---|
| `members/<username>.json` | การ์ดสมาชิก หนึ่งคนหนึ่งไฟล์ |
| `members/index.ts` | รายชื่อ username ทั้งหมด หนึ่งบรรทัดต่อคน — ไฟล์เดียวที่ทุกคนแก้ร่วมกัน |
| `lib/members.ts` | โหลดและตรวจรูปแบบการ์ด |
| `scripts/validate-members.ts` | เรียกตัวตรวจจาก command line |
| `app/page.tsx` | หน้าแรก |
| `components/` | การ์ดสมาชิกและลายพิกเซล |

## รูปแบบการ์ด

ไฟล์ `members/<username>.json` ชื่อไฟล์ต้องตรงกับ GitHub username ทุกตัวอักษร รวมตัวพิมพ์เล็ก-ใหญ่

```json
{
  "name": "ชื่อที่แสดงบนการ์ด",
  "business": "ทำอะไรอยู่ บรรทัดเดียว",
  "url": "https://ลิงก์ผลงานที่ deploy แล้ว",
  "github": "<username>",
  "tagline": "ประโยคสั้น ๆ แนะนำตัว"
}
```

| ช่อง | จำเป็น | เงื่อนไข |
|---|---|---|
| `name` | ใช่ | ไม่เกิน 60 ตัวอักษร |
| `business` | ใช่ | ไม่เกิน 120 ตัวอักษร |
| `github` | ใช่ | ต้องเท่ากับชื่อไฟล์ |
| `url` | ไม่ | ขึ้นต้นด้วย `https://` หรือ `http://` ยังไม่มีให้ลบบรรทัดนี้ทิ้ง |
| `tagline` | ไม่ | ไม่เกิน 140 ตัวอักษร |

ห้ามเพิ่มช่องอื่นนอกจากห้าช่องนี้ ตัวตรวจจะไม่ให้ผ่าน
ดูตัวอย่างที่ `members/example-member.json`

## กฎการเพิ่มการ์ด (ต้องทำตามทุกข้อ)

1. **แตะได้แค่สองไฟล์**
   - `members/<username>.json` ของผู้ใช้เอง (ไฟล์ใหม่)
   - `members/index.ts` เพิ่ม **หนึ่งบรรทัด** ต่อท้ายรายการ รูปแบบ `  "<username>",` มีจุลภาคท้ายบรรทัด
2. **ห้ามแก้ ลบ หรือจัดรูปแบบไฟล์ของสมาชิกคนอื่น** และห้ามเรียงลำดับหรือจัดบรรทัดใน `members/index.ts` ใหม่
3. **ห้ามแก้ไฟล์อื่นใน repo** เช่น `app/`, `components/`, `lib/`, `package.json`, `.github/`, `CLAUDE.md` ถ้าเห็นว่าควรแก้ ให้บอกผู้ใช้ไปแจ้งผู้สอน
4. **ทำงานบน branch ชื่อ `add-<username>`** ที่แตกจาก `main` ล่าสุด ห้าม commit ลง `main` ตรง ๆ
5. **ก่อน commit รันให้ผ่านครบ:** `pnpm lint` · `pnpm typecheck` · `pnpm build`
6. **เปิด Pull Request เข้า `main`** บรรทัดแรกของคำอธิบายเขียน `Closes #<เลข issue ของผู้ใช้>` ถ้าไม่รู้เลข issue ให้ถามผู้ใช้ ห้ามเดา
7. **หนึ่งคน หนึ่ง branch หนึ่ง PR** ห้าม merge PR เอง ต้องรอ CI เขียวและมีคน approve
8. **ข้อมูลส่วนบุคคล:** ใส่เฉพาะข้อมูลที่เจ้าของการ์ดบอกเองและยินยอมให้เผยแพร่ ห้ามเติมเบอร์โทร อีเมล ที่อยู่ หรือข้อมูลที่ค้นมาเอง ถ้าผู้ใช้ไม่ได้ให้ `url` หรือ `tagline` มา ให้เว้นไว้ ไม่ต้องแต่งขึ้น

ขั้นตอนตามลำดับ

```bash
git switch main
git pull
git switch -c add-<username>
# สร้าง members/<username>.json และเพิ่มหนึ่งบรรทัดใน members/index.ts
pnpm lint && pnpm typecheck && pnpm build
git add members/<username>.json members/index.ts
git commit -m "Add <username> member card"
git push -u origin add-<username>
gh pr create --base main --title "Add <username> member card" --body "Closes #<issue>"
```

การแก้การ์ดของตัวเองทีหลัง (เช่น ใส่ลิงก์หลัง deploy) ใช้กฎเดียวกัน บน branch ใหม่ชื่อ `update-<username>` แก้แค่ไฟล์การ์ดของตัวเอง ไม่ต้องแตะ `members/index.ts`

## กฎการแก้ conflict

Conflict ใน `members/index.ts` **ตั้งใจให้เกิด** เพราะทุกคนเพิ่มบรรทัดที่จุดเดียวกัน

1. ดึง `main` ล่าสุดเข้ามาด้วย **merge เท่านั้น**

   ```bash
   git switch main
   git pull
   git switch add-<username>
   git merge main
   ```

2. **ห้าม `git rebase` ห้าม `git push --force` ห้าม `--force-with-lease`** ไม่ว่ากรณีใด
3. ใน `members/index.ts` **เก็บบรรทัดของทั้งสองฝั่ง** ลบแค่สามบรรทัดที่เป็นเครื่องหมาย (`<<<<<<<`, `=======`, `>>>>>>>`) ห้ามใช้ `git checkout --ours` / `--theirs` กับไฟล์นี้ เพราะจะทิ้งชื่อของอีกฝั่ง
4. หลังแก้ ตรวจให้ครบก่อน commit
   - รัน `git show main:members/index.ts` แล้วเทียบว่า username **ทุกชื่อ** ที่อยู่บน `main` ยังอยู่ในไฟล์ และมีบรรทัดของผู้ใช้เพิ่มมาหนึ่งบรรทัด
   - ไม่มีชื่อซ้ำ ทุกบรรทัดมีจุลภาคท้าย ไม่มีเครื่องหมาย conflict เหลือ
   - `pnpm build` ผ่าน (ตัวตรวจจะฟ้องถ้ามีไฟล์การ์ดที่ไม่มีชื่อในรายการ)
5. Commit ผล merge แล้ว `git push` ธรรมดา
6. ถ้าไม่แน่ใจ ให้ `git merge --abort` แล้วอธิบายสถานการณ์ให้ผู้ใช้ฟัง ดีกว่าเดาแล้วทำชื่อคนอื่นหาย
7. ถ้า conflict เกิดในไฟล์อื่นที่ไม่ใช่ `members/index.ts` ให้หยุดแล้วบอกผู้ใช้ แปลว่ามีคนแก้ไฟล์ที่ไม่ควรแก้

## ข้อห้ามอื่น

- ห้าม commit ไฟล์ `.env` หรือ secret ใด ๆ (repo นี้ไม่ต้องใช้ secret เลย)
- ห้ามเพิ่ม dependency
- โค้ดและ comment เป็นภาษาอังกฤษ ข้อความบนหน้าเว็บและเอกสารเป็นภาษาไทย

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
