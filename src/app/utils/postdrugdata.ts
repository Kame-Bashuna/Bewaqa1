// export interface DrugData {
//   name: string;
//   status: string;
//   batchNo: string;
//   manufactureDate: string;
// }

// export async function fetchDrugData(): Promise<DrugData> {
//   const response = await fetch('/api/imageupload');
//   if (!response.ok) {
//     throw new Error('Failed to fetch drug data');
//   }
//   return response.json();
// }



export interface DrugData {
  name: string;
  status: string;
  batchNo: string;
  manufactureDate: string;
}
interface DrugImageUploadSuccessResponse {
  message: string;
  data?: DrugData;
}
interface DrugImageUploadErrorResponse {
  error: string;
}
const drugImageUploadUrl = '/api/imageupload';
type FetchDrugImageFunction = () => Promise<DrugImageUploadSuccessResponse>;
export const fetchDrugData: FetchDrugImageFunction = async () => {
  try {
    const response = await fetch(drugImageUploadUrl, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData:
      | DrugImageUploadSuccessResponse
      | DrugImageUploadErrorResponse = await response.json();
    if (!response.ok) {
      throw new Error(
        (responseData as DrugImageUploadErrorResponse).error ||
          "Drug image upload failed"
      );
    }
    return responseData as DrugImageUploadSuccessResponse;
  } catch (error) {
    console.error("Error fetching drug data:", error);
    throw error;
  }
};
