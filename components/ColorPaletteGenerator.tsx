"use client";

import React, { useState } from 'react';

export default function ColorPaletteGenerator() {
  // State for palettes and saved palettes
  const [palettes, setPalettes] = useState<string[][]>([
    generateRandomPalette(),
    generateRandomPalette(),
    generateRandomPalette(),
  ]);
  const [savedPalettes, setSavedPalettes] = useState<string[][]>([]);

  // Generate random hex color
  function generateRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  }

  // Generate palette of 6 colors
  function generateRandomPalette(): string[] {
    return Array.from({ length: 6 }, () => generateRandomColor());
  }

  // Generate new palettes
  function generateNewPalettes() {
    setPalettes([
      generateRandomPalette(),
      generateRandomPalette(),
      generateRandomPalette(),
    ]);
  }

  // Save palette
  function savePalette(palette: string[]) {
    setSavedPalettes([...savedPalettes, palette]);
  }

  // Copy color to clipboard
  function copyToClipboard(color: string) {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Color Palette Generator</h1>
        
        {/* Generate button */}
        <button
          onClick={generateNewPalettes}
          className="mb-8 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Generate New Palettes
        </button>

        {/* Current Palettes */}
        <div className="space-y-6 mb-12">
          {palettes.map((palette, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex mb-3">
                {palette.map((color, j) => (
                  <div
                    key={j}
                    className="flex-1 h-24 first:rounded-l-lg last:rounded-r-lg cursor-pointer transition transform hover:scale-105"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                    title="Click to copy"
                  />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {palette.map((color, j) => (
                    <div
                      key={j}
                      className="text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                      onClick={() => copyToClipboard(color)}
                    >
                      {color}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => savePalette(palette)}
                  className="text-sm bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
                >
                  Save Palette
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Saved Palettes */}
        {savedPalettes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Saved Palettes</h2>
            <div className="space-y-4">
              {savedPalettes.map((palette, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex">
                    {palette.map((color, j) => (
                      <div
                        key={j}
                        className="flex-1 h-16 first:rounded-l-lg last:rounded-r-lg cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color)}
                        title="Click to copy"
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {palette.map((color, j) => (
                      <div
                        key={j}
                        className="text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                        onClick={() => copyToClipboard(color)}
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}