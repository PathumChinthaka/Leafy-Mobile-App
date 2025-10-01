import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, router, useFocusEffect } from "expo-router";
import { getPlants } from "@/firebase/db/plants";
import { useCallback, useEffect, useState } from "react";
import { Plant } from "@/types/plant";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function PlantScreen() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const fetchPlants = async () => {
        try {
          setLoading(true);
          const plants = await getPlants();
          if (plants) {
            setPlants(plants);
          }
          setLoading(false);
        } catch (error) {
          console.error("failed to fetch plants", error);
          setLoading(false);
        }
      };
      fetchPlants();
    }, [])
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleDeletePlant = async (id: string) => {
    try {
    } catch (error) {
      console.error("Failed to delete plant:", error);
    }
  };

  const confirmDeletePlant = (id: string) => {
    Alert.alert("Delete Plant", "Are you sure you want to delete this plant?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => handleDeletePlant(id),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#122118]">
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-white text-lg font-bold flex-1 text-center">
          My Plants
        </Text>
      </View>

      <View className="px-4 mb-3">
        <View className="flex-row items-center bg-[#264532] rounded-lg px-3 h-12">
          <Ionicons name="search" size={20} color="#96c5a9" />
          <TextInput
            placeholder="Search plants"
            placeholderTextColor="#96c5a9"
            className="flex-1 text-white ml-2"
          />
        </View>
      </View>

      <ScrollView className="flex-1">
        {plants?.length > 0 &&
          plants.map((plant) => (
            <View
              key={plant.id}
              className="flex-row items-center justify-between bg-[#122118] px-4 py-3 border-b border-[#264532]"
            >
              <View>
                <Text className="text-white text-base font-medium">
                  {plant.name}
                </Text>
                <Text className="text-[#96c5a9] text-sm">
                  Category: {plant.category}
                </Text>
              </View>
              <View className="flex-row items-center space-x-3">
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/plant/[id]",
                      params: { id: plant.id.toString() },
                    })
                  }
                >
                  <Ionicons name="pencil" size={20} color="#96c5a9" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => confirmDeletePlant(plant.id)}>
                  <Ionicons name="trash" size={20} color="grey" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
