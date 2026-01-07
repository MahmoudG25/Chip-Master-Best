import { useState, useEffect, useCallback } from 'react';
import { useDatabase } from '../contexts/DatabaseContext';


export const useChipSearch = () => {
  const { searchAllMatches, processScan, chipDefinitions } = useDatabase();
  const [inputCode, setInputCode] = useState('');
  const [searchTab, setSearchTab] = useState('local');
  const [matches, setMatches] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Local Search effect
  useEffect(() => {
    if (searchTab === 'local') {
      const code = inputCode.trim();
      if (code.length >= 2) {
        const results = searchAllMatches(code);
        setMatches(results);
      } else {
        setMatches([]);
      }
    }
  }, [inputCode, searchTab, searchAllMatches, chipDefinitions]);



  const selectMatch = useCallback(async (match) => {
    setLastResult(match);
    setInputCode('');
    setMatches([]);
    
    // Process scan to save in history
    if (match.code) {
      await processScan(match.code);
    }
  }, [processScan]);

  const resetSearch = useCallback(() => {
    setLastResult(null);
    setInputCode('');
    setMatches([]);
  }, []);

  return {
    inputCode,
    setInputCode,
    searchTab,
    setSearchTab,
    matches,
    lastResult,
    isSearching,

    selectMatch,
    resetSearch
  };
};
