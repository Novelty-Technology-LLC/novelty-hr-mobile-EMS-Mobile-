import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { cardStyle, headerTxtStyle, listingStyle } from "../../../assets/styles";
import { textStyles } from "../../../assets/styles/common/text_styles";
import { shoutoutStyles } from "../../../assets/styles/dashboard/shoutout.styles";
import { header as Header } from "../../common";
import { OverlappingAvatars } from "../../common/overlappingAvatars";
import { ListPlaceholder } from "../../components/loader/listPlaceHolder";
import { RequestButton } from "../../components/requestButton";
import { RouteNames } from "../../constant/route_names";
import { getRequest } from "../../services";
import { navigate } from "../../utils/navigation";

const data = [
    {
        id: '1',
        avatars: ['https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
            'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80',
            'https://applemagazine.com/wp-content/uploads/2021/09/146898-phones-feature-the-best-apple-iphone-photos-ever-taken-image1-ydter7skel.jpg',
            'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',],
        title: 'Shoutout 1',
        from: 'Joe',
        date: '2022-10-14',
        desc: 'Elit anim non proident minim eiusmod ipsum voluptate eiusmod sit amet excepteur dolor aliquip aute.',
    },
    {
        id: '2',
        avatars: ['https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
            'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80',
            'https://applemagazine.com/wp-content/uploads/2021/09/146898-phones-feature-the-best-apple-iphone-photos-ever-taken-image1-ydter7skel.jpg',
            'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',],
        title: 'Shoutout 2',
        from: 'Joe',
        date: '2022-10-14',
        desc: 'Elit anim non proident minim eiusmod ipsum voluptate eiusmod sit amet excepteur dolor aliquip aute.',
    },
    {
        id: '3',
        avatars: ['https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
            'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80',
            'https://applemagazine.com/wp-content/uploads/2021/09/146898-phones-feature-the-best-apple-iphone-photos-ever-taken-image1-ydter7skel.jpg',
            'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',],
        title: 'Shoutout 3',
        from: 'Joe',
        date: '2022-10-14',
        desc: 'Elit anim non proident minim eiusmod ipsum voluptate eiusmod sit amet excepteur dolor aliquip aute.',
    },
    {
        id: '4',
        avatars: ['https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80',
            'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80',
            'https://applemagazine.com/wp-content/uploads/2021/09/146898-phones-feature-the-best-apple-iphone-photos-ever-taken-image1-ydter7skel.jpg',
            'https://applemagazine.com/wp-content/uploads/2021/09/146898-phones-feature-the-best-apple-iphone-photos-ever-taken-image1-ydter7skel.jpg',
            'https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg',],
        title: 'Shoutout 4',
        from: 'Joe',
        date: '2022-10-14',
        desc: 'Elit anim non proident minim eiusmod ipsum voluptate eiusmod sit amet excepteur dolor aliquip aute.',
    },
]

const ShoutoutListing = (props: any) => {
    const params = props.route.params;
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    })

    return (
        <View style={listingStyle.mainContainer}>
            <Header icon={true}>
                <Text style={headerTxtStyle.headerText}>Shoutouts</Text>
            </Header>
            {loading || list === null ? (
                <ListPlaceholder />
            ) : (
                <>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigate("shoutoutDetails", {
                                        })
                                    }
                                >
                                    <View style={shoutoutStyles.container}>
                                        <View style={shoutoutStyles.headerContainer}>
                                            <View>
                                                <Text style={cardStyle.titleText}>{item.title}</Text>
                                                <Text style={textStyles.subtitle}>From Joe, 2022-10-14</Text>
                                            </View>
                                            <OverlappingAvatars
                                                avatars={item.avatars}
                                            />
                                        </View>

                                        <Text
                                            numberOfLines={2}
                                            style={textStyles.description}
                                        >{item.desc}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item) => item.id}
                    />
                </>
            )}
        </View>
    );
};

export { ShoutoutListing };
