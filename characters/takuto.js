// ============================================================
//  สึงาชิ ทาคุโตะ (patch 2.2 new) — เริ่มย้ายจาก server.js เฉพาะกลไกกันตาย (สกิลติดตัว 1)
//  ยังไม่ได้ย้ายทั้งตัวละคร — สกิลพื้นฐาน/รอง/ท่าไม้ตายอื่นๆ ยังอยู่ server.js ตามเดิม
//  ดู characters/index.js สำหรับไฟล์มัดรวม, characters/kuwagata.js สำหรับกลไกกันตายที่ใช้ dispatcher เดียวกัน
// ============================================================

const TAKUTO_APPRIVOISE_TURNS = 10; // ฉันคว้ามันได้แล้ว: กันตายทำงาน -> นับเวลาใหม่เต็ม 10 เทิร์น (patch 2.2.3)
const TAKUTO_FORTUNE_GRANT = 2;     // สกิลติดตัว 1: กันตายทำงานเมื่อไหร่ มอบโชคลาภ 2 หน่วย
const TAKUTO_BEATSAVE_HEAL = 2;     // สกิลติดตัว 1 (patch 2.2.4): กันตายทำงาน -> ฟื้นพลังชีวิต +2 เพิ่มเติม
const TAKUTO_BEATSAVE_ARMOR = 2;    // สกิลติดตัว 1 (patch 2.2.4): กันตายทำงาน -> ฟื้นเกราะ +2 เพิ่มเติม

module.exports = {
  id: "takuto",

  // เรียกจาก server.js's maybeBeatSave(p) (universal dispatcher) — ทำงานเฉพาะตอน Apprivoise! กำลังทำงานอยู่เท่านั้น
  //  (ร่างปกติไม่กันตาย — ดูสกิลติดตัว 3 แทน ซึ่งยังไม่ได้ย้าย) คืน true ถ้าทำงาน, false ถ้าเงื่อนไขไม่ครบ
  tryDeathSave(engine, p) {
    if (!((p.statuses.apprivoise || 0) > 0)) return false;
    p.hp = 1;
    p.beatSaved = true;
    p.statuses.apprivoise = TAKUTO_APPRIVOISE_TURNS; // กันตายทำงาน -> นับเวลาฉันคว้ามันได้แล้วใหม่เต็ม (ลดเทิร์นตามปกติต่อไป ไม่ถาวร)
    p.takutoAwakenAt = engine.nextTransformCounter(); // เพลง/ภาพซ้อนทับใช้ลำดับล่าสุด (กรณีมีทาคุโตะหลายคน)
    engine.triggerCutscene(p, "takutoAwaken"); // takuto_passive2.mp4 -> เปลี่ยนภาพเป็น tauburn_un.jpg + เพลง takuto2 ถาวร
    const healedHp = engine.healHp(p, TAKUTO_BEATSAVE_HEAL);
    const healedArmor = engine.healArmor(p, TAKUTO_BEATSAVE_ARMOR);
    p.statuses.fortune = Math.min(engine.BARD_FORTUNE_MAX, (p.statuses.fortune || 0) + TAKUTO_FORTUNE_GRANT);
    p.fortuneIdle = 0;
    engine.log(`✨ ${p.name} ฉันยัง...มองเห็นอยู่!!! — รอดจากความเสียหายถึงตาย! (กันตายได้ครั้งเดียวต่อเกม) ฟื้นพลังชีวิต +${healedHp} เกราะ +${healedArmor} ได้รับโชคลาภ +${TAKUTO_FORTUNE_GRANT} และร่างฉันคว้ามันได้แล้วนับเวลาใหม่เต็ม ${TAKUTO_APPRIVOISE_TURNS} เทิร์น`);
    return true;
  },
};
