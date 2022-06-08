import React from 'react';
import { View, Image, Text, ScrollView, useWindowDimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { Easing, FadeIn, FadeOut, useAnimatedRef } from 'react-native-reanimated';

type Props = NativeStackNavigationProp<RootStackParamList, 'ArticleDetails'>;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const ArticleDetailsScreen = ({
    navigation,
    route,
}: Props) => {
    const { height } = useWindowDimensions();
    const { id, uri, userPic, username, aspectRatio, color, likes, description } = route.params;

    const aref = useAnimatedRef<ScrollView>();

    return (
        <>
            <ScrollView ref={aref} style={{ display: 'flex', 
                    backgroundColor: color, }}>
                <View style={{
                    height: height - 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{ position: 'relative', marginBottom: 50 }}>
                        <SharedElement id={`item.${id}.image`}>
                            <Image source={{uri}} style={{ width: '100%', aspectRatio }}/>
                        </SharedElement>
                        <AnimatedLinearGradient
                            entering={FadeIn.delay(300).duration(700).easing(Easing.inOut(Easing.ease))}
                            colors={['rgba(0,0,0,0.3)', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 0.15 }}
                            style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}
                        />
                        <View style={{
                            position: 'absolute',
                            left: 15,
                            top: 10,
                            marginRight: 10,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: -2,
                                height: 1,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 10,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Animated.Image
                            entering={FadeIn.duration(700).delay(300)}
                            source={{uri: userPic, width: 20, height: 20 }}
                            style={{
                                borderRadius: 30,
                                marginRight: 8,
                            }}/>
                            <SharedElement id={`item.${id}.username`}>
                                <Text style={{
                                    fontSize: 12,
                                    color: 'white',
                                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                    textShadowOffset: { width: -1, height: 1 },
                                    textShadowRadius: 3,
                                }}>{username}</Text>
                            </SharedElement>
                        </View>
                        <Animated.View
                        entering={FadeIn.duration(700).delay(300)}
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 15,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <AntDesign name="heart" size={15} color="#F17881"/>
                            <Text style={{color: '#F17881', marginTop: 2, fontSize: 10, fontWeight: 'bold' }}>{likes}</Text>
                        </Animated.View>
                    </View>
                    <Animated.View style={{ position: 'absolute', bottom: 40 }} entering={FadeIn.duration(700).delay(300)}>
                        <TouchableOpacity onPress={() => aref.current.scrollTo({ y: height - 50 }, 0, true)}>
                            <AntDesign name="arrowdown" size={24} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <View style={{
                    backgroundColor: 'white',
                    marginHorizontal: 16,
                    borderRadius: 20,
                    borderBottomLeftRadius: 40,
                    borderBottomRightRadius: 40,
                    marginBottom: 16,
                    padding: 16,
                    paddingBottom: 24,
                }}>
                    <View style={{ display: 'flex' }}>
                        <Text style={{ marginBottom: 6 }}>Description:</Text>
                        <Text style={{ fontStyle: 'italic' }}>
                            {description}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <Animated.View style={{ position: 'absolute', top: 20, right: 20 }} entering={FadeIn.duration(700).delay(300)}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>
            </Animated.View>
        </>
    );
}

ArticleDetailsScreen.sharedElements = route => {
    const { id } = route.params;
    return [
        { id: `item.${id}.image`, animation: 'move', resize: 'clip' },
        { id: `item.${id}.username`, animation: 'fade', resize: 'clip' },
        { id: `item.${id}.overgradient`, animation: 'move', resize: 'clip' },
    ];
}