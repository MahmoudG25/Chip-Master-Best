import { useState, useEffect, useCallback } from 'react';
import { useDatabase } from '../contexts/DatabaseContext';
import { searchChipInGoogle } from '../services/geminiService';

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

  const handleNeuralSearch = useCallback(async (code) => {
    const codeToSearch = code || inputCode;
    if (!codeToSearch) return;

    setIsSearching(true);
    try {
      const info = await searchChipInGoogle(codeToSearch);
      if (info) {
        const result = {
          code: codeToSearch.toUpperCase(),
          sizeDisplay: info.size,
          description: info.description,
          brand: info.brand,
          techDetails: info.techDetails,
          source: 'AI Nexus',
          colorHex: '#00D9FF',
          sources: info.sources
        };
        setLastResult(result);
        setSearchTab('neural');
        return result;
      }
    } catch (error) {
      console.error("Neural search error:", error);
      throw error;
    } finally {
      setIsSearching(false);
    }
  }, [inputCode]);

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
    handleNeuralSearch,
    selectMatch,
    resetSearch
  };
};
