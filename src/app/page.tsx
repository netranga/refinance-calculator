import Image from "next/image";
import WhiteGreenRefinanceCalculator from '@/components/calculator'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <WhiteGreenRefinanceCalculator />
    </div>
  );
}
