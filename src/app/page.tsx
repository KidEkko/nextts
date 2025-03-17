"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define zodiac signs type
type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

// Horoscope data structure
interface Horoscope {
  text: string;
}

// Sign-specific theme configuration
interface SignTheme {
  bgColor: string;
  accentColor: string;
  element: string;
}

// Static horoscope data (4 variations per sign)
const horoscopes: Record<ZodiacSign, Horoscope[]> = {
  aries: [
    { text: "Today, your fiery energy ignites new opportunities..." },
    { text: "Mars guides you toward bold decisions this morning..." },
    { text: "A challenge arises, but your courage prevails..." },
    { text: "Your leadership shines in group settings today..." },
  ],
  taurus: [
    { text: "Stability is your strength today, Taurus..." },
    { text: "A practical approach yields surprising rewards..." },
    { text: "Venus blesses your financial decisions..." },
    { text: "Take time to enjoy life's simple pleasures..." },
  ],
  // Add other signs similarly...
  gemini: [
    { text: "Your curiosity leads to exciting discoveries..." },
    { text: "Communication flows effortlessly today..." },
    { text: "A dual nature brings unexpected insights..." },
    { text: "Mercury sparks your intellectual pursuits..." },
  ],
  cancer: [
    { text: "Emotions run deep but guide you wisely..." },
    { text: "Home and family bring comfort today..." },
    { text: "The Moon enhances your intuition..." },
    { text: "Nurture yourself and others this day..." },
  ],
  leo: [
    { text: "Your radiance attracts positive attention..." },
    { text: "The Sun fuels your creative ambitions..." },
    { text: "Confidence opens new doors today..." },
    { text: "Lead with your heart and prosper..." },
  ],
  virgo: [
    { text: "Details matter and you excel at them..." },
    { text: "Organization brings peace of mind..." },
    { text: "Mercury sharpens your analytical skills..." },
    { text: "Practical solutions solve old problems..." },
  ],
  libra: [
    { text: "Balance restores harmony in your life..." },
    { text: "Venus enhances your charm today..." },
    { text: "Relationships flourish with your grace..." },
    { text: "Justice prevails in your decisions..." },
  ],
  scorpio: [
    { text: "Intensity drives your success today..." },
    { text: "Pluto reveals hidden truths..." },
    { text: "Passion fuels your deepest desires..." },
    { text: "Transformation is within reach..." },
  ],
  sagittarius: [
    { text: "Adventure calls and you must answer..." },
    { text: "Jupiter expands your horizons today..." },
    { text: "Optimism lights your path forward..." },
    { text: "Seek wisdom in unexpected places..." },
  ],
  capricorn: [
    { text: "Discipline yields impressive results..." },
    { text: "Saturn strengthens your resolve..." },
    { text: "Ambition climbs to new heights today..." },
    { text: "Patience brings lasting rewards..." },
  ],
  aquarius: [
    { text: "Innovation sparks brilliant ideas..." },
    { text: "Uranus inspires unconventional choices..." },
    { text: "Your vision shapes the future today..." },
    { text: "Community connections grow stronger..." },
  ],
  pisces: [
    { text: "Dreams reveal profound insights..." },
    { text: "Neptune enhances your empathy today..." },
    { text: "Creativity flows like water now..." },
    { text: "Intuition guides your next steps..." },
  ],
};

// Sign themes
const signThemes: Record<ZodiacSign, SignTheme> = {
  aries: { bgColor: "bg-red-200", accentColor: "bg-red-500", element: "Fire" },
  taurus: { bgColor: "bg-green-200", accentColor: "bg-green-500", element: "Earth" },
  gemini: { bgColor: "bg-yellow-200", accentColor: "bg-yellow-500", element: "Air" },
  cancer: { bgColor: "bg-blue-200", accentColor: "bg-blue-500", element: "Water" },
  leo: { bgColor: "bg-orange-200", accentColor: "bg-orange-500", element: "Fire" },
  virgo: { bgColor: "bg-emerald-200", accentColor: "bg-emerald-500", element: "Earth" },
  libra: { bgColor: "bg-pink-200", accentColor: "bg-pink-500", element: "Air" },
  scorpio: { bgColor: "bg-purple-200", accentColor: "bg-purple-500", element: "Water" },
  sagittarius: { bgColor: "bg-indigo-200", accentColor: "bg-indigo-500", element: "Fire" },
  capricorn: { bgColor: "bg-gray-200", accentColor: "bg-gray-500", element: "Earth" },
  aquarius: { bgColor: "bg-cyan-200", accentColor: "bg-cyan-500", element: "Air" },
  pisces: { bgColor: "bg-teal-200", accentColor: "bg-teal-500", element: "Water" },
};

const Horoscope: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [prevTheme, setPrevTheme] = useState<SignTheme | null>(null);
  const [theme, setTheme] = useState<SignTheme | null>(null);
  const [keepPrev, setKeep] = useState<boolean>(false);

const handleSignChange = (value: ZodiacSign) => {
    if (selectedSign !== null) {
      setPrevTheme(theme); // Store the previous theme for transition
    }
    setKeep(signThemes[value] === prevTheme) // Avoid removing previous theme when going to previous
    setTheme(signThemes[value]); // Set the new theme
    setSelectedSign(value); // Change selected sign
  };

  useEffect(() => {
    if (selectedSign === null) {
      setPrevTheme(null); // Reset background to white when no sign is selected
      setTheme(null); // Clear the theme
    }
    console.log(prevTheme, theme)
  }, [selectedSign]);

  return (
    <div className="relative min-h-screen overflow-hidden p-6">
      {/* Background transition layer */}
      {prevTheme && !keepPrev && (
        <motion.div
          key={prevTheme.bgColor} // Ensure re-animation on change
          className={`absolute inset-0 ${prevTheme.bgColor}`}
          initial={{ clipPath: "circle(100% at 50% 50%)", opacity: 1 }}
          animate={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
      {theme && (
        <motion.div
          key={theme.bgColor}
          className={`absolute inset-0 ${theme.bgColor}`}
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Daily Horoscope
        </motion.h1>

        {/* Sign Selector */}
        <div className="mb-8">
          <Select onValueChange={(value) => handleSignChange(value as ZodiacSign)}>
            <SelectTrigger className="w-full rounded-md shadow-md border border-black">
              <SelectValue placeholder="Select your zodiac sign" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(signThemes).map((sign) => (
                <SelectItem key={sign} value={sign}>
                  {sign.charAt(0).toUpperCase() + sign.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Horoscope Display */}
        {selectedSign && theme && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            className="bg-white rounded-lg shadow-md p-6 border border-black"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`${theme.accentColor} w-12 h-12 rounded-full`}></div>
              <div>
                <h2 className="text-2xl font-semibold capitalize">{selectedSign}</h2>
                <p className="text-sm text-gray-600">{theme.element} Sign</p>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-800">Your daily fortune awaits...</p>
            <Button onClick={() => setSelectedSign(null)} className={`mt-6 ${theme.accentColor} hover:${theme.accentColor}/90`}>
              Change Sign
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Horoscope;