import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { ArrowLeft } from "lucide-react-native";
import { addPlant } from "@/firebase/db/plants";
import { Plant } from "@/types/plant";
import uuid from "react-native-uuid";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function AddPlantScreen() {
  const router = useRouter();
  const [plantName, setPlantName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [category, setCategory] = useState<string>("vegetable");
  const [datePlanted, setDatePlanted] = useState(new Date());
  const [wateringFrequency, setWateringFrequency] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddPlant = async () => {
    try {
      setLoading(true);
      const plantDetails: Plant = {
        id: uuid.v4(),
        name: plantName.toLowerCase(),
        species: species || null,
        category: category,
        datePlanted: new Date(),
        wateringFrequency: Number(wateringFrequency),
        notes: notes,
        quantity: Number(quantity),
        activeStatus: true,
        updatedOn: null,
      };
      await addPlant(plantDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      clearPlantData();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const formatDate = (rawDate: Date): string => {
    return rawDate.toLocaleDateString();
  };

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      setDatePlanted(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const clearPlantData = () => {
    setPlantName("");
    setQuantity("");
    setSpecies("");
    setCategory("vegetable");
    setDatePlanted(new Date());
    setWateringFrequency("");
    setNotes("");
    setShowPicker(false);
  };

  return (
    <View className="flex-1 bg-[#122118]">
      <View className="flex-row items-center justify-between p-4 pb-2">
        <TouchableOpacity
          onPress={() => router.replace("/plant")}
          className="size-12 items-center justify-center"
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-white pr-12">
          Add Plant
        </Text>
      </View>

      <ScrollView className="px-4 py-3">
        <View className="mb-4">
          <Text className="text-white mb-1">Plant Name</Text>
          <TextInput
            placeholder="Enter plant name"
            placeholderTextColor="#95c6a9"
            value={plantName}
            onChangeText={setPlantName}
            className="bg-[#254632] text-white rounded-lg h-14 px-4"
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-1">Species (Optional)</Text>
          <TextInput
            placeholder="Enter species"
            placeholderTextColor="#95c6a9"
            value={species}
            onChangeText={setSpecies}
            className="bg-[#254632] text-white rounded-lg h-14 px-4"
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-1">Quantity</Text>
          <TextInput
            placeholder="Enter quantity"
            placeholderTextColor="#95c6a9"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            className="bg-[#254632] text-white rounded-lg h-14 px-4"
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-1">Category</Text>
          <View className="bg-[#254632] rounded-lg">
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
              dropdownIconColor="#95c6a9"
              style={{
                color: "#96c5a9",
                paddingHorizontal: 15,
                backgroundColor: "#264532",
                borderRadius: 12,
                height: 56,
              }}
            >
              <Picker.Item label="Vegetable" value="vegetable" />
              <Picker.Item label="Herb" value="herb" />
              <Picker.Item label="Fruit" value="fruit" />
            </Picker>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-white mb-1">Date Planted</Text>
          <Pressable onPress={showDatepicker}>
            <TextInput
              placeholder="Select date"
              placeholderTextColor="#95c6a9"
              value={formatDate(datePlanted)}
              editable={false}
              className="bg-[#254632] text-white rounded-lg h-14 px-4"
            />
          </Pressable>
          {showPicker && (
            <RNDateTimePicker
              testID="dateTimePicker"
              value={datePlanted}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
            />
          )}
        </View>

        <View className="mb-4">
          <Text className="text-white mb-1">Watering Frequency (Days)</Text>
          <TextInput
            placeholder="e.g. 3"
            placeholderTextColor="#95c6a9"
            value={wateringFrequency}
            onChangeText={setWateringFrequency}
            keyboardType="numeric"
            className="bg-[#254632] text-white rounded-lg h-14 px-4"
          />
        </View>

        <View className="mb-6">
          <Text className="text-white mb-1">Notes</Text>
          <TextInput
            placeholder="Enter notes"
            placeholderTextColor="#95c6a9"
            value={notes}
            onChangeText={setNotes}
            multiline
            className="bg-[#254632] text-white rounded-lg min-h-[120px] px-4 py-3"
          />
        </View>
      </ScrollView>
      <View className="px-4 py-3">
        <TouchableOpacity
          onPress={handleAddPlant}
          className="bg-[#20df6c] rounded-lg h-12 items-center justify-center"
        >
          <Text className="text-[#122118] font-bold text-base">{"Add"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
