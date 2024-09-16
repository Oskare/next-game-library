import Link from "next/link"
import { Button } from "@/components/ui/button"
import {Library, LogIn, UserPlus} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 flex flex-col items-center justify-center text-white p-4">
      <div className="text-center transition-all duration-500 ease-in-out transform hover:scale-105">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Next Game Library</h1>
        <p className="text-xl md:text-2xl mb-8">Your ultimate gaming management solution</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up">
        <Link href="/login">
          <Button variant="default" size="lg" className="w-full md:w-auto">
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
        </Link>
        <Link href="/register">
          <Button variant="default" size="lg" className="w-full md:w-auto">
            <UserPlus className="mr-2 h-4 w-4" /> Register
          </Button>
        </Link>
        <Link href="/items">
          <Button variant="default" size="lg" className="w-full md:w-auto">
            <Library className="mr-2 h-4 w-4" /> Game Library
          </Button>
        </Link>
      </div>
      <div className="mt-12 text-center animate-fade-in">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Next Game Library. All rights reserved.
        </p>
      </div>
    </div>
  )
}