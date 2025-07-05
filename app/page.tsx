"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Switch } from "@/components/ui/switch"
import { Calculator, AlertTriangle, Users, Info, Github, Mail, Heart } from "lucide-react"
import confetti from "canvas-confetti"

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

export default function DowryCalculator() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    occupation: "",
    monthlySalary: "",
    educationLevel: "",
    complexion: "",
    buffaloes: "",
    ownsHouse: false,
  })

  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const [showContactModal, setShowContactModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Name is required"
    if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required"
    if (!formData.monthlySalary || isNaN(Number(formData.monthlySalary))) {
      newErrors.monthlySalary = "Valid salary is required"
    }
    if (!formData.educationLevel) newErrors.educationLevel = "Education level is required"
    if (!formData.complexion) newErrors.complexion = "Complexion is required"
    if (!formData.buffaloes || isNaN(Number(formData.buffaloes))) {
      newErrors.buffaloes = "Number of buffaloes is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setResult(data)

      if (data.is_zero) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }

      setTimeout(() => setShowModal(true), 1000)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const testimonials = [
    {
      text: "I got rejected because I only had 1 buffalo. Now I know I need at least 3!",
      author: "Sanjay, Govt Clerk",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      text: "Finally, an app that tells me how greedy my relatives are!",
      author: "Ramesh, MBA",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      text: "My complexion dropped my value by 2 lakhs. Thanks for the reality check!",
      author: "Priya, Software Engineer",
      rating: "⭐⭐⭐⭐",
    },
    {
      text: "The AI said I'm worth negative dowry. Best compliment ever!",
      author: "Arjun, Teacher",
      rating: "⭐⭐⭐⭐⭐",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400 opacity-20"
            initial={{
              x: typeof window !== "undefined" ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== "undefined" ? Math.random() * window.innerHeight : Math.random() * 800,
              rotate: 0,
            }}
            animate={{
              y: [null, -100, null],
              rotate: 360,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {i % 3 === 0 ? "🪙" : i % 3 === 1 ? "💍" : "🐃"}
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Dowry Calculator™
            <br />
            <span className="text-orange-600">ML-Powered Rishta Loot Estimator</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Let AI calculate your rishta market value in gold, goats, and awkward stares.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg"
            onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
          >
            Calculate My Worth 💰
          </Button>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-12 h-12 text-blue-500" />,
                title: "Enter Your Questionable Life Achievements",
                description: "Tell us about your salary, buffaloes, and other 'important' life metrics.",
              },
              {
                icon: <Calculator className="w-12 h-12 text-green-500" />,
                title: "Let Our Fully Trained & Slightly Sarcastic ML Model Do the Math",
                description: "Our AI has been trained on thousands of rishta rejections and family WhatsApp groups.",
              },
              {
                icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
                title: "Receive Your Fake Dowry Quote + Reality Check",
                description: "Get your satirical market value plus a gentle reminder that dowry is illegal.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Form Section */}
      <section id="calculator" className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">Dowry Prediction Form</CardTitle>
              <CardDescription>
                Fill in your details for our AI to calculate your satirical market value
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    placeholder="e.g., Software Engineer, Doctor, Unemployed"
                    className={errors.occupation ? "border-red-500" : ""}
                  />
                  {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
                </div>

                <div>
                  <Label htmlFor="salary">Monthly Salary (₹)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={formData.monthlySalary}
                    onChange={(e) => setFormData({ ...formData, monthlySalary: e.target.value })}
                    placeholder="Enter your monthly salary"
                    className={errors.monthlySalary ? "border-red-500" : ""}
                  />
                  {errors.monthlySalary && <p className="text-red-500 text-sm mt-1">{errors.monthlySalary}</p>}
                </div>

                <div>
                  <Label htmlFor="education">Education Level</Label>
                  <Select
                    value={formData.educationLevel}
                    onValueChange={(value) => setFormData({ ...formData, educationLevel: value })}
                  >
                    <SelectTrigger className={errors.educationLevel ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>}
                </div>

                <div>
                  <Label htmlFor="complexion" className="flex items-center gap-2">
                    Complexion
                    <Info className="w-4 h-4 text-gray-400" title="Because aunties care more than logic" />
                  </Label>
                  <Select
                    value={formData.complexion}
                    onValueChange={(value) => setFormData({ ...formData, complexion: value })}
                  >
                    <SelectTrigger className={errors.complexion ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select complexion (sadly important to some people)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="wheatish">Wheatish</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.complexion && <p className="text-red-500 text-sm mt-1">{errors.complexion}</p>}
                </div>

                <div>
                  <Label htmlFor="buffaloes">Number of Buffaloes Owned</Label>
                  <Input
                    id="buffaloes"
                    type="number"
                    min="0"
                    value={formData.buffaloes}
                    onChange={(e) => setFormData({ ...formData, buffaloes: e.target.value })}
                    placeholder="Enter number of buffaloes (0 is acceptable)"
                    className={errors.buffaloes ? "border-red-500" : ""}
                  />
                  {errors.buffaloes && <p className="text-red-500 text-sm mt-1">{errors.buffaloes}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="house"
                    checked={formData.ownsHouse}
                    onCheckedChange={(checked) => setFormData({ ...formData, ownsHouse: checked })}
                  />
                  <Label htmlFor="house">Owns a House?</Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={loading}
                >
                  {loading ? "Calculating Your Worth..." : "Predict Dowry Value 🧠"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-yellow-100 to-orange-100">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-800">Your Satirical Market Value</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-4xl font-bold text-orange-600">{result.dowry_amount}</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {result.items.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 italic">"{result.message}"</p>
                  <Button
                    onClick={() => {
                      setResult(null)
                      setFormData({
                        fullName: "",
                        occupation: "",
                        monthlySalary: "",
                        educationLevel: "",
                        complexion: "",
                        buffaloes: "",
                        ownsHouse: false,
                      })
                    }}
                    variant="outline"
                  >
                    Calculate Again
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="text-2xl mb-2">{testimonial.rating}</div>
                      <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                      <p className="font-semibold text-gray-800">- {testimonial.author}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">⚠️ Important Disclaimer</h3>
            <p>
              This app is purely satirical and aims to raise awareness against the dowry system. Dowry is illegal in
              India under the Dowry Prohibition Act, 1961. This is not financial advice, and we strongly condemn the
              practice of dowry.
            </p>
          </div>

          <div className="flex justify-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-gray-300"
              onClick={() => window.open("https://github.com/0xVENOM-DDOS", "_blank")}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-gray-300"
              onClick={() => setShowContactModal(true)}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-gray-300"
              onClick={() => setShowAboutModal(true)}
            >
              <Heart className="w-4 h-4 mr-2" />
              About the Project
            </Button>
          </div>

          <p className="text-gray-400 text-sm">Made with ❤️ to fight social evils through humor and awareness.</p>
        </div>
      </footer>

      {/* Educational Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">🚨 Reality Check!</DialogTitle>
            <DialogDescription className="space-y-3">
              <p className="font-semibold">
                BTW, dowry is illegal under IPC Section 498A and the Dowry Prohibition Act, 1961.
              </p>
              <p>
                This calculator is purely satirical. In reality, a person's worth cannot and should not be measured by
                material possessions or physical attributes.
              </p>
              <p className="text-lg font-bold text-green-600">Say No to Dowry! 🚫</p>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowModal(false)} className="w-full">
            I Understand
          </Button>
        </DialogContent>
      </Dialog>

      {/* Contact Us Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-blue-600">📧 Contact Us</DialogTitle>
            <DialogDescription className="space-y-3">
              <p>Have feedback, suggestions, or want to contribute to this social awareness project?</p>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> adarshsingh7089@gmail.com
                </p>
                <p>
                  <strong>Twitter:</strong> @0xVENOM_DDOS
                </p>
                <p>
                  <strong>LinkedIn:</strong> https://www.linkedin.com/in/adarshsingh861/
                </p>
              </div>
              <p className="text-sm text-gray-600">
                We'd love to hear your thoughts on how we can better raise awareness against the dowry system!
              </p>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowContactModal(false)} className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* About the Project Modal */}
      <Dialog open={showAboutModal} onOpenChange={setShowAboutModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-purple-600">💜 About This Project</DialogTitle>
            <DialogDescription className="space-y-4">
              <p>
                <strong>Mission:</strong> To use humor and technology to raise awareness against the illegal and harmful
                practice of dowry in Indian society.
              </p>
              <p>
                <strong>Why This App?</strong> Sometimes humor can be more effective than lectures in making people
                think about social issues. By creating a satirical "dowry calculator," we highlight the absurdity of
                reducing human worth to material possessions.
              </p>
              <p>
                <strong>Educational Impact:</strong> Every user sees multiple reminders that:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Dowry is illegal under Indian law</li>
                <li>Human worth cannot be measured in material terms</li>
                <li>Complexion-based discrimination is wrong</li>
                <li>Gender equality should be the norm</li>
              </ul>
              <p>
                <strong>Tech Stack:</strong> Built with Next.js, React, TypeScript, and Tailwind CSS. Features a mock ML
                backend for satirical predictions.
              </p>
              <p className="text-sm text-gray-600 italic">
                "Fighting social evils, one satirical calculation at a time." 🚀
              </p>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowAboutModal(false)} className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
