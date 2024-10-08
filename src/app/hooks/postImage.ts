// "use client"
// import { useState, useEffect } from 'react';
// import { DrugData, fetchDrugData } from '../utils/postdrugdata'; 

// export function useDrugData() {
//   const [drugData, setDrugData] = useState<DrugData>();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function loadDrugData() {
//       try {
//         const data = await fetchDrugData();
//         setDrugData(data);
//         setIsLoading(false);
//       } catch (err) {
//         setError('Failed to load drug data');
//         setIsLoading(false);
//       }
//     }

//     loadDrugData();
//   }, []);

//   return { drugData, isLoading, error };
// }



"use client"

import { useState, useEffect } from 'react';
import { DrugData, fetchDrugData } from '../utils/postdrugdata';

interface DrugImageUploadSuccessResponse {
  message: string;
  data?: DrugData;
}

export function useDrugData() {
  const [drugData, setDrugData] = useState<DrugData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDrugData() {
      try {
        const response: DrugImageUploadSuccessResponse = await fetchDrugData();
        setDrugData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load drug data');
        setIsLoading(false);
      }
    }

    loadDrugData();
  }, []);

  return { drugData, isLoading, error };
}
