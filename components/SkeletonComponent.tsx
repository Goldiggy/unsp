import {
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedStyle, Easing, withTiming, withRepeat, useSharedValue, interpolate } from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface Props {
    width: number;
    height: number;
}

export const SkeletonComponent = ({ width, height }: Props) => {
    const bgValue = useSharedValue(0);

    const skeletonStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolate(bgValue.value, [0, 1], [12, 33]),
        };
      });

      useEffect(() => {
        bgValue.value = withRepeat(withTiming(1, { duration: 1000, easing: Easing.linear }), -1);
      }, [bgValue]);
    return (
        <Animated.View style={[{
            backgroundColor: '#000',
            width,
            height,
        }, skeletonStyle]}>
        </Animated.View>
    )
};
