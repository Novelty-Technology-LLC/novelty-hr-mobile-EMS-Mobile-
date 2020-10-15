import React from 'react'
import {View,Text,ScrollView,Image} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import  { responseDay } from '../../utils/getDay';
import  { leadname } from '../../utils/getName';
import State from '../leave_screen/state'

const response = ({responses,data,style}) => {
    return <>
        {
            JSON.parse(data.lead).length !==
              responses.pendingResponses.length &&
              <>

                  <Text style={style.response}>Responses</Text>
                <View style={style.main}>
                  <View style={style.imageView}>
                    <Image
                      style={style.image}
                      source={
                        responses.user.image_url
                          ? { uri: responses.user.image_url }
                          : require('../../../assets/images/person.jpeg')
                      }
                    />
                    <View style={style.senderView}>
                      <View style={style.teamWrapper}>
                        <Text style={style.sender}>
                          {leadname(responses.user)}
                        </Text>
                        <State state={responses.action} />
                      </View>
                      <View style={style.teamLeadView}>
                        <Text style={style.teamLead}>Team Lead</Text>
                        <Text style={style.text}>
                          on {responseDay(responses)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={style.leadText}>{responses.note}</Text>
                </View>
                <View style={style.spacer} />
              </>
            }
          {data.state !== 'Denied' &&  (
            <>
            {
                    responses.pendingResponses.length > 0 &&
              <View style={style.pendingresponseView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={style.response}>Pending Responses</Text>
                    <FlatList data={responses.pendingResponses} keyExtractor={item=>item.index} renderItem={({item})=><>
                        <View style={style.main} >
                          <View style={style.imageView}>
                            <Image
                              style={style.image}
                              source={
                                item.image_url
                                  ? { uri: item.image_url }
                                  : require('../../../assets/images/person.jpeg')
                              }
                            />
                            <View style={style.senderView}>
                              <View style={style.teamWrapper}>
                                <Text style={style.sender}>
                                  {leadname(item)}
                                </Text>
                              </View>
                              <View style={style.teamLeadView}>
                                <Text style={style.teamLead}>
                                  Team Lead
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={style.spacer} />
                      </>}
                      >

                      </FlatList>
                </ScrollView>
              </View>
}
            </>
                            
          )}
          </>
}

export default response

