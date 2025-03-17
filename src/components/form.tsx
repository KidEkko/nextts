import { useState, useMemo } from "react";
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
  aries: { bgColor: "bg-red-100", accentColor: "bg-red-500", element: "Fire" },
  taurus: { bgColor: "bg-green-100", accentColor: "bg-green-500", element: "Earth" },
  gemini: { bgColor: "bg-yellow-100", accentColor: "bg-yellow-500", element: "Air" },
  cancer: { bgColor: "bg-blue-100", accentColor: "bg-blue-500", element: "Water" },
  leo: { bgColor: "bg-orange-100", accentColor: "bg-orange-500", element: "Fire" },
  virgo: { bgColor: "bg-emerald-100", accentColor: "bg-emerald-500", element: "Earth" },
  libra: { bgColor: "bg-pink-100", accentColor: "bg-pink-500", element: "Air" },
  scorpio: { bgColor: "bg-purple-100", accentColor: "bg-purple-500", element: "Water" },
  sagittarius: { bgColor: "bg-indigo-100", accentColor: "bg-indigo-500", element: "Fire" },
  capricorn: { bgColor: "bg-gray-100", accentColor: "bg-gray-500", element: "Earth" },
  aquarius: { bgColor: "bg-cyan-100", accentColor: "bg-cyan-500", element: "Air" },
  pisces: { bgColor: "bg-teal-100", accentColor: "bg-teal-500", element: "Water" },
};

const Horoscope: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  // Calculate daily horoscope index based on current day
  const dailyHoroscope = useMemo(() => {
    if (!selectedSign) return null;
    const dayOfMonth = new Date().getDate();
    const horoscopeIndex = dayOfMonth % 4; // Rotates through 4 horoscopes
    return horoscopes[selectedSign][horoscopeIndex];
  }, [selectedSign]);

  // Get current theme based on selected sign
  const theme = useMemo(
    () => (selectedSign ? signThemes[selectedSign] : null),
    [selectedSign]
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={`min-h-screen ${theme?.bgColor || "bg-gray-50"} p-6 transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto">
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
          <Select
            onValueChange={(value) => setSelectedSign(value as ZodiacSign)}
          >
            <SelectTrigger className="w-full rounded-md shadow-sm">
              <SelectValue placeholder="Select your zodiac sign" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(horoscopes).map((sign) => (
                <SelectItem key={sign} value={sign}>
                  {sign.charAt(0).toUpperCase() + sign.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Horoscope Display */}
        {selectedSign && theme && dailyHoroscope && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`${theme.accentColor} w-12 h-12 rounded-full`}></div>
              <div>
                <h2 className="text-2xl font-semibold capitalize">
                  {selectedSign}
                </h2>
                <p className="text-sm text-gray-600">{theme.element} Sign</p>
              </div>
            </div>
            <p className="text-base text-gray-800">{dailyHoroscope.text}</p>
            <Button
              onClick={() => setSelectedSign(null)}
              className={`mt-6 ${theme.accentColor} hover:${theme.accentColor}/90`}
            >
              Change Sign
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Horoscope;