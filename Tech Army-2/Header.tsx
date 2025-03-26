
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-transparent neo-glass rounded-xl mb-8 animate-fade-in">
      <div className="flex items-center space-x-2">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white font-semibold text-sm">DM</span>
        </div>
        <h1 className="text-xl font-medium">Disaster Monitor</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-muted-foreground hidden md:inline-block">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
        <Button variant="outline" size="sm" className="rounded-full">
          <Bell className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Notifications</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
