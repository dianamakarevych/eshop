import { useState, useEffect } from "react";
import "./MoodPage.css";
import { useNavigate, useLocation } from "react-router-dom";
// Убедитесь, что путь к ApiService указан правильно для вашей структуры папок!
import { ApiService, type Mood } from "../utils/ApiService"; 

const MoodPage = () => {
    // 1. Добавляем новые состояния для скачанных данных и загрузки
    const [moods, setMoods] = useState<Mood[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const slugify = (name: string) => name.toLowerCase().replace(/\s/g, "-");

    // 2. Скачиваем данные с сервера при первом открытии страницы
    useEffect(() => {
        ApiService.getMoods()
            .then((data) => {
                setMoods(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка при загрузке настроений:", err);
                setLoading(false);
            });
    }, []);

    // 3. Логика навигации (осталась вашей, просто добавили проверку moods.length)
    useEffect(() => {
        const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        const isReload = navigationEntry?.type === "reload";

        if (isReload) {
            setSelectedMood(null);
            return;
        }

        const state = location.state as { selectedMood?: Mood } | null;
        if (state?.selectedMood && moods.length > 0) {
            const found = moods.find(m => m.id === state.selectedMood!.id);
            if (found) setSelectedMood(found);
        }
    }, [location, moods]);

    // Показываем индикатор загрузки, пока данные летят с сервера
    if (loading) {
        return (
            <div className="mood-page">
                <div className="mood-intro">
                    <p>Loading moods...</p>
                </div>
            </div>
        );
    }

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
                                    state: { selectedMood, tea, teaImage: tea.image, teaName: tea.name }
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
            )}
        </div>
    );
};

export default MoodPage;