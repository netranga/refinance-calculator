'use client';
import { useState, useEffect } from 'react';
import WhiteGreenRefinanceCalculator from '@/components/calculator';

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    fetch('/api/perplexity')
      .then(response => response.json())
      .then(data => setApiResponse(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <WhiteGreenRefinanceCalculator />
      {apiResponse && (
        <div className="mt-4">
          <h2>API Response:</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
