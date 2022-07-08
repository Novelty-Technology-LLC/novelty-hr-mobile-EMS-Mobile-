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
  let a: any = []

  useEffect(() => {
    workfromHome()
    console.log(list);

  }, [])
  const workfromHome = async () => {
    setLoading(true)

    try {
      let response: any = await getRequest('work/all', {})


      const responses = response.map((item: any) => {

        const res = item.users.map((items: any) => {


          return {
            title: items.first_name + ' ' + items.last_name,
            subTitle: items.designation,
            image: items.image_url,
          }
        });

        return {
          res: res,
          status: item.status,
          id: item.user_id,

        }
      })
      setList(responses)
      console.log(responses);

      setLoading(false)
    } catch (error) {
      console.log(error, "sdcbsdkcj");

    }
  }

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

            console.log(item, "ssss");

            return (
              // {status==='1'?
              <TouchableOpacity
                onPress={() =>
                  navigate('employeeDetail', {
                    id: item.id,
                    image: item.res[0].image,
                    name: item.res[0].title,
                  })
                }
              >
                <ListingCard
                  index={index}
                  item={item.res[0]}
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
