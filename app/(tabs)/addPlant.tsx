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
import { useLocalSearchParams, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { ArrowLeft } from "lucide-react-native";
import { addPlant } from "@/firebase/db/plants";
import { Plant } from "@/types/plant";
import { v4 as uuidv4 } from "uuid";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function AddPlantScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [plant, setPlant] = useState<Plant | null>(null);
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
        id: uuidv4(),
        name: plantName,
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
          onPress={() => router.back()}
          className="size-12 items-center justify-center"
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-white pr-12">
          Add Plant
        </Text>
      </View>

      <ScrollView className="px-4 py-3">
        <TextInput
          placeholder="Plant Name"
          placeholderTextColor="#95c6a9"
          value={plantName}
          onChangeText={setPlantName}
          className="bg-[#254632] text-white rounded-lg h-14 px-4 mb-4"
        />

        <TextInput
          placeholder="Species (Optional)"
          placeholderTextColor="#95c6a9"
          value={species}
          onChangeText={setSpecies}
          className="bg-[#254632] text-white rounded-lg h-14 px-4 mb-4"
        />

        <TextInput
          placeholder="Quantity"
          placeholderTextColor="#95c6a9"
          value={quantity}
          onChangeText={setQuantity}
          className="bg-[#254632] text-white rounded-lg h-14 px-4 mb-4"
        />

        <View className="bg-[#254632] rounded-lg mb-4">
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

        <Pressable onPress={showDatepicker}>
          <TextInput
            placeholder="Date Planted"
            placeholderTextColor="#95c6a9"
            value={formatDate(datePlanted)}
            editable={false}
            className="bg-[#254632] text-white rounded-lg h-14 px-4 mb-4"
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

        <TextInput
          placeholder="Watering Frequency (Days)"
          placeholderTextColor="#95c6a9"
          value={wateringFrequency}
          onChangeText={setWateringFrequency}
          keyboardType="numeric"
          className="bg-[#254632] text-white rounded-lg h-14 px-4 mb-4"
        />

        <TextInput
          placeholder="Notes"
          placeholderTextColor="#95c6a9"
          value={notes}
          onChangeText={setNotes}
          multiline
          className="bg-[#254632] text-white rounded-lg min-h-[120px] px-4 py-3 mb-6"
        />
      </ScrollView>

      <View className="px-4 py-3">
        <TouchableOpacity
          onPress={handleAddPlant}
          className="bg-[#20df6c] rounded-lg h-12 items-center justify-center"
        >
          <Text className="text-[#122118] font-bold text-base">
            {"Add"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
