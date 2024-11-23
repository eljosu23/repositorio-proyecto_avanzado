import React from 'react';
import { Plane } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <Plane className="w-16 h-16 text-white animate-bounce mb-4" />
        <div className="text-white text-2xl font-semibold">Preparando tu viaje...</div>
      </div>
    </div>
  );
};