import { useState, useRef, useEffect } from 'react'
import { images } from '../assets/images'
import Button from './Button'

const imgDivider = images['img-divider']

// ─── PRINTING ANIMATION CONFIG ────────────────────────────────────────────────
const PRINT_STEP_PX = 10    // px added to slip height per tick
const PRINT_TICK_MS = 70    // ms between ticks  (lower = faster)
const JITTER_PX = 0.5   // ±px horizontal motor jitter amplitude
const JITTER_TICK_MS = 100   // ms between jitter updates
const PAUSE_AFTER_PRINT_MS = 600  // ms to wait before printer starts fading
const PRINTER_FADE_MS = 800   // ms for printer opacity → 0 (ease-out)
const SLIP_EXPAND_MS = 600   // ms for slip width/scale expansion after printer gone
const SLIP_EXPAND_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)' // spring overshoot feel
// ──────────────────────────────────────────────────────────────────────────────

// Result drinks (4 scenarios)
const RESULTS = {
  'A-A': { name: 'The Icy Crystal Matcha', description: 'มัทฉะเย็นเฉียบในแก้วคริสตัล คุณคือสาย Precision ที่ส่งมอบงานแบบ High-end ทุกอย่างต้องเนียน กริบ และสมบูรณ์แบบที่สุด ขอให้สายตาที่เฉียบคมของคุณ มองเห็น Edge-case ที่คนอื่นมองข้าม และขอให้เครื่องดื่มนี้ช่วยเติมพลังในวันที่ต้องสู้กับงาน', image: 'img-the_icy_crystal_matcha', price: 190 },
  'A-B': { name: 'The Warm Earthy Matcha', description: 'มัทฉะอุ่นในถ้วยดินเผา คุณคือผู้อยู่เบื้องหลังความสำเร็จที่มั่นคง งานของคุณไม่ได้เน้นความหวือหวา แต่เน้นความหมายและทางแก้ที่ใช้งานได้จริง (Functional First) เหมือนถ้วยดินเผาที่เก็บกักความร้อนได้ยาวนาน ขอให้ความสงบของคุณเป็นที่พึ่งให้กับทีมในวันที่ Requirement วุ่นวาย และขอให้ความถ่อมตัวของคุณนำไปสู่ Insight ที่เข้าถึงหัวใจ User อย่างแท้จริง', image: 'img-the_warm_earthy', price: 120 },
  'B-A': { name: 'The Sparkling Crystal Fizz', description: 'โซดาผลไม้ในแก้วทรงสูง เน้นความสดใหม่ พลังบวก และการสร้างความตื่นตาตื่นใจให้ User ขอให้ความคิดสร้างสรรค์ของคุณไม่มีวันแห้งเหือด และขอให้ความสดชื่นของเครื่องดื่มนี้เพิ่มความสดใสให้คุณผลิตผลงานที่ทำให้คนทั้งโลกต้องหันมอง', image: 'img-the_sparkling_crystal_fizz', price: 120 },
  'B-B': { name: 'The Cozy Velvet Cocoa', description: 'โกโก้อุ่นในแก้วมักใบโปรด เน้นความรู้สึก ความอบอุ่น และการออกแบบที่โอบรับผู้ใช้งานทุกกลุ่ม ขอให้ความใจดีของคุณสะท้อนออกมาในงานที่ให้ความรู้สึกปลอดภัยและเข้าถึงง่ายสำหรับทุกคน', image: 'img-the_cozy_velvet_cocoa', price: 100 },
}

function getBaseFlavor(answers) {
  const ids = [answers[1], answers[2], answers[3], answers[4]]
  const aCount = ids.filter(id => id === 'A').length
  const bCount = ids.filter(id => id === 'B').length
  if (aCount > bCount) return 'A'
  if (bCount > aCount) return 'B'
  return answers[2] === 'A' ? 'A' : 'B'
}

const Divider = () => (
  <div className="h-0 relative w-full">
    <div className="absolute inset-[-1px_0_0_0]">
      <img alt="" className="block max-w-none size-full" src={imgDivider} />
    </div>
  </div>
)

// reverseIndex 0 = first visible (bottom of slip), higher = last visible (top of slip)
const SlipRow = ({ children, reverseIndex }) => (
  <div
    className="w-full"
    style={{
      opacity: 0,
      animation: `rowFadeIn 0.4s ease ${reverseIndex * 120}ms forwards`,
    }}
  >
    {children}
  </div>
)

const TornBorder = ({ flip = false }) => (
  <div
    className="h-[20px] relative w-full"
    style={flip ? { transform: 'scaleY(-1)' } : undefined}
  >
    <div className="absolute inset-[-5.58%_0_0_0]">
      <img alt="" className="block max-w-none w-full" src={images['img-border']} />
    </div>
  </div>
)

// Inline printer SVG — required to query #hole element via DOM
function PrinterSVG({ wrapperRef }) {
  return (
    <div ref={wrapperRef} className="w-full">
      <svg
        className="w-full block"
        viewBox="0 0 425 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 12C0 5.37258 5.37258 0 12 0H413C419.627 0 425 5.37258 425 12V88C425 94.6274 419.627 100 413 100H12C5.37259 100 0 94.6274 0 88V12Z" fill="url(#paint0_linear_107_788)" />
        <path d="M412.816 8C415.127 8 417 9.79086 417 12V88C417 90.2091 415.127 92 412.816 92H12.1841C9.8733 92 8 90.2091 8 88V12C8 9.79086 9.87331 8 12.1841 8H412.816Z" fill="url(#paint1_linear_107_788)" />
        <g filter="url(#filter0_di_107_788)">
          <rect id="hole" x="25" y="49" width="375" height="5" rx="2.5" fill="#171717" />
        </g>
        <defs>
          <filter id="filter0_di_107_788" x="25" y="49" width="375" height="6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_107_788" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_107_788" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_innerShadow_107_788" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_107_788" />
          </filter>
          <linearGradient id="paint0_linear_107_788" x1="213.022" y1="-1.14317e-07" x2="213.022" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F2F4F8" />
            <stop offset="1" stopColor="#CFCFCF" />
          </linearGradient>
          <linearGradient id="paint1_linear_107_788" x1="213" y1="8" x2="213" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E3E4E7" />
            <stop offset="1" stopColor="#CFCFCF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default function Summary({ answers, onRetake }) {
  const baseFlavor = getBaseFlavor(answers)
  const q5 = answers[5] || 'A'
  const result = RESULTS[`${baseFlavor}-${q5}`]

  // Slip height grows via setInterval (10px / 80ms = ~125px/s)
  const [slipHeight, setSlipHeight] = useState(0)
  // slipTopOffset: distance from container top to bottom of #hole
  const [slipTopOffset, setSlipTopOffset] = useState(0)
  // Slip horizontal bounds — start at hole width, expand to full after printing
  const [slipLeft, setSlipLeft] = useState(0)
  const [slipRight, setSlipRight] = useState(0)
  const [printDone, setPrintDone] = useState(false)
  const [printerFadingOut, setPrinterFadingOut] = useState(false)

  const containerRef = useRef(null)
  const printerWrapperRef = useRef(null)
  const contentRef = useRef(null)     // measures natural slip height
  const printIntervalRef = useRef(null)
  const jitterIntervalRef = useRef(null)
  const jitterXRef = useRef(0)         // read on each slipHeight re-render (no extra state)
  const fullHeightRef = useRef(0)
  const printDoneRef = useRef(false)
  const containerWidthRef = useRef(375)

  useEffect(() => {
    const containerEl = containerRef.current
    const printerEl = printerWrapperRef.current
    const contentEl = contentRef.current
    if (!containerEl || !printerEl || !contentEl) return

    // Find #hole in the inline SVG
    const svgEl = printerEl.querySelector('svg')
    const holeEl = svgEl?.querySelector('#hole')
      ?? svgEl?.querySelector('[data-layer-name="hole"]')

    const measureBounds = () => {
      const containerRect = containerEl.getBoundingClientRect()
      containerWidthRef.current = containerRect.width
      if (holeEl) {
        const holeRect = holeEl.getBoundingClientRect()
        return {
          top: holeRect.top + holeRect.height / 2 - containerRect.top,
          left: holeRect.left - containerRect.left,
          right: containerRect.right - holeRect.right,
        }
      }
      // Fallback: SVG hole spans x=25..400 of viewBox 425, y=51.5/100 (center)
      const printerRect = printerEl.getBoundingClientRect()
      const scale = printerRect.width / 425
      return {
        top: printerRect.height * 0.515,
        left: 25 * scale,
        right: 25 * scale,
      }
    }

    const bounds = measureBounds()
    setSlipTopOffset(bounds.top)
    setSlipLeft(bounds.left)
    setSlipRight(bounds.right)
    fullHeightRef.current = contentEl.scrollHeight

    // Grow slip PRINT_STEP_PX every PRINT_TICK_MS (mechanical printer feel)
    printIntervalRef.current = setInterval(() => {
      setSlipHeight(prev => {
        const next = prev + PRINT_STEP_PX
        const full = fullHeightRef.current
        if (next >= full) {
          clearInterval(printIntervalRef.current)
          clearInterval(jitterIntervalRef.current)
          jitterXRef.current = 0
          printDoneRef.current = true
          // 1. Wait, then expand slip to full width/scale
          setTimeout(() => {
            setPrintDone(true)
            setSlipLeft(0)
            setSlipRight(0)
            // 2. After slip finishes expanding, fade printer out
            setTimeout(() => {
              setPrinterFadingOut(true)
            }, SLIP_EXPAND_MS)
          }, PAUSE_AFTER_PRINT_MS)
          return full
        }
        return next
      })
    }, PRINT_TICK_MS)

    // ±JITTER_PX horizontal jitter to simulate motor vibration
    jitterIntervalRef.current = setInterval(() => {
      jitterXRef.current = (Math.random() - 0.5) * JITTER_PX * 2
    }, JITTER_TICK_MS)

    // Recalculate hole bounds on resize (only while still printing)
    const observer = new ResizeObserver(() => {
      if (printDoneRef.current) return
      const b = measureBounds()
      setSlipTopOffset(b.top)
      setSlipLeft(b.left)
      setSlipRight(b.right)
    })
    observer.observe(containerEl)

    return () => {
      clearInterval(printIntervalRef.current)
      clearInterval(jitterIntervalRef.current)
      observer.disconnect()
    }
  }, [])

  const containerW = containerWidthRef.current
  const slipScale = printDone ? 1 : Math.min(1, (containerW - slipLeft - slipRight) / containerW)

  return (
    <div className="bg-[#fffbf0] w-full flex items-center justify-center overflow-hidden py-8">
      <div
        ref={containerRef}
        className="relative w-full max-w-[375px] mx-2"
        style={{ minHeight: printerFadingOut ? 0 : slipTopOffset + slipHeight }}
      >

        {/* Printer — inline SVG so we can query #hole */}
        <div
          className="relative pointer-events-none"
          style={{
            opacity: printerFadingOut ? 0 : 1,
            display: printerFadingOut ? 'none' : '',
            transition: printerFadingOut ? `opacity ${PRINTER_FADE_MS}ms ease-out` : 'none',
          }}
        >
          <PrinterSVG wrapperRef={printerWrapperRef} />
        </div>

        {/*
          Slip wrapper — top at #hole bottom, left/right match hole width during
          printing, then expand to full container width on completion.
        */}
        <div
          style={{
            position: printerFadingOut ? 'relative' : 'absolute',
            top: printerFadingOut ? 0 : slipTopOffset,
            left: slipLeft,
            right: slipRight,
            zIndex: 1,
            overflow: printDone ? 'visible' : 'hidden',
            height: printerFadingOut ? slipHeight : slipHeight * slipScale,
            transition: printDone
              ? `left ${SLIP_EXPAND_MS}ms ease, right ${SLIP_EXPAND_MS}ms ease`
              : 'none',
          }}
        >
          {/* Content anchored to bottom — bottom-up reveal as wrapper grows */}
          <div
            ref={contentRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              width: containerW,
              transformOrigin: 'bottom center',
              transform: `translateX(calc(-50% + ${jitterXRef.current}px)) scale(${slipScale})`,
              transition: printDone ? `transform ${SLIP_EXPAND_MS}ms ${SLIP_EXPAND_EASING}` : 'none',
            }}
          >

            {/* Top torn border — revealed last (reverseIndex 13) */}
            <SlipRow reverseIndex={13}>
              <TornBorder />
            </SlipRow>

            {/* Card body */}
            <div className="bg-[#fefefe] border-[#ece8e5] border-l border-r flex flex-col w-full">

              <SlipRow reverseIndex={12}>
                <div className="flex items-center justify-center p-6">
                  <p className="font-mono text-[#0e0e0e] text-sm text-center">
                    **HAVE GOOD DAY**
                  </p>
                </div>
              </SlipRow>

              <div className="flex flex-col gap-6 items-center pb-8 pt-2 px-6 w-full">

                <SlipRow reverseIndex={11}>
                  <div className="w-[200px] h-[200px] flex items-center justify-center overflow-hidden shrink-0 mx-auto">
                    <img src={images[result.image]} alt={result.name} className="w-full h-full object-contain" />
                  </div>
                </SlipRow>

                <SlipRow reverseIndex={10}>
                  <div className="flex flex-col gap-2 items-start text-[#0e0e0e] w-full">
                    <p className="font-mono text-[20px] uppercase leading-6 w-full">{result.name}</p>
                    <p className="font-sans text-[14px] leading-5 w-full">{result.description}</p>
                  </div>
                </SlipRow>

                <SlipRow reverseIndex={9}><Divider /></SlipRow>

                <SlipRow reverseIndex={8}>
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
                </SlipRow>

                <SlipRow reverseIndex={7}><Divider /></SlipRow>

                <SlipRow reverseIndex={6}>
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
                </SlipRow>

                <SlipRow reverseIndex={5}><Divider /></SlipRow>

                <SlipRow reverseIndex={4}>
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
                </SlipRow>

                <SlipRow reverseIndex={3}><Divider /></SlipRow>

                <SlipRow reverseIndex={2}>
                  <div className="flex gap-3 items-center justify-center w-full font-mono text-[#0e0e0e] text-[14px] text-center">
                    <p>⊹ ✪ Mystic Drink ✪ ˖</p>
                    <p>THANK YOU</p>
                  </div>
                </SlipRow>

              </div>

              <SlipRow reverseIndex={1}>
                <div className="flex flex-col items-center pb-10 px-6 w-full">
                  <Button onClick={printerFadingOut ? onRetake : {}}>เล่นใหม่อีกครั้ง</Button>
                </div>
              </SlipRow>

            </div>

            {/* Bottom torn border — revealed first (reverseIndex 0) */}
            <SlipRow reverseIndex={0}>
              <TornBorder flip />
            </SlipRow>

          </div>
        </div>

      </div>
    </div>
  )
}
