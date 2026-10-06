Closes #<เลข issue ของคุณ>

## การ์ดของใคร

<!-- ชื่อ + GitHub username ของคุณ -->

## เช็คลิสต์ก่อนขอรีวิว

- [ ] Branch ชื่อ `add-<username>` และแตกมาจาก `main`
- [ ] แก้แค่ 2 ไฟล์: `members/<username>.json` ของตัวเอง กับเพิ่ม 1 บรรทัดใน `members/index.ts`
- [ ] ไม่ได้แตะไฟล์การ์ดของคนอื่น
- [ ] ข้อมูลในการ์ดเป็นของฉันเอง และฉันยินยอมให้เผยแพร่
- [ ] รัน `pnpm lint` `pnpm typecheck` `pnpm build` ผ่านครบในเครื่อง
- [ ] บรรทัดบนสุดของ PR นี้มี `Closes #<เลข issue>` แล้ว

## ถ้าเจอ conflict (ข้ามได้ถ้าไม่เจอ)

- [ ] แก้ด้วย `git merge main` — ไม่ rebase ไม่ force push
- [ ] ชื่อของสมาชิกทุกคนที่อยู่บน `main` ยังอยู่ครบใน `members/index.ts`
- [ ] รัน `pnpm build` ผ่านอีกรอบหลังแก้ conflict
