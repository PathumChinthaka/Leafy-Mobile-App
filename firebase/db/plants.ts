import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where, 
} from "firebase/firestore";
import { Plant } from "../../types/plant";
import { database } from "../firebase.config";

const plantsColection = collection(database, "plants");

export async function getPlants(searchQuery?: string | null): Promise<Plant[]> {
  let plantQuery;

  if (searchQuery) {
    const search = searchQuery.toLowerCase();
    plantQuery = query(
      plantsColection,
      orderBy("name"),
      where("name", ">=", search),
      where("name", "<=", search + "\uf8ff")
    );
  } else {
    plantQuery = query(plantsColection, orderBy("name"));
  }

  const plantCollection = await getDocs(plantQuery);

  return plantCollection.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      species: data.species,
      category: data.category,
      datePlanted: data.datePlanted?.toDate(),
      wateringFrequency: data.wateringFrequency,
      notes: data.notes,
      quantity: data.quantity,
      activeStatus: data.activeStatus,
      updatedOn: data.updatedOn?.toDate(),
    } as Plant;
  });
}

export async function getPlantById(id: string): Promise<Plant | null> {
  const plantDetails = doc(database, "plants", id);
  const plant = await getDoc(plantDetails);

  if (!plant.exists()) return null;

  const data = plant.data();
  return {
    id: plant.id,
    name: data.name,
    species: data.species,
    category: data.category,
    datePlanted: data.datePlanted?.toDate(),
    wateringFrequency: data.wateringFrequency,
    notes: data.notes,
    quantity: data.quantity,
    activeStatus: data.activeStatus,
    updatedOn: data.updatedOn?.toDate(),
  } as Plant;
}

export async function getLastFivePlants(): Promise<Plant[]> {
  const dbquery = query(plantsColection, orderBy("datePlanted", "desc"), limit(5));
  const snapshot = await getDocs(dbquery);

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      species: data.species,
      category: data.category,
      datePlanted: data.datePlanted?.toDate(),
      wateringFrequency: data.wateringFrequency,
      notes: data.notes,
      quantity: data.quantity,
      activeStatus: data.activeStatus,
      updatedOn: data.updatedOn?.toDate(),
    } as Plant;
  });
}

export async function getTotalPlants(): Promise<number> {
  const snapshot = await getDocs(plantsColection);

  return snapshot.docs.reduce((sum, d) => {
    const data = d.data();
    return sum + (data.quantity || 0);
  }, 0);
}

export async function addPlant(
  plant: Omit<Plant, "id" | "updatedOn">
): Promise<Plant> {
  const plantDetails = await addDoc(plantsColection, {
    ...plant,
    updatedOn: serverTimestamp(),
    activeStatus: plant.activeStatus ?? true, 
  });

  return { id: plantDetails.id, ...plant, updatedOn: null, activeStatus: true };
}

export async function updatePlant(
  id: string,
  updates: Partial<Plant>
): Promise<void> {
  const plantDetails = doc(database, "plants", id);

  await updateDoc(plantDetails, {
    ...updates,
    updatedOn: serverTimestamp(),
  });
}

export async function deletePlant(id: string): Promise<void> {
  await deleteDoc(doc(database, "plants", id));
}
