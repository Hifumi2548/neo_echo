// ============================================================
//  คุวากาตะโอเจอร์ (patch 2.2 alpha) — Rainbow Pudding (สกิลพื้นฐาน)
//  ย้ายออกมาจาก server.js (useSkill()) — ดู characters/index.js สำหรับไฟล์มัดรวม
//  หมายเหตุ: กลไก Beat Mode/สวมเกราะราชัน (beatActive/maybeBeatSave/maybeBeatMode/Ohger Finish)
//  ใช้ร่วมกับทาคุโตะและเป็น core engine mechanic — ยังไม่ย้าย (อยู่นอกขอบเขต Phase 1)
// ============================================================

const KUWAGATA_PUDDING_FULL_AT = 3;      // Rainbow Pudding: กินครบทุกๆ 3 ครั้ง = อิ่ม
const KUWAGATA_PUDDING_NODRAW_TURNS = 2; // อิ่ม: จั่วการ์ดเพิ่มไม่ได้ 2 เทิร์น

module.exports = {
  id: "kuwagata",

  // เรียกจาก useSkill() ในส่วน effect (isPudding === true — สกิลพื้นฐาน กินได้ไม่จำกัดจำนวนครั้ง)
  applyBasicPudding(p, log) {
    p.puddingCount = (p.puddingCount || 0) + 1;
    if (p.puddingCount % KUWAGATA_PUDDING_FULL_AT === 0) {
      p.statuses.nodraw = Math.max(p.statuses.nodraw || 0, KUWAGATA_PUDDING_NODRAW_TURNS);
      p.noDrawNext = Math.max(p.noDrawNext || 0, KUWAGATA_PUDDING_NODRAW_TURNS);
      log(`🍮 ${p.name} กิน Rainbow Pudding ครบ ${p.puddingCount} ชิ้น — อิ่ม! จั่วการ์ดเพิ่มไม่ได้ ${KUWAGATA_PUDDING_NODRAW_TURNS} เทิร์น`);
    }
  },
};
