export type Plant = {
  id: string;                
  name: string;               
  species?: string | null;           
  category: string;           
  datePlanted: Date;          
  wateringFrequency: number;  
  notes?: string | null;
  quantity: number;             
  activeStatus: boolean;      
  updatedOn?: Date | null;            
};
