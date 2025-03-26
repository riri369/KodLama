
import React from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <main>
          <Dashboard />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
