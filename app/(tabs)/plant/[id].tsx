import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Pressable,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { ArrowLeft } from "lucide-react-native";
import { updatePlant, getPlantById } from "@/firebase/db/plants";
import { Plant } from "@/types/plant";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function UpdatePlantScreen() {
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

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setLoading(true);
        if (id) {
          const fetchedPlant = await getPlantById(id as string);
          if (fetchedPlant) {
            setPlant(fetchedPlant);
            setPlantName(fetchedPlant.name || "");
            setQuantity(fetchedPlant.quantity?.toString() || "");
            setSpecies(fetchedPlant.species || "");
            setCategory(fetchedPlant.category || "vegetable");
            setDatePlanted(fetchedPlant.datePlanted || new Date());
            setWateringFrequency(
              fetchedPlant.wateringFrequency?.toString() || ""
            );
            setNotes(fetchedPlant.notes || "");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  const handleUpdatePlant = async () => {
    if (!plant) return;

    if (!plantName || !quantity || !wateringFrequency || !category) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    if (isNaN(Number(quantity)) || isNaN(Number(wateringFrequency))) {
      Alert.alert(
        "Invalid Input",
        "Quantity and watering frequency must be numbers."
      );
      return;
    }

    try {
      setLoading(true);
      const updatedPlant: Plant = {
        ...plant,
        name: plantName.toLowerCase(),
        species: species || null,
        category,
        datePlanted,
        wateringFrequency: Number(wateringFrequency),
        notes,
        quantity: Number(quantity),
        updatedOn: new Date(),
      };

      await updatePlant(id.toString(), updatedPlant);

      Alert.alert("Success", "Plant updated successfully!");

      setTimeout(() => {
        router.replace("/plant");
      }, 1500);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          Update Plant
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
          onPress={handleUpdatePlant}
          className="bg-[#20df6c] rounded-lg h-12 items-center justify-center"
        >
          <Text className="text-[#122118] font-bold text-base">Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
