# NDA Member Directory

ทำเนียบสมาชิกของ **Vibe Code Club by NDA** (สมาคมดิจิทัลนครราชสีมา)
สมาชิกแต่ละคนเพิ่มการ์ดของตัวเองผ่าน Pull Request — repo นี้ใช้ฝึกทำงานเป็นทีมในวันที่ 3 ของคอร์ส

## รันในเครื่อง

ต้องมี Node.js 22.18 ขึ้นไป (แนะนำ 24) และ pnpm 10

```bash
pnpm install
pnpm dev        # เปิด http://localhost:3000
```

## เพิ่มการ์ดของตัวเอง

แทน `<username>` ด้วย GitHub username ของคุณ ตัวพิมพ์เล็ก-ใหญ่ต้องตรงกับใน GitHub

1. รับคำเชิญเข้า repo แล้ว clone ลงเครื่อง

   ```bash
   git clone https://github.com/tlejay/nda-member-directory.git
   cd nda-member-directory
   pnpm install
   ```

2. ดูเลข issue ที่มีชื่อคุณ แล้วแตก branch ใหม่จาก `main`

   ```bash
   git switch main
   git pull
   git switch -c add-<username>
   ```

3. สร้างไฟล์ `members/<username>.json` โดยคัดลอกจาก `members/example-member.json` แล้วแก้ทุกบรรทัด

   ```json
   {
     "name": "ชื่อที่อยากให้แสดง",
     "business": "ทำอะไรอยู่ เขียนบรรทัดเดียว",
     "url": "https://ลิงก์ผลงานของคุณ",
     "github": "<username>",
     "tagline": "ประโยคสั้น ๆ แนะนำตัว"
   }
   ```

   `url` กับ `tagline` ไม่ใส่ก็ได้ ถ้ายังไม่มีให้ลบบรรทัดนั้นทิ้ง
   ใส่เฉพาะข้อมูลที่คุณยินดีให้คนอื่นเห็น

4. เปิด `members/index.ts` แล้วเพิ่มชื่อคุณ **หนึ่งบรรทัดต่อท้ายรายการ** อย่าลืมจุลภาคท้ายบรรทัด

   ```ts
   export const memberIds: string[] = [
     "tlejay",
     "example-member",
     "<username>",
   ];
   ```

5. ตรวจในเครื่องให้ผ่านทั้งสามคำสั่ง

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm build
   ```

6. Commit, push แล้วเปิด Pull Request เข้า `main`

   ```bash
   git add members/<username>.json members/index.ts
   git commit -m "Add <username> member card"
   git push -u origin add-<username>
   ```

   บรรทัดแรกของ PR ต้องเขียน `Closes #<เลข issue ของคุณ>` แล้วขอรีวิวจากเพื่อนในกลุ่ม

7. รอ CI เขียวและมีเพื่อน approve หนึ่งคน จึง merge ได้

## เจอ conflict ทำอย่างไร

ทุกคนเพิ่มบรรทัดที่จุดเดียวกันใน `members/index.ts` พอ PR ของเพื่อนถูก merge ก่อน PR ของคุณจะชนกัน
เรื่องนี้ตั้งใจให้เกิด เป็นแบบฝึกหัดของคาบ ไม่ใช่ความผิดพลาด

```bash
git switch main
git pull
git switch add-<username>
git merge main
```

เปิด `members/index.ts` จะเห็นเครื่องหมายสามบรรทัด

```text
<<<<<<< HEAD
  "<username>",
=======
  "ชื่อเพื่อน",
>>>>>>> main
```

- ระหว่าง `<<<<<<<` กับ `=======` คือของคุณ
- ระหว่าง `=======` กับ `>>>>>>>` คือของที่อยู่บน `main`
- **เก็บไว้ทั้งสองฝั่ง** ลบแค่สามบรรทัดที่เป็นเครื่องหมาย

แล้วตรวจสองอย่างก่อน push

1. ชื่อของทุกคนที่อยู่บน `main` ยังอยู่ครบใน `members/index.ts`
2. `pnpm build` ผ่าน (ถ้ามีการ์ดของใครหลุดจากรายการ build จะฟ้องชื่อไฟล์ให้)

```bash
git add members/index.ts
git commit
git push
```

อยากเริ่มใหม่ระหว่างที่ยังแก้ไม่เสร็จ ใช้ `git merge --abort` ทุกอย่างจะกลับไปเหมือนก่อนสั่ง merge

**ห้ามใช้ `git rebase` และห้าม `git push --force` ใน repo นี้**

## อัปเดตลิงก์ผลงานทีหลัง

Deploy ผลงานเสร็จแล้วอยากใส่ลิงก์ ทำวงจรเดิมอีกรอบบน branch ใหม่ (เช่น `update-<username>`)
รอบนี้แก้แค่ช่อง `url` ในไฟล์การ์ดของตัวเอง ไม่ต้องแตะ `members/index.ts`

## คำสั่งทั้งหมด

| คำสั่ง | ทำอะไร |
|---|---|
| `pnpm dev` | เปิดเว็บในเครื่อง |
| `pnpm lint` | ตรวจรูปแบบโค้ด |
| `pnpm typecheck` | ตรวจ type และตรวจการ์ดสมาชิกทุกใบ |
| `pnpm validate` | ตรวจการ์ดสมาชิกอย่างเดียว (เร็วสุด) |
| `pnpm build` | ตรวจการ์ด แล้ว build แบบ production |

กติกาฉบับเต็มสำหรับ AI agent อยู่ใน [`CLAUDE.md`](./CLAUDE.md)
