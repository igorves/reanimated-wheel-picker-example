import React from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";

import WheelPicker from "./components/wheel-picker";

const NUMBERS = [...Array(10).keys()].map((item) => ({
  id: item + 1,
  name: `${item + 1}`,
}));

const App = () => {
  const [selected, setSelected] = React.useState(NUMBERS[2]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#E7F3FA",
        flexGrow: 1,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          flexGrow: 1,
          justifyContent: "center",
        }}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
      >
        <WheelPicker
          value={selected}
          items={NUMBERS}
          onChange={(item) => {
            setSelected(item);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
