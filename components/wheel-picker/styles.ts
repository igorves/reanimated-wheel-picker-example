import { Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styl from "react-native-styl";

export const Container = styl(View)<{ pickerHeight: number }>(({ props }) => ({
  height: props.pickerHeight,
  position: "relative",
}));

export const BackgroundTop = styl(View)<{ itemHeight: number }>(
  ({ props }) => ({
    backgroundColor: "#E7F3FA",
    top: -props.itemHeight - 20,
    height: props.itemHeight + 20,
    width: "100%",
    position: "absolute",
  })
);

export const BackgroundBottom = styl(View)<{ itemHeight: number }>(
  ({ props }) => ({
    backgroundColor: "#E7F3FA",
    bottom: -props.itemHeight - 25,
    height: props.itemHeight + 25,
    width: "100%",
    position: "absolute",
  })
);

export const GradientTop = styl(LinearGradient)<{ itemHeight: number }>(
  ({ props }) => ({
    height: props.itemHeight - 10,
    width: "100%",
    top: 0,
    position: "absolute",
  })
);

export const GradientBottom = styl(LinearGradient)<{ itemHeight: number }>(
  ({ props }) => ({
    height: props.itemHeight - 10,
    width: "100%",
    bottom: 0,
    position: "absolute",
  })
);

export const Selected = styl(View)<{
  itemHeight: number;
  pickerHeight: number;
}>(({ props }) => ({
  height: props.itemHeight,
  borderTopWidth: 2,
  borderBottomWidth: 2,
  borderColor: "#CBD3D8",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: props.pickerHeight / 2 - props.itemHeight / 2,
  right: 0,
  left: 0,
  zIndex: -1,
}));

export const Title = styl(Text)({
  fontSize: 20,
  textAlign: "center",
  color: "#534B46",
});
