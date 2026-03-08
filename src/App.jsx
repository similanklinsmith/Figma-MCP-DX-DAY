import { useState } from 'react'
import './index.css'
import Intro from './components/Intro'
import Question from './components/Question'
import Summary from './components/Summary'

const questions = [
  {
    id: 1,
    question: "เลือกใช้อะไรเป็นสารตั้งต้นของงานวันนี้?",
    options: [
      { id: "A", title: "Pure Water", description: "น้ำแร่บริสุทธิ์จากถ้ำน้ำแข็ง เน้นความใสสะอาด ความเรียบง่าย และ Logic ที่ชัดเจน", image: "img-pure_water" },
      { id: "B", title: "Creamy Milk", description: "นมวัวจากทุ่งหญ้าแสงจันทร์ เน้นความละมุน ความเข้าถึงง่าย และ Empathy", image: "img-creamy_milk" },
    ]
  },
  {
    id: 2,
    question: "ส่วนผสมหลักที่บ่งบอกสไตล์การแก้ปัญหาของคุณ?",
    options: [
      { id: "A", title: "Intense Tea", description: "สารสกัดจากใบชาโบราณ เน้นรายละเอียด ความลึกซึ้ง และความรอบคอบ", image: "img-intense_tea" },
      { id: "B", title: "Sparkling Fruit", description: "ผลไม้เวทมนตร์รสซ่า เน้นความคิดสร้างสรรค์ ความรวดเร็ว และความสนุก", image: "img-sparkling_fruit" },
    ]
  },
  {
    id: 3,
    question: "คุณเลือกเติม \"เสน่ห์\" ให้กับงานออกแบบด้วยอะไร?",
    options: [
      { id: "A", title: "Sea Salt", description: "ผลึกเกลือสมุทรบริสุทธิ์เพื่อเน้นความชัดเจน ตรงไปตรงมา และกำจัดสิ่งที่ไม่จำเป็นออกไป (Minimalism & Function)", image: "img-sea_salt" },
      { id: "B", title: "Golden Nectar", description: "เกสรดอกไม้สีทอง เพิ่มความหอมหวานและประกายแวววาว เน้นความตื่นตาตื่นใจ และสร้างความประทับใจแรกพบ", image: "img-golden_nectar" },
    ]
  },
  {
    id: 4,
    question: "สัมผัสสุดท้ายที่ทิ้งไว้ในงานออกแบบ?",
    options: [
      { id: "A", title: "Woody", description: "กลิ่นเปลือกไม้และควันไฟ มั่นคง หนักแน่น ดูเป็นทางการและปลอดภัย", image: "img-woody" },
      { id: "B", title: "Floral", description: "กลิ่นดอกไม้ป่ายามเช้า สดชื่น เป็นมิตร และทำให้ User รู้สึกผ่อนคลาย", image: "img-floral" },
    ]
  },
  {
    id: 5,
    question: "คุณเลือกส่งมอบงานชิ้นนี้ในรูปแบบไหน?",
    options: [
      { id: "A", title: "Crystal Glass", description: "แก้วคริสตัลเจียระไน หรูหรา เป๊ะทุกพิกเซล พร้อมโชว์ความสมบูรณ์แบบ", image: "img-crystal_glass" },
      { id: "B", title: "Ceramic Mug", description: "อบอุ่น มีเอกลักษณ์เฉพาะตัว และให้ความรู้สึกเป็นกันเอง", image: "img-ceramic_mug" },
    ]
  },
]

const BackingCard = ({ offsetY, scale }) => (
  <div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    style={{ zIndex: 0 }}
  >
    <div
      className="w-full max-w-[375px] mx-2 min-h-[812px] bg-[#fefefe] border border-[#ece8e5] rounded"
      style={{ transform: `translateY(${offsetY}px) scale(${scale})`, transformOrigin: 'bottom center' }}
    />
  </div>
)

function App() {
  const [currentScreen, setCurrentScreen] = useState('intro')
  const [answers, setAnswers] = useState({})
  const [phase, setPhase] = useState('idle')

  const handleStartQuiz = () => {
    setAnswers({})
    setPhase('exiting')
    setTimeout(() => {
      setCurrentScreen('question-1')
      setPhase('entering')
      setTimeout(() => setPhase('idle'), 450)
    }, 220)
  }

  const handleAnswerSubmit = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)
    const nextScreen = questionId < 5 ? `question-${questionId + 1}` : 'summary'

    setPhase('exiting')
    setTimeout(() => {
      setCurrentScreen(nextScreen)
      setPhase('entering')
      setTimeout(() => setPhase('idle'), 450)
    }, 220)
  }

  const handleBack = (questionId) => {
    setPhase('idle')
    if (questionId === 1) {
      setCurrentScreen('intro')
    } else {
      setCurrentScreen(`question-${questionId - 1}`)
    }
  }

  const handleRetakeQuiz = () => {
    setCurrentScreen('intro')
    setAnswers({})
  }

  const questionId = currentScreen.startsWith('question-')
    ? parseInt(currentScreen.split('-')[1])
    : null

  const currentQuestion = questionId ? questions[questionId - 1] : null

  return (
    <div className="min-h-screen bg-[#fffbf0] flex items-center justify-center w-full overflow-hidden">
      {currentScreen === 'intro' && (
        <div
          className={phase === 'exiting' ? 'card-exiting' : phase === 'entering' ? 'card-entering' : ''}
          style={{ position: 'relative', zIndex: 1, width: '100%' }}
        >
          <Intro onStart={handleStartQuiz} />
        </div>
      )}

      {currentQuestion && (
        <div className="relative w-full min-h-screen flex items-center justify-center">
          {/* Stacked backing cards — peek from below active card */}
          <BackingCard offsetY={8} scale={0.94} />
          <BackingCard offsetY={4} scale={0.97} />

          {/* Active card */}
          <div
            className={phase === 'exiting' ? 'card-exiting' : phase === 'entering' ? 'card-entering' : ''}
            style={{ position: 'relative', zIndex: 1, width: '100%' }}
          >
            <Question
              key={currentQuestion.id}
              questionNumber={currentQuestion.id}
              question={currentQuestion.question}
              options={currentQuestion.options}
              onSubmit={handleAnswerSubmit}
              onBack={() => handleBack(currentQuestion.id)}
              initialAnswer={answers[currentQuestion.id]}
            />
          </div>
        </div>
      )}

      {currentScreen === 'summary' && (
        <div
          className={phase === 'exiting' ? 'card-exiting' : phase === 'entering' ? 'card-entering' : ''}
          style={{ position: 'relative', zIndex: 1, width: '100%' }}
        >
          <Summary
            questions={questions}
            answers={answers}
            onRetake={handleRetakeQuiz}
          />
        </div>
      )}
    </div>
  )
}

export default App
