import React, { useState, useEffect } from 'react'
import Button from './Button'
import { images } from '../assets/images'

const imgBorder = images['img-border']
const imgDivider = images['img-divider']
const imgAstrisk = images['img-astrisk']
const imgStamp = images['img-stamp']
const imgTicket = images['img-ticket']

export default function Intro({ onStart }) {
    const [mainVisible, setMainVisible] = useState(false)
    const [ticketVisible, setTicketVisible] = useState(false)
    const [asteriskVisible, setAsteriskVisible] = useState(false)
    const [stampVisible, setStampVisible] = useState(false)
    const [cardVisible, setCardVisible] = useState(false)

    useEffect(() => {
        setMainVisible(true)
        const t1 = setTimeout(() => setTicketVisible(true), 550)
        const t2 = setTimeout(() => setAsteriskVisible(true), 700)
        const t3 = setTimeout(() => setStampVisible(true), 850)
        const t4 = setTimeout(() => setCardVisible(true), 1000)
        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
            clearTimeout(t4)
        }
    }, [])

    return (
        <div className="bg-[#fffbf0] w-full flex items-center justify-center overflow-hidden">

            {/* Main container */}
            <div className={`z-1 flex flex-col items-start w-full max-w-[375px] w-full m-2 min-h-[812px] relative transition duration-[600ms] ${mainVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

                {/* Main section */}
                {/* Top border */}
                <div className={`h-[20px] relative w-full`}>
                    <div className="absolute h-[20px] left-0 top-0 w-full">
                        <img alt="" className="absolute block max-w-none w-full" src={imgBorder} />
                    </div>
                </div>
                <div className={`bg-[#fefefe] border-[#ece8e5] border-l border-r flex flex-col w-full min-h-[812px]`}>
                    {/* Header */}
                    <div className="flex flex-col items-center">
                        <p className="font-mono leading-5 text-[#0e0e0e] text-sm text-center w-full py-8">
                            [mi·stuhk dringk]
                        </p>
                    </div>

                    {/* Main content */}
                    <div className="flex flex-1 flex-col gap-6 items-center justify-center pt-2 px-6 w-full">
                        <div className="font-mono leading-tight text-[#0e0e0e] text-4xl text-center w-full">
                            <p className="mb-3">⊹ ࣪ MYSTIC ࣪ ˖</p>
                            <p>DRINK</p>
                        </div>

                        <Button
                            onClick={onStart}
                        >
                            สั่งเครื่องดื่ม →
                        </Button>
                    </div>

                    {/* Footer section */}
                    <div className="flex flex-col gap-6 items-center pb-6 px-6 w-full">
                        {/* Divider line */}
                        <div className="h-0 w-full relative">
                            <div className="absolute inset-[-1px_0_0_0]">
                                <img alt="" className="block max-w-none w-full" src={imgDivider} />
                            </div>
                        </div>

                        {/* Footer info */}
                        <div className="flex flex-col gap-2 items-start leading-5 text-[#0e0e0e] text-sm w-full">
                            <div className="flex gap-6 items-start w-full font-mono text-xs">
                                <p className="flex-1 text-left">ISSUED AT</p>
                                <p className="flex-1 text-right">10 Mar, DX DAY 2026</p>
                            </div>
                            <div className="flex gap-6 items-start w-full text-xs">
                                <p className="flex-1 font-mono text-left">DEVELOPED BY</p>
                                <p className="flex-1 font-mono text-right">DIVDEEP</p>
                            </div>
                        </div>

                        {/* Divider line */}
                        <div className="h-0 w-full relative">
                            <div className="absolute inset-[-1px_0_0_0]">
                                <img alt="" className="block max-w-none w-full" src={imgDivider} />
                            </div>
                        </div>

                        {/* Quote */}
                        <p className="font-sans italic leading-[18px] text-[#0e0e0e] text-xs text-center w-full whitespace-pre-wrap">
                            {`***ในหม้อปรุงยาที่เต็มไปด้วยพิกเซลและโค้ด...\nคุณกำลังเคี่ยวกรำ 'ส่วนผสม' อะไรอยู่?****`}
                        </p>
                    </div>
                </div>

                {/* Bottom border */}
                <div className={`flex items-center justify-center relative w-full`} style={{ transform: "scaleY(-1)" }}>
                    <div className="w-full">
                        <div className="h-[20px] relative w-full">
                            <div className="absolute h-[20px] left-0 top-0 w-full">
                                <img alt="" className="absolute block max-w-none w-full" src={imgBorder} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side info card */}
                <div className={`-z-1 absolute left-[70%] top-[65%] flex justify-center transition-transform duration-600 delay-120 ${cardVisible ? 'translate-x-0 opacity-100' : '-translate-x-40 opacity-0'}`} style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" }}>
                    <div className="flex-none rotate-[5.1deg]">
                        <div className="min-w-[240px] min-h-[240px] bg-[#ffefe7] border border-[#ffdcc9] flex flex-col gap-3 items-start p-3 w-60 text-[#ffccb1] text-xs rounded-sm">
                            <p className="font-mono text-xs uppercase w-full leading-4">
                                Choose the best ingredient for your soul:
                            </p>
                            <div className="flex flex-col gap-2 items-start text-xs w-full font-mono">
                                <p>→ SHOGUN MATCHA LATTE GRADE</p>
                                <p>→ UNICORN MILK FROM MYSTIC FOREST</p>
                                <p>→ PURE ICE MOUNTAIN</p>
                                <p>→ SPICE FROM HEAVEN</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative asterisk - top right */}
                <div className={`absolute h-[92.551px] w-[95.889px] left-[90%] bottom-[70%] transition-opacity duration-300 delay-120 ${asteriskVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-[-10.03%_-9.65%_-14.64%_-11.38%]">
                        <img alt="" className="block max-w-none size-full" src={imgAstrisk} />
                    </div>
                </div>

                {/* Decorative stamp - bottom left */}
                <div className={`absolute flex h-[146.093px] items-center justify-center left-[-25%] bottom-[25%] w-[136.344px] transition-opacity duration-300 delay-120 ${stampVisible ? 'opacity-100' : 'opacity-0'}`} style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" }}>
                    <div className="flex-none rotate-[-9.93deg]">
                        <div className="h-[128px] relative w-[116px]">
                            <div className="absolute inset-[-6.25%_-6.9%]">
                                <img alt="" className="block max-w-none size-full" src={imgStamp} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative ticket - top left */}
                <div className={`absolute h-[63.116px] left-[-12%] top-[8%] w-[89.704px] transition-opacity duration-300 delay-120 ${ticketVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute contents h-[63.116px] left-0 top-0 w-[89.704px]">
                        <div className="absolute flex h-[63.116px] items-center justify-center left-0 top-0 w-[89.704px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" }}>
                            <div className="flex-none rotate-[13.95deg]">
                                <div className="h-[44.836px] relative w-[81.291px]">
                                    <div className="absolute inset-[-26.76%_-14.76%]">
                                        <img alt="" className="block max-w-none size-full" src={imgTicket} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="-translate-x-1/2 absolute flex h-[36.584px] items-center justify-center left-[44.99px] top-[13.78px] w-[40.96px]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" }}>
                            <div className="flex-none rotate-[26deg]">
                                <div className="font-mono leading-[14.026px] text-[10.52px] text-center text-white whitespace-nowrap">
                                    <p className="mb-0">VIBE</p>
                                    <p>CODING</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}