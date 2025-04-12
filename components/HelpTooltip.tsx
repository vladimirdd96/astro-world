import React, { useState } from "react";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/solid"; // Using Heroicons for icons

const HelpTooltip: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // Tooltip is open by default

  const toggleTooltip = () => setIsOpen(!isOpen);

  if (!isOpen) {
    return (
      <button
        onClick={toggleTooltip}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 z-[100]"
        aria-label="Show help"
      >
        <QuestionMarkCircleIcon className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs z-[100] border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Controls</h3>
        <button
          onClick={toggleTooltip}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close help"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <strong className="font-medium">Scroll:</strong> Zoom in/out.
        </p>
        <p>
          <strong className="font-medium">Arrow Keys:</strong> Rotate the scene.
        </p>
        {/* Add more instructions as needed */}
      </div>
    </div>
  );
};

export default HelpTooltip;
