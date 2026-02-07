import HeaderSection from "../components/HeaderSection";
import DetailsSection from "../components/DetailsSection";
import ButtonsSection from "../components/ButtonsSection"; 
export default function Home() {
  return (
    <main className="container mx-auto px-10 py-10">
      <div className="flex justify-between items-start gap-10">
        <div className="flex-1">
          <HeaderSection />
        </div>
        <div className="flex-none">
          <ButtonsSection />
        </div>
      </div>
      <DetailsSection />
    </main>
  );
}
