import { useState, useEffect } from "react";
import "./MoodPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import greenTeaImg from "../assets/moodpage/greentes.jpg";
import Matcha from "../assets/moodpage/matcha iced latte 🍵🧊.jpg";
import GinkoImg from "../assets/moodpage/Ginkgo Bilobaart.jpg";
import Chamomile from "../assets/moodpage/Chamomileart.jpg";
import Lavender from "../assets/moodpage/Lavenderart.jpg";
import ValerianRoot from "../assets/moodpage/Valerian Rootart.jpg";
import BlackTea from "../assets/moodpage/Black Teaart.jpg";
import YerbaMate from "../assets/moodpage/Yerba Mateart.jpg";
import GingerTea from "../assets/moodpage/Ginger Teaart.jpg";
import Puerh from "../assets/moodpage/Pu-erhart.jpg";
import WhitePeony from "../assets/moodpage/White Peonyart.jpg";
import Oolong from "../assets/moodpage/Oolongart.jpg";
import Peppermint from "../assets/moodpage/permintartt.jpg";
import Hibiscus from "../assets/moodpage/Hibiscus tea vector_tea illustration.jpg";
import LemonVerbena from "../assets/moodpage/lemon verbena tea transparent background lemon verbena tea chinese drinks transparent ba.jpg";
import CeremonialMatcha from "../assets/moodpage/Ceremonial Matchaart.jpg";
import Gyokuro from "../assets/moodpage/Gyokuroart.jpg";
import RoseTea from "../assets/moodpage/Rose Teaart'.jpg";




type Tea = {
    name: string;
    description: string;
    benefit: string;
    image: string;
};

type Mood = {
    id: number;
    icon: string;
    title: string;
    subtitle: string;
    teas: Tea[];
};

const moods: Mood[] = [
    {
        id: 1, icon: "🌿", title: "Focus",
        subtitle: "Clear mind, sustained energy without the crash.",
        teas: [
            { name: "Green Tea", description: "Light and fresh", benefit: "Boosts concentration with gentle caffeine", image: greenTeaImg },
            { name: "Matcha", description: "Rich and earthy", benefit: "Sustained energy and mental clarity", image: Matcha },
            { name: "Ginkgo Biloba", description: "Herbal and mild", benefit: "Enhances memory and focus", image: GinkoImg },
        ],
    },
    {
        id: 2, icon: "🌙", title: "Unwind",
        subtitle: "Gentle, calming herbs to ease the evening.",
        teas: [
            { name: "Chamomile", description: "Floral and soothing", benefit: "Calms the mind before sleep", image: Chamomile },
            { name: "Lavender", description: "Soft and fragrant", benefit: "Reduces stress and anxiety", image: Lavender },
            { name: "Valerian Root", description: "Earthy and deep", benefit: "Promotes deep relaxation", image: ValerianRoot },
        ],
    },
    {
        id: 3, icon: "⚡", title: "Energise",
        subtitle: "Bold, robust teas to kickstart your morning.",
        teas: [
            { name: "Black Tea", description: "Bold and strong", benefit: "High caffeine for a morning boost", image: BlackTea },
            { name: "Yerba Mate", description: "Smoky and rich", benefit: "Long-lasting energy without jitters", image: YerbaMate },
            { name: "Ginger Tea", description: "Spicy and warming", benefit: "Stimulates circulation and energy", image: GingerTea },
        ],
    },
    {
        id: 4, icon: "☁️", title: "Explore",
        subtitle: "Complex, rare finds for the curious palate.",
        teas: [
            { name: "Pu-erh", description: "Deep and aged", benefit: "Unique fermented taste, aids digestion", image: Puerh },
            { name: "White Peony", description: "Delicate and rare", benefit: "Light floral notes, high antioxidants", image: WhitePeony },
            { name: "Oolong", description: "Balanced and complex", benefit: "Between green and black, unique flavor", image: Oolong },
        ],
    },
    {
        id: 5, icon: "🌸", title: "Refresh",
        subtitle: "Cool and vibrant teas to reset your day.",
        teas: [
            { name: "Peppermint", description: "Cool and crisp", benefit: "Refreshes the mind and aids digestion", image: Peppermint },
            { name: "Hibiscus", description: "Tart and fruity", benefit: "Rich in vitamin C, cooling effect", image: Hibiscus },
            { name: "Lemon Verbena", description: "Citrusy and bright", benefit: "Uplifting and refreshing", image: LemonVerbena },
        ],
    },
    {
        id: 6, icon: "🕯️", title: "Ritual",
        subtitle: "Slow down and savour every sip.",
        teas: [
            { name: "Ceremonial Matcha", description: "Vibrant and umami", benefit: "Mindful preparation, zen-like focus", image: CeremonialMatcha },
            { name: "Gyokuro", description: "Sweet and shaded", benefit: "Premium Japanese green, meditative", image: Gyokuro },
            { name: "Rose Tea", description: "Romantic and soft", benefit: "Perfect for a calming daily ritual", image: RoseTea },
        ],
    },
];

const MoodPage = () => {
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);  // ← always null on load
    const navigate = useNavigate();
    const location = useLocation();
    const slugify = (name: string) => name.toLowerCase().replace(/\s/g, "-");

    useEffect(() => {
        const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        const isReload = navigationEntry?.type === "reload";

        if (isReload) {
            setSelectedMood(null);
            return;
        }

        const state = location.state as { selectedMood?: Mood } | null;
        if (state?.selectedMood) {
            const found = moods.find(m => m.id === state.selectedMood!.id);
            if (found) setSelectedMood(found);
        }
    }, [location]); // ← listen to location changes

    return (

        <div className="mood-page">

            {!selectedMood ? (

                <div className="mood-intro">
                    <p className="mood-number">01</p>
                    <h1 className="mood-title">Find your <em>mood.</em></h1>
                    <p className="mood-subtitle">
                        Not sure where to start? Let your current state of mind guide you to the perfect cup.
                    </p>
                    <div className="mood-grid">
                        {moods.map((mood) => (
                            <div
                                key={mood.id}
                                className="mood-card"
                                onClick={() => setSelectedMood(mood)}
                            >
                                <span className="mood-icon">{mood.icon}</span>
                                <h2>{mood.title}</h2>
                                <p>{mood.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="tea-results">
                    {selectedMood && (
                        <button className="back-btn" onClick={() => setSelectedMood(null)}>
                            ← Back
                        </button>
                    )}
                    <p className="mood-icon-large">{selectedMood.icon}</p>
                    <h1>{selectedMood.title}</h1>
                    <p className="mood-subtitle">{selectedMood.subtitle}</p>
                    <div className="tea-grid">
                        {selectedMood.teas.map((tea, index) => (
                            <div key={index} className="tea-card" onClick={() =>
                                navigate(`/history/${slugify(tea.name)}`, {
                                    state: { selectedMood, tea, teaImage: tea.image, teaName: tea.name }  // ← add teaName

                                })
                            }>
                                <img src={tea.image} alt={tea.name} className="tea-image" />
                                <h2>{tea.name}</h2>
                                <p className="tea-description">{tea.description}</p>
                                <p className="tea-benefit">{tea.benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default MoodPage;