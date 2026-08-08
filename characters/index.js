// ============================================================
//  ไฟล์มัดรวม (bundle) — รวมทุกไฟล์สคริปต์ตัวละครที่แยกออกมาจาก server.js
//  ใน server.js เรียกใช้ผ่าน CHAR_HOOKS[characterId] เท่านั้น
//
//  หมายเหตุ (สถานะ ณ วันที่เริ่มโปรเจกต์): ตัวละครส่วนใหญ่ยังอยู่ใน server.js
//  ตามเดิม (useSkill()/doAttack() ยังเป็นไฟล์เดียวสำหรับตัวที่ยังไม่ได้ย้าย) —
//  นี่คือโปรเจกต์แยกที่ทยอยย้ายทีละตัวละคร ไม่ได้ทำเสร็จในครั้งเดียว
// ============================================================

const tohno = require("./tohno");
const temari = require("./temari");
const kuwagata = require("./kuwagata");
const eva13 = require("./eva13");
const oberon = require("./oberon");

const CHARACTER_MODULES = [
  tohno,
  temari,
  kuwagata,
  eva13,
  oberon,
];

const CHAR_HOOKS = {};
for (const mod of CHARACTER_MODULES) CHAR_HOOKS[mod.id] = mod;

module.exports = CHAR_HOOKS;
