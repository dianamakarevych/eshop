import "./History.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type LocationState = {
    selectedMood?: {
        id: number;
        icon: string;
        title: string;
        subtitle: string;
        teas: any[];
    };
};

type TeaHistory = {
    description: string;
    origin: string;
    year: string;
    funFact: string;
    steps: string[];
};
const teaHistories: Record<string, TeaHistory> = {
    "Green Tea": {
        description: "One of the oldest teas in the world, green tea has been consumed in China for thousands of years.",
        origin: "China",
        year: "2737 BC",
        funFact: "Green tea leaves are not oxidized, which preserves their green color and delicate flavor.",
        steps: ["Leaves are harvested in spring", "Quickly heated to prevent oxidation", "Rolled and shaped by hand or machine", "Dried to preserve freshness"],
    },
    "Matcha": {
        description: "A finely ground powder of specially grown green tea leaves, used in Japanese tea ceremonies.",
        origin: "Japan",
        year: "1191 AD",
        funFact: "Matcha contains up to 137x more antioxidants than regular green tea.",
        steps: ["Tea plants are shade-grown for 3-4 weeks", "Leaves are hand-picked and steamed", "Dried and de-stemmed into tencha", "Ground into fine powder using stone mills"],
    },
    "Ginkgo Biloba": {
        description: "An herbal infusion made from the dried leaves of the Ginkgo biloba tree, traditionally used in East Asian medicine for cognitive and circulatory support.",
        origin: "China",
        year: "2737 BC",
        funFact: "Ginkgo biloba is often called a 'living fossil' because the species has existed for more than 200 million years.",
        steps: [
            "Leaves are harvested from mature Ginkgo biloba trees",
            "Fresh leaves are cleaned and carefully dried",
            "Dried leaves are cut or crushed into small pieces",
            "Hot water is poured over the leaves and steeped for 5–10 minutes",
            "The liquid is strained and served as tea"]
    },
    "Chamomile": {
        description: "A gentle herbal tea made from dried chamomile flowers, known for its calming properties.",
        origin: "Egypt",
        year: "1550 BC",
        funFact: "Ancient Egyptians dedicated chamomile to their sun god Ra and used it as a cure for fever.",
        steps: ["Flowers are harvested at peak bloom", "Dried slowly at low temperature", "Stored in airtight containers", "Steeped in hot water for 5-10 minutes"],
    },
    "Lavender": {
        description: "A fragrant herbal tea made from lavender flowers, celebrated for its relaxing aroma.",
        origin: "Mediterranean",
        year: "600 BC",
        funFact: "Romans used lavender to scent their baths — the name comes from Latin 'lavare' meaning 'to wash'.",
        steps: ["Flowers harvested just before full bloom", "Dried in bundles upside down", "Flowers separated from stems", "Blended with other teas or used alone"],
    },
    "Valerian Root": {
        description: "An herbal infusion made from the dried roots of the Valeriana officinalis plant, commonly used in traditional European herbal medicine to support relaxation and sleep quality.",
        origin: "Europe and parts of Asia",
        year: "Ancient Greece (circa 400 BC)",
        funFact: "Valerian root has a strong, earthy smell that many people find unpleasant, yet it has been used for over 2,000 years as a natural calming remedy.",
        steps: [
            "Roots are harvested from mature Valeriana officinalis plants",
            "Fresh roots are cleaned thoroughly to remove soil and impurities",
            "Roots are dried for several days until fully dehydrated",
            "Dried roots are cut or crushed into small pieces",
            "Hot water is poured over the roots and steeped for 10–15 minutes",
            "The liquid is strained and consumed as an herbal infusion"
        ],
    },
    "Black Tea": {
        description: "The most consumed tea in the world, fully oxidized for a bold, robust flavor.",
        origin: "China",
        year: "1590 AD",
        funFact: "Black tea was originally called 'red tea' in China because of the color of the brewed liquid.",
        steps: ["Leaves are withered to reduce moisture", "Rolled to break cell walls", "Fully oxidized turning leaves dark brown", "Dried and sorted by grade"],
    },
    "Yerba Mate": {
        description: "A traditional South American herbal infusion made from the dried leaves of the Ilex paraguariensis plant, widely consumed for its stimulating effects and cultural significance.",
        origin: "South America (Paraguay, Argentina, Uruguay, Brazil)",
        year: "Pre-Columbian era",
        funFact: "Yerba mate is traditionally shared in a gourd using a metal straw called a 'bombilla', and the same gourd is often passed around in social gatherings.",
        steps: [
            "Leaves are harvested from the Ilex paraguariensis plant",
            "Fresh leaves are dried, often using heat or smoke",
            "Dried leaves are crushed into small pieces called 'yerba'",
            "Yerba is placed into a gourd (mate cup)",
            "Warm (not boiling) water is poured over the leaves",
            "The infusion is sipped through a bombilla and refilled multiple times"
        ],
    },
    "Ginger Tea": {
        description: "A spicy, warming herbal tea made from fresh or dried ginger root.",
        origin: "India",
        year: "500 BC",
        funFact: "Ginger has been used as medicine in Asia for over 2,000 years.",
        steps: ["Fresh ginger root is harvested", "Peeled and sliced or grated", "Simmered in hot water", "Strained and served with honey or lemon"],
    },
    "Pu-erh": {
        description: "A fermented tea from Yunnan Province, China, made from the leaves of the Camellia sinensis plant and known for its earthy flavor that deepens with age.",
        origin: "Yunnan, China",
        year: "Tang Dynasty (circa 7th–10th century)",
        funFact: "Pu-erh is one of the few teas that improves with age, sometimes being stored and fermented for decades like fine wine.",
        steps: [
            "Leaves are harvested from large-leaf tea trees (Camellia sinensis var. assamica)",
            "Leaves are withered to reduce moisture",
            "Leaves are pan-fired to stop oxidation ('kill-green' process)",
            "Leaves are rolled to shape and release enzymes",
            "Leaves are sun-dried to create 'maocha' (raw tea base)",
            "For ripe pu-erh, the tea undergoes controlled fermentation and aging",
            "Tea is pressed into cakes or stored loose for further maturation",
            "Aged tea is steeped in hot water before drinking"
        ],
    },
    "White Peony": {
        description: "A traditional Chinese white tea made from young tea leaves and buds of the Camellia sinensis plant, known for its light, floral, and slightly sweet flavor profile.",
        origin: "Fujian Province, China",
        year: "Ming Dynasty (circa 14th–17th century)",
        funFact: "White Peony (Bai Mu Dan) is considered a step between Silver Needle and more oxidized teas, offering a richer taste while still remaining very delicate.",
        steps: [
            "Young tea buds and the first two leaves are carefully hand-picked",
            "Leaves are naturally withered under sunlight or controlled indoor conditions",
            "Minimal processing is applied to preserve natural oxidation",
            "Leaves are gently dried to lock in flavor and aroma",
            "Dried tea is stored to stabilize its profile",
            "Leaves are steeped in hot water (around 75–85°C) for 2–5 minutes before serving"
        ],
    },
    "Oolong": {
        description: "A traditional Chinese tea partially oxidized between green and black tea.",
        origin: "China",
        year: "1600 AD",
        funFact: "Oolong means 'black dragon' in Chinese — named after the twisted, dark leaves that resemble a dragon.",
        steps: ["Leaves withered under strong sun", "Partially oxidized 15-85%", "Repeatedly rolled and twisted", "Fired to halt oxidation"],
    },
    "Peppermint": {
        description: "A refreshing herbal tea made from peppermint leaves, known for its cool, crisp flavor.",
        origin: "Europe",
        year: "1696 AD",
        funFact: "Peppermint is a natural hybrid of watermint and spearmint, first described by botanist John Ray in 1696.",
        steps: ["Leaves harvested before flowering", "Dried in shade to preserve oils", "Stored away from light and heat", "Steeped 5-7 minutes for best flavor"],
    },
    "Hibiscus": {
        description: "A tart, ruby-red herbal tea made from dried hibiscus flowers.",
        origin: "Africa",
        year: "1000 AD",
        funFact: "Hibiscus tea is called 'Karkade' in Egypt and Sudan where it's traditionally served at weddings.",
        steps: ["Flowers harvested when fully open", "Calyces separated and dried", "Can be served hot or cold", "Often blended with rose hip or berry"],
    },
    "Lemon Verbena": {
        description: "A fragrant herbal infusion made from the leaves of the Aloysia citrodora plant, known for its bright lemon aroma and refreshing, citrus-like flavor without caffeine.",
        origin: "South America (Argentina, Chile, Peru)",
        year: "18th century (introduced to Europe)",
        funFact: "Despite its strong lemon scent, lemon verbena is not related to lemons; its citrus aroma comes from natural essential oils in the leaves.",
        steps: [
            "Leaves are harvested from mature Aloysia citrodora plants",
            "Fresh leaves are gently washed to remove impurities",
            "Leaves are dried in a shaded, well-ventilated area",
            "Dried leaves are crumbled or left whole for infusion",
            "Hot water (not boiling) is poured over the leaves",
            "Leaves are steeped for 5–10 minutes to extract flavor",
            "The infusion is strained and served hot or chilled"
        ],
    },
    "Ceremonial Matcha": {
        description: "The highest grade of matcha, used in traditional Japanese tea ceremonies.",
        origin: "Japan",
        year: "1191 AD",
        funFact: "A single gram of ceremonial matcha requires about 30 minutes of stone grinding.",
        steps: ["Grown in shade for 3-4 weeks", "Only the youngest leaves selected", "Stone-ground at 30g per hour", "Whisked with bamboo chasen"],
    },
    "Gyokuro": {
        description: "Japan's most premium green tea, shade-grown for a uniquely sweet and umami flavor.",
        origin: "Japan",
        year: "1835 AD",
        funFact: "Gyokuro means 'jade dew' — named after the pale green color of the brewed tea.",
        steps: ["Shaded for 3 weeks before harvest", "Only top buds hand-picked", "Steamed to halt oxidation", "Rolled and dried carefully"],
    },
    "Rose Tea": {
        description: "A delicate floral tea made from rose petals or rose buds.",
        origin: "Persia",
        year: "810 AD",
        funFact: "Rose tea was a favorite in the Persian royal court and later spread to China along the Silk Road.",
        steps: ["Rose buds harvested at dawn", "Gently dried to preserve color", "Stored in airtight jars", "Steeped 3-5 minutes in hot water"],
    },
};

const History = () => {
    const { teaName } = useParams<{ teaName: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { selectedMood?: string };
    const decodedTeaName = decodeURIComponent(teaName || "");
    const selectedMood = location.state?.selectedMood ?? null;

    // ✅ Replace the broken lines with these:
    const normalizedName = decodedTeaName
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    const tea = teaHistories[normalizedName] ?? null;
    const teaImage = (location.state as any)?.teaImage ?? null;

    if (!tea) {
        return (
            <div className="history-page">
                <button
                    onClick={() =>
                        navigate("/mood", { state: { selectedMood } })
                    }
                >
                    ← Back
                </button>
                <h1>Tea not found</h1>
            </div>
        );
    }

    return (
        <div className="history-page">
            <button
                onClick={() => navigate("/mood", { state: { selectedMood } })}
            >
                ← Back
            </button>

            {teaImage && (
                <img src={teaImage} alt={decodedTeaName} className="history-tea-image" />
            )}

            <div className="history-header">
                <p className="history-origin">{tea.origin} · {tea.year}</p>
                <h1 className="history-title">{teaName}</h1>
                <p className="history-description">{tea.description}</p>
            </div>

            <div className="history-section">
                <h2>How it's made</h2>
                <div className="history-steps">
                    {tea.steps.map((step, index) => (
                        <div key={index} className="history-step">
                            <span className="step-number">{index + 1}</span>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="history-section">
                <h2>Did you know?</h2>
                <p className="fun-fact">"{tea.funFact}"</p>
            </div>
        </div>
    );
};

export default History;