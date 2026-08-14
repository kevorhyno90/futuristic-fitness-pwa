import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import './InstallButton.css';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>((window as any).deferredInstallPrompt);
  const [isVisible, setIsVisible] = useState(!!(window as any).deferredInstallPrompt);

  useEffect(() => {
    const handleReady = () => {
      setDeferredPrompt((window as any).deferredInstallPrompt);
      setIsVisible(true);
    };

    window.addEventListener('pwa-install-ready', handleReady);
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('pwa-install-ready', handleReady);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    
    await deferredPrompt.userChoice;
    
    setDeferredPrompt(null);
    setIsVisible(false);
    (window as any).deferredInstallPrompt = null;
  };

  if (!isVisible) return null;

  return (
    <div className="install-banner glass-panel">
      <div className="install-content">
        <div className="install-text">
          <strong>Install Devin's Fitness Planner</strong>
          <span>Get the full offline experience on your device.</span>
        </div>
        <button className="btn btn-primary" onClick={handleInstallClick}>
          <Download size={18} /> Install App
        </button>
      </div>
    </div>
  );
}
