import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ResetPasswordDebug = () => {
  const [searchParams] = useSearchParams();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const info = {
      fullURL: window.location.href,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      searchParamsEntries: Array.from(searchParams.entries()),
      hashParams: window.location.hash ? Array.from(new URLSearchParams(window.location.hash.substring(1)).entries()) : [],
      timestamp: new Date().toISOString()
    };
    
    console.log('Debug Info:', info);
    setDebugInfo(info);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Reset Password Debug</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">URL Analysis</h2>
          
          <div className="space-y-2">
            <div>
              <strong>Full URL:</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">{debugInfo.fullURL}</pre>
            </div>
            
            <div>
              <strong>Pathname:</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1">{debugInfo.pathname}</pre>
            </div>
            
            <div>
              <strong>Search:</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1">{debugInfo.search || 'None'}</pre>
            </div>
            
            <div>
              <strong>Hash:</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1">{debugInfo.hash || 'None'}</pre>
            </div>
            
            <div>
              <strong>Search Params:</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1">
                {debugInfo.searchParamsEntries?.length > 0 
                  ? JSON.stringify(debugInfo.searchParamsEntries, null, 2)
                  : 'None'}
              </pre>
            </div>
            
            <div>
              <strong>Hash Params:</strong>
              <pre className="bg-gray-100 p-2 rounded mt-1">
                {debugInfo.hashParams?.length > 0 
                  ? JSON.stringify(debugInfo.hashParams, null, 2)
                  : 'None'}
              </pre>
            </div>
          </div>
          
          <div className="mt-6">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordDebug;
