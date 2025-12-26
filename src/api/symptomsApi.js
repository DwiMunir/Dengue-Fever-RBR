import apiClient from './authApi';

// Mock symptoms data
const mockSymptoms = [
  { id: 1, code: "G01", name: "Demam / Demam naik turun" },
  { id: 2, code: "G02", name: "Mual" },
  { id: 3, code: "G03", name: "Muntah" },
  { id: 4, code: "G04", name: "Bintik-bintik merah (Ruam)" },
  { id: 5, code: "G05", name: "Perut kembung" },
  { id: 6, code: "G06", name: "Mimisan (Pendarahan spontan)" },
  { id: 7, code: "G07", name: "Nyeri sendi" },
  { id: 8, code: "G08", name: "Lemas" },
  { id: 9, code: "G09", name: "Nafsu makan hilang" },
  { id: 10, code: "G10", name: "Penurunan tekanan darah" },
  { id: 11, code: "G11", name: "Pendarahan saluran cerna" },
  { id: 12, code: "G12", name: "Sulit bernapas" },
  { id: 13, code: "G13", name: "Penurunan trombosit" },
  { id: 14, code: "G14", name: "Hematokrit meningkat" },
  { id: 15, code: "G15", name: "Leukosit turun" },
  { id: 16, code: "G16", name: "Nyeri ulu hati" },
  { id: 17, code: "G17", name: "Mencret (diare)" },
  { id: 18, code: "G18", name: "Sakit kepala berat" }
];

// Symptoms API functions
export const symptomsApi = {
  // Get all symptoms/questions
  getSymptoms: async (language = 'id') => {
    // Uncomment when backend is ready:
    const response = await apiClient.get('/symptoms', { 
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('dengue_expert_token')}`,
      }
     });
    return response.data;
  },

  // Get symptom by ID
  getSymptom: async (symptomId) => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const symptom = mockSymptoms.find(s => s.id === parseInt(symptomId));
        
        if (symptom) {
          resolve({ data: symptom });
        } else {
          reject(new Error('Symptom not found'));
        }
      }, 300);
    });
    
    // Uncomment when backend is ready:
    // const response = await apiClient.get(`/symptoms/${symptomId}`);
    // return response.data;
  },
};

export default symptomsApi;
