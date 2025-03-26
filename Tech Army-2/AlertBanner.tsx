
import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AlertBannerProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  onShowGuide: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ 
  message, 
  isVisible, 
  onClose,
  onShowGuide
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create an audio element for the alert sound
    audioRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alert-alarm-1005.mp3');
    
    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    // Play sound when alert becomes visible
    if (isVisible && audioRef.current) {
      audioRef.current.play().catch(err => console.error('Error playing alert sound:', err));
    }
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto p-4">
        <div className="alert-pulse rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium">Emergency Alert</h3>
                <div className="mt-2">
                  <p>{message}</p>
                </div>
                <div className="mt-4 flex space-x-3">
                  <Button 
                    variant="secondary" 
                    className="text-danger hover:text-danger bg-white hover:bg-gray-100"
                    onClick={onShowGuide}
                  >
                    Emergency Guidelines
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/20"
                  >
                    Contact Emergency Services
                  </Button>
                </div>
              </div>
            </div>
            <button 
              type="button" 
              className="rounded-md p-1.5 text-white hover:bg-white/20"
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
