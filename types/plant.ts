export type Plant = {
  id: string;                
  name: string;               
  species?: string;           
  category: string;           
  datePlanted: Date;          
  wateringFrequency: number;  
  lastWatered: Date;          
  notes?: string;
  quantity?: number;             
  imageUrl?: string;          
  activeStatus: boolean;      
  updatedOn: Date;            
};
