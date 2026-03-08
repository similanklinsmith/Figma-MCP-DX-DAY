import React from 'react'
import { images } from '../assets/images'
import Button from './Button'

const imgDivider = images['img-divider']

// Result drinks (4 scenarios)
const RESULTS = {
  'A-A': { name: 'The Icy Crystal Matcha', description: 'มัทฉะเย็นเฉียบในแก้วคริสตัล คุณคือสาย Precision ที่ส่งมอบงานแบบ High-end ทุกอย่างต้องเนียน กริบ และสมบูรณ์แบบที่สุด', image: 'img-the_icy_crystal_matcha', price: 190 },
  'A-B': { name: 'The Warm Earthy Matcha', description: 'มัทฉะอุ่นในถ้วยดินเผา เน้นผลลัพธ์ ความรวดเร็ว และความเป็นมืออาชีพแบบไฮเอนด์', image: 'img-the_warm_earthy', price: 120 },
  'B-A': { name: 'The Sparkling Crystal Fizz', description: 'โซดาผลไม้ในแก้วทรงสูง เน้นความสดใหม่ พลังบวก และการสร้างความตื่นตาตื่นใจให้ User', image: 'img-the_sparkling_crystal_fizz', price: 120 },
  'B-B': { name: 'The Cozy Velvet Cocoa', description: 'โกโก้อุ่นในแก้วมักใบโปรด เน้นความรู้สึก ความอบอุ่น และการออกแบบที่โอบรับผู้ใช้งานทุกกลุ่ม', image: 'img-the_cozy_velvet_cocoa', price: 100 },
}

// Scoring: count A/B from Q1–Q4; tie-break by Q2
function getBaseFlavor(answers) {
  const ids = [answers[1], answers[2], answers[3], answers[4]]
  const aCount = ids.filter(id => id === 'A').length
  const bCount = ids.filter(id => id === 'B').length
  if (aCount > bCount) return 'A'
  if (bCount > aCount) return 'B'
  return answers[2] === 'A' ? 'A' : 'B'   // tie → Q2 decides
}

const Divider = () => (
  <div className="h-0 relative w-full">
    <div className="absolute inset-[-1px_0_0_0]">
      <img alt="" className="block max-w-none size-full" src={imgDivider} />
    </div>
  </div>
)

export default function Summary({ answers, onRetake }) {
  const baseFlavor = getBaseFlavor(answers)
  const q5 = answers[5] || 'A'
  const result = RESULTS[`${baseFlavor}-${q5}`]

  return (
    <div className="bg-[#fffbf0] w-full flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-start w-full max-w-[375px] relative m-2">

        {/* Top torn border */}
        <div className="h-[20px] relative w-full">
          <div className="absolute inset-[-5.58%_0_0_0]">
            <img alt="" className="block max-w-none w-full" src={images['img-border']} />
          </div>
        </div>

        {/* Card body */}
        <div className="bg-[#fefefe] border-[#ece8e5] border-l border-r flex flex-col w-full">

          {/* Header */}
          <div className="flex items-center justify-center p-6">
            <p className="font-mono text-[#0e0e0e] text-sm text-center">
              **HAVE GOOD DAY**
            </p>
          </div>

          {/* Main content */}
          <div className="flex flex-col gap-6 items-center pb-8 pt-6 px-6 w-full">

            {/* Result drink image */}
            <div className="w-[200px] h-[200px] flex items-center justify-center overflow-hidden shrink-0">
              <img src={images[result.image]} alt={result.name} className="w-full h-full object-contain" />
            </div>

            {/* Drink name + description */}
            <div className="flex flex-col gap-2 items-start text-[#0e0e0e] w-full">
              <p className="font-mono text-[20px] uppercase leading-6 w-full">{result.name}</p>
              <p className="font-sans text-[14px] leading-5 w-full">{result.description}</p>
            </div>

            <Divider />

            {/* Single result item */}
            <div className="flex flex-col gap-2 items-start w-full text-[#0e0e0e]">
              <div className="flex gap-3 items-start w-full font-mono text-[14px]">
                <p className="w-[40px]">QTY</p>
                <p className="flex-1">ITEM</p>
                <p className="w-[72px] text-right">AMT(BAHT)</p>
              </div>
              <div className="flex gap-3 items-start w-full font-mono text-[14px]">
                <p className="w-[40px]">01</p>
                <p className="flex-1">{result.name}</p>
                <p className="w-[72px] text-right">{result.price.toFixed(2)}</p>
              </div>
            </div>

            <Divider />

            {/* Totals */}
            <div className="flex flex-col gap-2 items-start w-full text-[#0e0e0e] font-mono text-[14px]">
              <div className="flex items-start w-full">
                <p className="flex-1">ITEM COUNT:</p>
                <p className="text-right">01</p>
              </div>
              <div className="flex items-start w-full">
                <p className="flex-1">TOTAL AMT(BAHT):</p>
                <p className="text-right">{result.price.toFixed(2)}</p>
              </div>
            </div>

            <Divider />

            {/* Card info */}
            <div className="flex flex-col gap-2 items-start w-full text-[#0e0e0e] font-mono text-[14px]">
              <div className="flex items-start w-full">
                <p className="shrink-0 mr-3">CARD:</p>
                <p className="flex-1 text-right">*** *** ***789</p>
              </div>
              <div className="flex items-start w-full">
                <p className="flex-1">CARD HOLDER:</p>
                <p className="flex-1 text-right">DXer</p>
              </div>
            </div>

            <Divider />

            {/* Thank you line */}
            <div className="flex gap-3 items-center justify-center w-full font-mono text-[#0e0e0e] text-[14px] text-center">
              <p>⊹ ✪ Mystic Drink ✪ ˖</p>
              <p>THANK YOU</p>
            </div>
          </div>

          {/* Retake button */}
          <div className="flex flex-col items-center pb-10 px-6 w-full">
            <Button onClick={onRetake}>เล่นใหม่อีกครั้ง</Button>
          </div>
        </div>

        {/* Bottom torn border (flipped) */}
        <div className="flex items-center justify-center relative w-full" style={{ transform: 'scaleY(-1)' }}>
          <div className="h-[20px] relative w-full">
            <div className="absolute inset-[-5.58%_0_0_0]">
              <img alt="" className="block max-w-none w-full" src={images['img-border']} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
