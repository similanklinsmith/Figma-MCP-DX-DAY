import React, { useState, useRef, useEffect } from 'react'
import Option from './Option'

const imgUnion = "http://localhost:3845/assets/bc665661c1e59f84278aa762ef97ca6fe57b1ab6.svg"
const imgUnion1 = "http://localhost:3845/assets/4dccf55c7f757076d0f153f543d7adf2466a9077.svg"
const imgLine2 = "http://localhost:3845/assets/39e583e8e4c04c394ae43c5d7cf8c9a46aef39af.svg"

const ANIMATION_DURATION = 1000

// Build a filled path whose width follows sin(t/2) — 0 at t=0, peak at t=π, 0 at t=2π
function buildTaperedPath(cx, cy, rx, ry, maxWidth, n = 80) {
    const outer = []
    const inner = []
    for (let i = 0; i <= n; i++) {
        const t = (i / n) * Math.PI * 2
        const w = (maxWidth / 2) * Math.sin(t / 2)
        const ex = cx + rx * Math.cos(t)
        const ey = cy + ry * Math.sin(t)
        const nxr = ry * Math.cos(t)
        const nyr = rx * Math.sin(t)
        const len = Math.sqrt(nxr * nxr + nyr * nyr)
        const nx = nxr / len
        const ny = nyr / len
        outer.push([ex + nx * w, ey + ny * w])
        inner.push([ex - nx * w, ey - ny * w])
    }
    const pts = [...outer, ...[...inner].reverse()]
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ') + 'Z'
}

// Pie-slice mask path that sweeps from angle 0 clockwise to `angle` radians
function maskArcPath(cx, cy, angle) {
    if (angle <= 0) return 'M0,0'
    if (angle >= Math.PI * 2 - 0.001) return 'M-50,-50 H150 V150 H-50 Z'
    const r = 80
    const x1 = (cx + r * Math.cos(0)).toFixed(2)
    const y1 = (cy + r * Math.sin(0)).toFixed(2)
    const x2 = (cx + r * Math.cos(angle)).toFixed(2)
    const y2 = (cy + r * Math.sin(angle)).toFixed(2)
    const largeArc = angle > Math.PI ? 1 : 0
    return `M${cx},${cy} L${x1},${y1} A${r},${r},0,${largeArc},1,${x2},${y2} Z`
}

// Pre-computed at module level (parameters are fixed)
const TAPERED_PATH   = buildTaperedPath(50, 50, 46, 46, 5)
const TAPERED_PATH_2 = buildTaperedPath(50, 51, 45, 45, 2)

function CrayonCircle({ animated }) {
    const [maskAngle, setMaskAngle] = useState(animated ? 0 : Math.PI * 2)
    const rafRef = useRef(null)

    useEffect(() => {
        if (!animated) {
            setMaskAngle(Math.PI * 2)
            return
        }
        setMaskAngle(0)
        const start = performance.now()
        function frame(now) {
            const p = Math.min((now - start) / ANIMATION_DURATION, 1)
            // ease-in-out
            const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
            setMaskAngle(eased * Math.PI * 2)
            if (p < 1) rafRef.current = requestAnimationFrame(frame)
        }
        rafRef.current = requestAnimationFrame(frame)
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    }, [animated])

    const maskD = maskArcPath(50, 50, maskAngle)

    return (
        <svg
            className="absolute pointer-events-none"
            style={{ inset: '-10px', width: 'calc(100% + 20px)', height: 'calc(60% + 20px)' }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            overflow="visible"
        >
            <defs>
                <filter id="crayon" x="-25%" y="-25%" width="150%" height="150%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                </filter>
                <mask id="crayonMask">
                    <path d={maskD} fill="white" />
                </mask>
            </defs>
            {/* Primary tapered stroke */}
            <path d={TAPERED_PATH}   fill="#F76513" opacity="0.85" filter="url(#crayon)" mask="url(#crayonMask)" />
            {/* Texture depth pass */}
            <path d={TAPERED_PATH_2} fill="#F76513" opacity="0.35" filter="url(#crayon)" mask="url(#crayonMask)" />
        </svg>
    )
}

export default function Question({ questionNumber, question, options, onSubmit, onBack, initialAnswer }) {
    const [selected, setSelected] = useState(initialAnswer || null)
    const [isNew, setIsNew] = useState(false)
    const timerRef = useRef(null)
    const isAnimating = useRef(false)

    useEffect(() => {
        return () => { if (timerRef.current) clearTimeout(timerRef.current) }
    }, [])

    const handleSelect = (option) => {
        if (isAnimating.current) return
        if (timerRef.current) clearTimeout(timerRef.current)

        isAnimating.current = true

        if (selected === option.id) {
            // Already selected — navigate immediately, no animation replay
            timerRef.current = setTimeout(() => {
                isAnimating.current = false
                onSubmit(questionNumber, option.id)
            }, 50)
            return
        }

        setIsNew(true)
        setSelected(option.id)

        timerRef.current = setTimeout(() => {
            isAnimating.current = false
            onSubmit(questionNumber, option.id)
        }, ANIMATION_DURATION)
    }

    const handleBack = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        isAnimating.current = false
        onBack()
    }

    return (
        <div className="w-full flex items-center justify-center">
            <div className="z-1 flex flex-col items-start w-full max-w-[375px] min-h-[812px] relative m-2">

                {/* Top border */}
                <div className="h-[20px] relative w-full">
                    <div className="absolute h-[20px] left-0 top-0 w-full">
                        <img alt="" className="absolute block max-w-none size-full" src={imgUnion} />
                    </div>
                    <div className="absolute h-[20px] left-[0.5px] top-0 w-[calc(100%-1px)]">
                        <div className="absolute inset-[-5.58%_-0.13%_0_-0.13%]">
                            <img alt="" className="block max-w-none size-full" src={imgUnion1} />
                        </div>
                    </div>
                </div>

                {/* Main section */}
                <div className="bg-[#fefefe] border-[#ece8e5] border-l border-r flex flex-col w-full min-h-[812px]">

                    {/* Header: X/5 */}
                    <div className="flex flex-col items-center p-6">
                        <p className="font-mono text-[#0e0e0e] text-sm text-center w-full">
                            {questionNumber}/5
                        </p>
                    </div>

                    {/* Question + Options */}
                    <div className="flex flex-1 flex-col gap-6 items-center justify-center pt-2 px-6 w-full">
                        <p className="font-sans font-medium text-[#0e0e0e] text-[18px] leading-7 text-center w-full">
                            {question}
                        </p>

                        <div className="flex gap-6 items-start w-full">
                            {options.map((option) => (
                                <div
                                    key={option.title}
                                    onClick={() => handleSelect(option)}
                                    className="flex-1 cursor-pointer relative"
                                >
                                    <Option
                                        title={option.title}
                                        description={option.description}
                                        image={option.image}
                                    />
                                    {selected === option.id && (
                                        <CrayonCircle animated={isNew} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col gap-6 items-center pb-6 px-6 w-full">
                        <div className="h-0 w-full relative">
                            <div className="absolute inset-[-1px_0_0_0]">
                                <img alt="" className="block max-w-none size-full" src={imgLine2} />
                            </div>
                        </div>
                        <button
                            onClick={handleBack}
                            className="font-sans text-sm text-[#0e0e0e] text-center cursor-pointer hover:opacity-60 transition-opacity duration-200"
                        >
                            ← ย้อนกลับ
                        </button>
                    </div>
                </div>

                {/* Bottom border */}
                <div className="flex items-center justify-center relative w-full" style={{ transform: "scaleY(-1)" }}>
                    <div className="w-full">
                        <div className="h-[20px] relative w-full">
                            <div className="absolute h-[20px] left-0 top-0 w-full">
                                <img alt="" className="absolute block max-w-none size-full" src={imgUnion} />
                            </div>
                            <div className="absolute h-[20px] left-[0.5px] top-0 w-[calc(100%-1px)]">
                                <div className="absolute inset-[-5.58%_-0.13%_0_-0.13%]">
                                    <img alt="" className="block max-w-none size-full" src={imgUnion1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
