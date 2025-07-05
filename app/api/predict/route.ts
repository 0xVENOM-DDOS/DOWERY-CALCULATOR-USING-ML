import { type NextRequest, NextResponse } from "next/server"

interface FormData {
  fullName: string
  occupation: string
  monthlySalary: string
  educationLevel: string
  complexion: string
  buffaloes: string
  ownsHouse: boolean
}

interface PredictionResult {
  dowry_amount: string
  items: string[]
  message: string
  is_zero: boolean
}

// Mock ML model logic
function calculateDowry(data: FormData): PredictionResult {
  const salary = Number.parseInt(data.monthlySalary) || 0
  const buffaloes = Number.parseInt(data.buffaloes) || 0

  // Satirical calculation logic
  let baseAmount = 0
  const items: string[] = []
  let message = ""

  // Education multiplier (satirical)
  const educationMultiplier =
    {
      "high-school": 0.5,
      bachelors: 1.0,
      masters: 1.5,
      phd: 2.0,
      other: 0.8,
    }[data.educationLevel] || 1.0

  // Occupation bonus (satirical)
  const occupationBonus = {
    doctor: 500000,
    engineer: 300000,
    "software engineer": 400000,
    government: 200000,
    teacher: 50000,
    unemployed: -100000,
  }

  const occupation = data.occupation.toLowerCase()
  let bonus = 0
  for (const [key, value] of Object.entries(occupationBonus)) {
    if (occupation.includes(key)) {
      bonus = value
      break
    }
  }

  // Base calculation
  baseAmount = salary * 12 * 0.1 + bonus + buffaloes * 50000
  baseAmount *= educationMultiplier

  // Complexion "adjustment" (satirical criticism)
  const complexionAdjustment =
    {
      fair: 1.2,
      wheatish: 1.0,
      dark: 0.8,
    }[data.complexion] || 1.0

  baseAmount *= complexionAdjustment

  // House bonus
  if (data.ownsHouse) {
    baseAmount += 200000
    items.push("House Keys")
  }

  // Generate items based on amount
  if (baseAmount > 500000) {
    items.push("Gold Jewelry Set", "LED TV", "Refrigerator")
  } else if (baseAmount > 200000) {
    items.push("Gold Ring", "Mixer Grinder")
  } else if (baseAmount > 50000) {
    items.push("Pressure Cooker")
  }

  // Add buffaloes to items
  if (buffaloes > 0) {
    items.push(`${buffaloes} Buffalo${buffaloes > 1 ? "s" : ""}`)
  }

  // Generate satirical messages
  const messages = [
    "Congratulations! You're officially overpriced in the marriage market!",
    "Your parents can now retire early with this dowry estimate!",
    "Warning: May cause excessive WhatsApp forwards in family groups!",
    "You seem like a government job person. Enjoy the loot!",
    "Your complexion just added/subtracted from your 'value'. How progressive!",
    "The buffalo count is impressive. Very traditional!",
    "Your education finally pays off... in dowry demands!",
  ]

  // Special case for zero or negative dowry
  if (baseAmount <= 0) {
    return {
      dowry_amount: "₹0 (You're Priceless!)",
      items: ["Respect", "Equality", "Love"],
      message:
        "Congratulations! You believe in equality and reject the dowry system. You're worth more than any material possession!",
      is_zero: true,
    }
  }

  message = messages[Math.floor(Math.random() * messages.length)]

  return {
    dowry_amount: `₹${baseAmount.toLocaleString("en-IN")}`,
    items: items.length > 0 ? items : ["A Reality Check"],
    message,
    is_zero: false,
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json()

    // Simulate ML processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const prediction = calculateDowry(formData)

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Failed to calculate dowry prediction" }, { status: 500 })
  }
}
