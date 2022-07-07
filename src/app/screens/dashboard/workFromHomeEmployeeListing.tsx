import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { headerTxtStyle, listingStyle } from '../../../assets/styles'
import { header as Header } from '../../common'
import { ListPlaceholder } from '../../components/loader/listPlaceHolder'
import { getRequest } from '../../services'
import { navigate } from '../../utils/navigation'
import { ListingCard } from './leaveListingCard'

const WorkFromHomeEmployeeListing = (props: any) => {
  const [list, setList] = useState<any>(null)
  const [loading, setLoading] = useState<any>(null)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        let response: any = await getRequest('work/all', {})
        response = response.map((item: any) => {
          console.log('rss=>', item)

          return {
            status: item.status,
            id: item.users[0].id,
            title: item.users[0].first_name + ' ' + item.users[0].last_name,
            subTitle: item.users[0].designation,
            image: item.users[0].image_url,
          }
        })
        // console.log('rsponse=>', response)
        setList(response)
        setLoading(false)
      } catch (error) {}
    })()
  }, [])

  return (
    <View style={listingStyle.mainContainer}>
      <Header icon={true}>
        <Text style={headerTxtStyle.headerText}>WFH-Employees</Text>
      </Header>
      {loading ? (
        <ListPlaceholder />
      ) : (
        <FlatList
          data={list}
          renderItem={({ item, index }) => {
            return (
              // {status==='1'?
              <TouchableOpacity
                onPress={() =>
                  navigate('employeeDetail', {
                    id: item.id,
                    image: item.image,
                    name: item.title,
                  })
                }
              >
                <ListingCard
                  index={index}
                  item={item}
                  list={list.length}
                  module="employeeList"
                />
              </TouchableOpacity>
              // :
              // <></>
              // }
            )
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  )
}

export { WorkFromHomeEmployeeListing }
