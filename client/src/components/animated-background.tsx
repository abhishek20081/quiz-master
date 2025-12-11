import React from 'react';

const AnimatedBackground: React.FC = () => {
  const styles = `
    @keyframes gradientShift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(20px);
      }
    }

    @keyframes pulse-glow {
      0%, 100% {
        opacity: 0.3;
      }
      50% {
        opacity: 0.8;
      }
    }

    .animated-background {
      position: fixed;
      inset: 0;
      background: linear-gradient(-45deg, #0f172a, #1e3a8a, #0c4a6e, #0f172a);
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
      z-index: -1;
      overflow: hidden;
    }

    .orb-1 {
      position: absolute;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(30, 58, 138, 0.4) 0%, transparent 70%);
      border-radius: 50%;
      top: -150px;
      right: -100px;
      animation: float 8s ease-in-out infinite;
      filter: blur(40px);
    }

    .orb-2 {
      position: absolute;
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, rgba(12, 74, 110, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      bottom: -100px;
      left: -50px;
      animation: float 10s ease-in-out infinite;
      filter: blur(40px);
      animation-delay: -2s;
    }

    .orb-3 {
      position: absolute;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      animation: float 12s ease-in-out infinite;
      filter: blur(50px);
      animation-delay: -4s;
    }

    .grid-pattern {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      opacity: 0.5;
    }

    .pulse-line {
      position: absolute;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
      width: 300px;
      top: 30%;
      right: 10%;
      animation: pulse-glow 4s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="animated-background">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
        <div className="orb-3"></div>
        <div className="grid-pattern"></div>
        <div className="pulse-line"></div>
      </div>
    </>
  );
};

export default AnimatedBackground;
