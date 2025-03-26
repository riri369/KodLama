
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-12 animate-fade-in">
      <div className="glass rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-sm font-medium">Disaster Monitor</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Real-time weather monitoring and emergency alerts
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Disaster Monitor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
