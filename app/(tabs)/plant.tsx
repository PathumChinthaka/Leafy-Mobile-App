import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Plant() {
  const plants = [
    { name: "Cherry Tomatoes", category: "Tomatoes", count: 10 },
    { name: "Bell Peppers", category: "Peppers", count: 5 },
    { name: "Basil", category: "Herbs", count: 20 },
    { name: "Sunflowers", category: "Flowers", count: 15 },
    { name: "Cucumbers", category: "Vegetables", count: 8 },
    { name: "Strawberries", category: "Fruits", count: 12 },
  ];

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
        {plants.map((plant, idx) => (
          <View
            key={idx}
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
            <Text className="text-white text-base">{plant.count}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
