import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getLastFivePlants, getTotalPlants } from "@/firebase/db/plants";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Plant } from "@/types/plant";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function Dashboard() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantCount, setPlantCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const fetchLastFivePlants = async () => {
        try {
          setLoading(true);
          const plants = await getLastFivePlants();
          if (plants) {
            setPlants(plants);
          }
          setLoading(false);
        } catch (error) {
          console.error("failed to fetch plants", error);
          setLoading(false);
        }
      };
      fetchLastFivePlants();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const fetchTotalPlantsCount = async () => {
        try {
          const plantCount = await getTotalPlants();
          if (plantCount) {
            setPlantCount(plantCount);
          }
        } catch (error) {
          console.error("failed to fetch plant count", error);
        }
      };
      fetchTotalPlantsCount();
    }, [])
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#122118]">
      <View className="flex-row items-center justify-between p-4 pb-2">
        <Text className="flex-1 text-center text-lg font-bold text-white pl-12">
          My Greenhouse
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 py-3">
          <View className="rounded-xl overflow-hidden">
            <Image
              source={require("../../assets/images/dashboard-img.png")}
              style={{ width: "100%", height: 250 }}
            />
            <View className="absolute bottom-4 left-4">
              <Text className="text-[28px] font-bold text-white">
                Total Plants: {plantCount}
              </Text>
            </View>
          </View>
        </View>

        <Text className="px-4 pt-5 pb-3 text-[22px] font-bold text-white">
          Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
        >
          {[
            {
              name: "Vegetable",
              img: require("../../assets/images/vegetables.jpg"),
            },
            { name: "Hearb", img: require("../../assets/images/herb.jpg") },
            { name: "Fruit", img: require("../../assets/images/fruits.jpg") },
          ].map((item, idx) => (
            <View key={idx} className="mr-3">
              <Image
                source={item.img}
                resizeMode="cover"
                className="h-32 w-32 rounded-xl"
              />
              <Text className="mt-2 text-center text-white">{item.name}</Text>
            </View>
          ))}
        </ScrollView>

        <Text className="px-4 pt-5 pb-3 text-[22px] font-bold text-white">
          Recent Activity
        </Text>
        {plants.map((activity, idx) => (
          <View
            key={idx}
            className="flex-row items-center gap-4 px-4 py-2 bg-[#122118]"
          >
            <View className="size-12 flex items-center justify-center rounded-lg bg-[#264532]">
              <Ionicons name="leaf" size={24} color="white" />
            </View>
            <View>
              <Text className="text-base font-medium text-white">
                {activity.name}
              </Text>
              <Text className="text-sm text-[#96c5a9]">{`Added ${activity.quantity} plants`}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
