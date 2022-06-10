import React from "react";
import { useThrottleCallback } from "@react-hook/throttle";
import { Platform } from "react-native";
// @ts-expect-error
import RNBeep from "react-native-a-beep";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Animated, {
  DerivedValue,
  Extrapolate,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

import * as Styled from "./styles";

const isAndroid = Platform.OS === "android";

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const ITEM_HEIGHT = 56;
const PICKER_HEIGHT = 280;

interface ItemProps {
  children: React.ReactNode;
  index: number;
  selectedIndexValue: DerivedValue<number>;
  scrollAnimatedValue: SharedValue<number>;
}

const Item = React.memo(
  ({ children, index, selectedIndexValue, scrollAnimatedValue }: ItemProps) => {
    const prePreviousPosition = (index - 2) * ITEM_HEIGHT;
    const previousPosition = (index - 1) * ITEM_HEIGHT;
    const currentPosition = index * ITEM_HEIGHT;
    const nextPosition = (index + 1) * ITEM_HEIGHT;
    const postNextPosition = (index + 2) * ITEM_HEIGHT;

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: interpolate(
            scrollAnimatedValue.value,
            [
              prePreviousPosition,
              previousPosition,
              currentPosition,
              nextPosition,
              postNextPosition,
            ],
            [-20, -5, 0, 5, 20],
            Extrapolate.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollAnimatedValue.value,
            [
              prePreviousPosition,
              previousPosition,
              currentPosition,
              nextPosition,
              postNextPosition,
            ],
            [0.75, 0.85, 1, 0.85, 0.75],
            Extrapolate.CLAMP
          ),
        },
      ],
      opacity:
        selectedIndexValue.value > index + 2
          ? 0
          : selectedIndexValue.value < index - 2
          ? 0
          : interpolate(
              scrollAnimatedValue.value,
              [
                prePreviousPosition,
                previousPosition,
                nextPosition,
                postNextPosition,
              ],
              [0.5, 1, 1, 0.5],
              Extrapolate.CLAMP
            ),
    }));

    return (
      <Animated.View
        style={[
          {
            height: ITEM_HEIGHT,
            justifyContent: "center",
          },
          animatedStyles,
        ]}
      >
        <Styled.Title>{children}</Styled.Title>
      </Animated.View>
    );
  }
);

interface IItem {
  id: number;
  name: string;
}

interface Props {
  items: IItem[];
  value: IItem;
  onChange: (value: IItem) => void;
}

const WheelPicker = ({ value, items, onChange }: Props) => {
  const initialValueIndex = React.useMemo(
    () => items.findIndex((item) => item.id === value.id),
    []
  );
  const offset = initialValueIndex * ITEM_HEIGHT;

  const scrollAnimatedValue = useSharedValue(offset);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollAnimatedValue.value = e.contentOffset.y;
  });

  const savedAnimatedValue = useSharedValue(initialValueIndex);

  const mounted = React.useRef(false);
  // Hack for preventing feedback on initial value
  React.useEffect(() => {
    setTimeout(() => (mounted.current = true), 100);
  }, []);

  const onSelectedChange = useThrottleCallback(
    React.useCallback(() => {
      if (mounted.current) {
        if (!isAndroid) {
          RNBeep.PlaySysSound(RNBeep.iOSSoundIDs.KeyPressClickPreview);
        }
        ReactNativeHapticFeedback.trigger("soft", hapticOptions);
      }
    }, []),
    100,
    true
  );

  const selectedIndexValue = useDerivedValue(() => {
    const index = Math.round(scrollAnimatedValue.value / ITEM_HEIGHT);

    const realIndex =
      index <= 0 ? 0 : index >= items.length - 1 ? items.length - 1 : index;

    if (realIndex !== savedAnimatedValue.value) {
      savedAnimatedValue.value = realIndex;
      runOnJS(onSelectedChange)();
    }

    return realIndex;
  });

  const itemsAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            (PICKER_HEIGHT - ITEM_HEIGHT) / 2 - scrollAnimatedValue.value,
        },
      ],
    };
  });

  return (
    <Styled.Container pickerHeight={PICKER_HEIGHT}>
      <Animated.View style={itemsAnimatedStyles}>
        {items.map((item, index) => (
          <Item
            key={item.id}
            index={index}
            selectedIndexValue={selectedIndexValue}
            scrollAnimatedValue={scrollAnimatedValue}
          >
            {item.name}
          </Item>
        ))}
      </Animated.View>
      <Animated.ScrollView
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: PICKER_HEIGHT,
        }}
        contentContainerStyle={{
          height: PICKER_HEIGHT - ITEM_HEIGHT + ITEM_HEIGHT * items.length,
        }}
        snapToInterval={ITEM_HEIGHT}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        contentOffset={{ y: offset, x: 0 }}
        scrollEventThrottle={1}
        onMomentumScrollEnd={() => onChange(items[selectedIndexValue.value])}
      />
      <Styled.BackgroundTop itemHeight={ITEM_HEIGHT} />
      <Styled.BackgroundBottom itemHeight={ITEM_HEIGHT} />
      <Styled.GradientTop
        itemHeight={ITEM_HEIGHT}
        colors={["rgba(231, 243, 250, 1)", "rgba(231, 243, 250, 0)"]}
      />
      <Styled.GradientBottom
        itemHeight={ITEM_HEIGHT}
        colors={["rgba(231, 243, 250, 0)", "rgba(231, 243, 250, 1)"]}
      />
      <Styled.Selected itemHeight={ITEM_HEIGHT} pickerHeight={PICKER_HEIGHT} />
    </Styled.Container>
  );
};

export default WheelPicker;
