import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styl from "react-native-styl";

export const Container = styl(View)<{
  pickerHeight: number;
  itemHeight: number;
}>(({ props }) => ({
  height: props.pickerHeight,
  position: "relative",
  marginTop: props.itemHeight,
}));

export const BackgroundTop = styl(View)<{ itemHeight: number }>(
  ({ props, theme }) => ({
    backgroundColor: "red",
    top: -props.itemHeight - 20,
    height: props.itemHeight + 20,
    width: "100%",
    position: "absolute",
  })
);

export const BackgroundBottom = styl(View)<{ itemHeight: number }>(
  ({ props, theme }) => ({
    backgroundColor: "pink",
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
}>(({ props, theme }) => ({
  height: props.itemHeight,
  borderTopWidth: 2,
  borderBottomWidth: 2,
  borderColor: "blue",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: props.pickerHeight / 2 - props.itemHeight / 2,
  right: 0,
  left: 0,
  zIndex: -1,
}));
