import HeaderSection from "../components/HeaderSection";
import DetailsSection from "../components/DetailsSection";
import ButtonsSection from "../components/ButtonsSection"; 
export default function Home() {
  return (
    <main className="container mx-auto px-10 py-10">
        <HeaderSection/>
        <DetailsSection/>
        <ButtonsSection/>
    </main>
  );
}
