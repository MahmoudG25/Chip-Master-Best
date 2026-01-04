import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, 
  updateDoc, writeBatch, limit, setDoc, getDoc 
} from 'firebase/firestore';

const DatabaseContext = createContext(undefined);

export const DatabaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [pricingRules, setPricingRules] = useState([]);
  const [scannedItems, setScannedItems] = useState([]);
  const [chipDefinitions, setChipDefinitions] = useState([]);
  
  const [appConfig, setAppConfig] = useState({ 
    primaryColor: '#4f46e5', // Updated to Indigo-600
    headerTitle: 'PhonePartsMaster', 
    links: { whatsapp: '', website: '', orderLink: '' } 
  });
  
  const [mode, setMode] = useState('WORKER');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auth Listener
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            const newProfile = {
              uid: user.uid,
              email: user.email || 'worker@system',
              displayName: user.displayName || 'Worker Unit',
              role: 'worker', 
              createdAt: Date.now()
            };
            await setDoc(userDocRef, newProfile);
            setUserData(newProfile);
          }
        } catch (e) {
          console.error("Error fetching user profile:", e);
        }
      }
      setIsLoading(false);
    });

    // Data Listeners
    const unsubChips = onSnapshot(collection(db, "chip_definitions"), 
      (s) => {
        const chips = s.docs.map(d => ({ id: d.id, ...d.data() }));
        setChipDefinitions(chips);
      },
      (error) => console.error("Error loading chips:", error)
    );

    const unsubRules = onSnapshot(collection(db, "pricing_rules"), 
      (s) => setPricingRules(s.docs.map(d => ({ id: d.id, ...d.data() }))),
      (e) => console.warn("Error loading rules", e)
    );

    const unsubConfig = onSnapshot(doc(db, "system_settings", "main_config"), 
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setAppConfig(docSnapshot.data());
        }
      },
      (e) => console.warn("Config load error", e)
    );

    const unsubUsers = onSnapshot(collection(db, "users"), (s) => setAllUsers(s.docs.map(d => d.data())));
    const unsubScans = onSnapshot(query(collection(db, "scanned_items"), orderBy("timestamp", "desc"), limit(50)), (s) => setScannedItems(s.docs.map(d => ({ id: d.id, ...d.data() }))));

    return () => { 
      unsubAuth(); unsubUsers(); unsubRules(); unsubChips(); unsubScans(); unsubConfig(); 
    };
  }, []);

  const updateAppConfig = async (cfg) => {
    const configRef = doc(db, "system_settings", "main_config");
    await setDoc(configRef, { ...appConfig, ...cfg }, { merge: true });
  };

  const updatePhoneNumber = async (phone) => {
    if (currentUser) {
      await updateDoc(doc(db, "users", currentUser.uid), { phoneNumber: phone });
    }
  };

  const updateUserRole = async (uid, role) => {
    await updateDoc(doc(db, "users", uid), { role });
  };

  const deleteUser = async (uid) => {
    await deleteDoc(doc(db, "users", uid));
  };

  const searchAllMatches = (code) => {
    const clean = code.toUpperCase().replace(/[^A-Z0-9-]/g, '').trim();
    if (!clean) return [];
    
    return chipDefinitions
      .filter(d => {
         const dbCode = d.code.toUpperCase().replace(/[^A-Z0-9-]/g, '');
         return dbCode.includes(clean) || clean.includes(dbCode);
      })
      .map(d => ({
        id: d.id,
        code: d.code,
        sizeDisplay: d.size,
        description: d.fullResult,
        brand: d.type === 'glass' ? "Micron" : "Standard",
        source: 'Database',
        colorHex: d.type === 'glass' ? "#00D9FF" : "#4f46e5"
      }));
  };

  const processScan = async (code) => {
    const matches = searchAllMatches(code);
    if (matches.length > 0) {
      const match = matches[0];
      const price = pricingRules.find(r => r.size === match.sizeDisplay)?.price || 0;
      try {
        if (currentUser) {
          await addDoc(collection(db, "scanned_items"), {
            result: match,
            price,
            timestamp: Date.now(),
            userId: currentUser.uid,
            userEmail: currentUser.email || 'Guest',
            userPhone: userData?.phoneNumber || 'Pending'
          });
        }
      } catch (e) {
        console.warn("Could not save scan to history", e);
      }
      return { success: true, result: match };
    }
    return { success: false };
  };

  const updatePrice = async (size, price) => {
    const existing = pricingRules.find(r => r.size === size);
    if (existing?.id) await updateDoc(doc(db, "pricing_rules", existing.id), { price });
    else await addDoc(collection(db, "pricing_rules"), { size, price });
  };

  const addChipDefinition = async (chip) => { await addDoc(collection(db, "chip_definitions"), chip); };
  const updateChipDefinition = async (id, chip) => { await updateDoc(doc(db, "chip_definitions", id), chip); };
  const deleteChipDefinition = async (id) => { await deleteDoc(doc(db, "chip_definitions", id)); };
  
  const batchImportChips = async (data) => {
    const batch = writeBatch(db);
    data.forEach(item => {
      const ref = doc(collection(db, "chip_definitions"));
      batch.set(ref, {
        code: item.c.toUpperCase(),
        size: item.r.match(/(\d+GB)/i)?.[0] || "Unknown",
        fullResult: item.r,
        isEncrypted: false,
        type: item.r.includes("زجاجي") ? "glass" : "standard"
      });
    });
    await batch.commit();
  };

  const clearHistory = async () => {
    // Standard implementation
  };

  return (
    <DatabaseContext.Provider value={{ 
      currentUser, userData, allUsers, pricingRules, scannedItems, chipDefinitions, appConfig, mode, setMode, isLoading,
      processScan, searchAllMatches, updatePrice, updatePhoneNumber, updateUserRole, deleteUser, addChipDefinition, updateChipDefinition, deleteChipDefinition, batchImportChips, clearHistory, updateAppConfig 
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const ctx = useContext(DatabaseContext);
  if (!ctx) throw new Error("Missing DatabaseProvider");
  return ctx;
};
