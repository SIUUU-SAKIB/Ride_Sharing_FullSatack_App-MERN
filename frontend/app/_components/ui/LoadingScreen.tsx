import { useEffect, useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .ridex-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 100vh;
    background: #1a1a2e;
    font-family: 'DM Sans', sans-serif;
  }

  .ridex-card {
    width: 100vw;
    height: 100vh;
    background: #f8f9fb;
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow:
      0 32px 80px rgba(0, 0, 0, 0.35),
      0 8px 24px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255,255,255,0.9);
    overflow: hidden;
  }

  .ridex-card::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -60px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(52, 199, 139, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .ridex-card::after {
    content: '';
    position: absolute;
    bottom: -40px;
    left: -40px;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(52, 199, 139, 0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .ridex-logo {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 42px;
    letter-spacing: -1.5px;
    background: linear-gradient(135deg, #2ecc8e 0%, #27b87e 60%, #1fa36e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    margin-bottom: 28px;
    position: relative;
    z-index: 1;
  }

  .ridex-spinner-wrap {
    position: relative;
    width: 40px;
    height: 40px;
    animation: fadeInUp 0.6s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both;
    margin-bottom: 0;
  }

  .ridex-spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2.5px solid rgba(52, 199, 139, 0.15);
    border-top-color: #2ecc8e;
    animation: spin 0.9s linear infinite;
  }

  .ridex-dots-wrap {
    position: absolute;
    bottom: 52px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    animation: fadeInUp 0.6s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .ridex-status {
    font-size: 12.5px;
    color: #9aa0ad;
    font-weight: 500;
    letter-spacing: 0.2px;
    animation: pulse 2s ease-in-out infinite;
  }
`;

export default function LoadingScreen() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{style}</style>
      <div className="ridex-wrapper">
        <div className="ridex-card">
          <span className="ridex-logo">RideX</span>
          <div className="ridex-spinner-wrap">
            <div className="ridex-spinner" />
          </div>
          <div className="ridex-dots-wrap">
            <span className="ridex-status">Connecting to RideX{dots}</span>
          </div>
        </div>
      </div>
    </>
  );
}