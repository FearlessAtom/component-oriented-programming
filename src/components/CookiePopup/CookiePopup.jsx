import { useState } from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import styles from "./CookiePopup.module.css";

function CookiePopup() {
    const [preferences, setPreferences] = useState({
        necessary: true,
        preferences: false,
        analytics: false,
    });

    const cookies = [
        { key: "necessary", label: "Necessary", description: "Required for the game to work" },
        { key: "preferences", label: "Preferences", description: "Remember your settings" },
        { key: "analytics", label: "Analytics", description: "Track gameplay stats" },
    ];

    const handleAccept = () => {
        Cookies.set("necessaryCookies", String(preferences.necessary), { expires: 150 });
        Cookies.set("preferenceCookies", String(preferences.preferences), { expires: 150 });
        Cookies.set("analyticsCookies", String(preferences.analytics), { expires: 150 });
    };

    const handleRejectAll = () => {
        setPreferences({
            ...preferences,
            preferences: false,
            analytics: false,
        });
    };

    const handleToggle = (key) => {
        if (key === "necessary") return;
        
        setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return <CookieConsent
        cookieName="gameCookieConsent"

        buttonText="Accept Selected"
        onAccept={handleAccept}

        enableDeclineButton
        declineButtonText="Reject All"
        onDecline={handleRejectAll}
        declineButtonClasses={styles.declineButton}

        buttonClasses={styles.acceptButton}
        buttonWrapperClasses={styles.buttons}

        containerClasses={styles.banner}

        disableStyles={true}
        expires={150}
    >
        <h3 className={styles.title}>Cookie Settings</h3>
        <p className={styles.description}>We use cookies to improve your game experience.</p>

        <div className={styles.cookieList}>
            {cookies.map(({ key, label, description }) => (
                <div key={key} className={styles.cookieItem}>
                    <input
                        type="checkbox"
                        id={key}
                        checked={preferences[key]}
                        onChange={() => handleToggle(key)}
                        disabled={key === "necessary"}
                    />

                    <label htmlFor={key}>
                        <strong>{label}</strong> — {description}
                    </label>
                </div>
            ))}
        </div>
    </CookieConsent>
}

export default CookiePopup;
