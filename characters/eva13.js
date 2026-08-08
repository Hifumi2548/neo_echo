// ============================================================
//  เอวานเกเลี่ยน หมายเลข 13 (patch 2.2 alpha) — หอกแห่งแคสเซียส (สกิลพื้นฐาน)
//  ย้ายออกมาจาก server.js (useSkill()/doAttack()) — ดู characters/index.js สำหรับไฟล์มัดรวม
//  หมายเหตุ: RS-Hopper/หอกลองกินัส/Fourth Impact ยังอยู่นอกขอบเขต Phase 1 (ผูกกับระบบ eva3Active ที่ใช้ร่วมหลายจุด)
// ============================================================

module.exports = {
  id: "eva13",

  // เรียกจาก useSkill() ในส่วน effect (isCassius === true) — แจ้งเตือนว่าการโจมตีปกติครั้งถัดไปจะฟื้นเลือด
  applyBasicCassius(p, log) {
    log(`🗡️ ${p.name} หอกแห่งแคสเซียส — การโจมตีปกติครั้งถัดไปจะฟื้นพลังชีวิตตามความเสียหายที่ทำได้`);
  },

  // เรียกจาก doAttack() หลังคำนวณดาเมจแล้ว — คืน heal amount ถ้าทำงาน (ใช้แล้วหมดไป) หรือ 0
  onAttackConsumeCassius(engine, attacker, dmg) {
    if (!((attacker.statuses.cassius || 0) > 0)) return 0;
    delete attacker.statuses.cassius;
    const heal = engine.healHp(attacker, dmg);
    if (heal > 0) engine.log(`🗡️ ${attacker.name} หอกแห่งแคสเซียส — ฟื้นพลังชีวิตตามความเสียหายที่ทำได้ +${heal}`);
    return heal;
  },
};
