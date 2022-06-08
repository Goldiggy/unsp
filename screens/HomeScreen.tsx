import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity, TextInput } from 'react-native';
import { createApi } from "unsplash-js";
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { AntDesign } from '@expo/vector-icons';
import { useKeyboardHeight } from '../hooks/useKeyboardHeight';
import Animated, {
    withTiming,
    useAnimatedStyle,
    Easing,
  } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';

const api = createApi({
    accessKey: "Jx8E72XZYpOmAVt4bc8ZMTUU5dzpwbThN9l7HdKm3mc"
});

interface ListItemProps extends Basic {
    onPress: () => void;
}

const ListItem = ({
    id,
    user: { username },
    urls: { regular: uri },
    width,
    height,
    onPress
}: ListItemProps) => {
    const aspectRatio = width / height;

    return (
            <TouchableOpacity style={styles.container} onPress={() => onPress()}>
                 <SharedElement id={`item.${id}.image`}>
                    <Image source={{uri }} style={{ width: '100%', aspectRatio }}/>
                </SharedElement>
                <SharedElement style={styles.title} id={`item.${id}.username`}>
                    <Text style={styles.title}>{username}</Text>
                </SharedElement>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingBottom: 1,
    },
    title: {
        position: 'absolute',
        fontSize: 16,
        color: 'white',
        bottom: 16,
        left: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 6,
    },
    emoji: {
        fontSize: 40,
    },
  });

type Props = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState<Basic[]>(null);
    const queryInput = useRef<string>('cat');

    const fetchData = useCallback(async (input: string) => {
        setLoading(true);
        const { response } = await api.search
            .getPhotos({ query: input });

        setData(response.results);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData(queryInput.current);
    }, []);

    const onPressArticle = useCallback(({
        id,
        urls: {
            regular: uri
        },
        user: {
            username,
            profile_image: {
                small: userPic
            }
        },
        width,
        height,
        color,
        likes,
        description,
    }: Basic) =>
        navigation.navigate('ArticleDetails', {
            id,
            uri,
            username,
            userPic,
            aspectRatio: width / height,
            color,
            likes,
            description,
        }
    ), []);

    const [ showSearch, setShowSearch ] = useState(false);

    const keyboardHeight = useKeyboardHeight();

    const style = useAnimatedStyle(() => {
        const bottom = withTiming(Math.max(keyboardHeight + 10, 24), { duration: 300, easing: Easing.bezier(0.1, 0.76, 0.55, 0.9) });

        return {
          bottom,
          paddingHorizontal: keyboardHeight ? 10 : 24,
        };
      }, [keyboardHeight]);

    if (loading) {
        return <ActivityIndicator size="large"/>;
    }

    return (
    <View style={{ backgroundColor: 'black', position: 'relative' }}>
        <FlatList
        data={data}
        renderItem={datum => {
            return <ListItem {...datum.item} onPress={() => onPressArticle(datum.item)}/>
        }}
        keyExtractor={item => item.id}/>
        <Animated.View style={[{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
        }, style]}>
            {
            showSearch ?
            <View style={{ position: 'relative', 
            width: '100%', }}>
                <TextInput
                autoFocus
                keyboardAppearance='dark'
                onEndEditing={(e) => {
                    if (e.nativeEvent.text === '') {
                        e.preventDefault();
                        setShowSearch(false);
                        return;
                    } 
                    
                    if(queryInput.current !== e.nativeEvent.text) {
                        queryInput.current = e.nativeEvent.text;
                        fetchData(e.nativeEvent.text);
                        setShowSearch(false);
                    }
                }}
                style={{
                    width: '100%',
                    height: 44,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    color: 'white',
                    borderRadius: 50,
                    paddingHorizontal: 20,
                }}/>
                <TouchableOpacity style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                }}
                onPress={() => setShowSearch(false)}>
                    <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>
            </View> :
                <TouchableOpacity style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 50,
                    width: 44,
                }}>
                    <AntDesign name="search1" size={24} color="white" onPress={() => setShowSearch(true)}/>
                </TouchableOpacity>
            }
        </Animated.View>
    </View>
    );
}
