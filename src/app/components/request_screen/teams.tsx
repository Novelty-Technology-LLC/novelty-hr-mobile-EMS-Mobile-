import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { teamStyle as style } from '../../../assets/styles';
import json from '../../../../fake.json';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../assets/colors';

class Teams extends Component {
  state = {
    lead: [],
  };
  render() {
    return (
      <View style={style.container}>
        <Text style={style.text}>Team Lead</Text>
        <ScrollView
          style={style.scrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={style.wrapper}>
            {json.map((val, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    let joined = [...new Set(this.state.lead.concat(val.name))];
                    this.setState({ lead: joined }, () =>
                      this.props.handleChange('lead')(
                        JSON.stringify(this.state.lead)
                      )
                    );
                  }}
                >
                  <View style={style.main} key={i}>
                    <View style={style.imageView}>
                      <Image
                        style={style.image}
                        source={require('../../../assets/images/person.jpeg')}
                      />
                      {this.state.lead.map(
                        (name) =>
                          name === val.name && (
                            <Icon
                              name="check-circle"
                              size={20}
                              color={colors.green}
                            />
                          )
                      )}
                    </View>
                    <View style={style.spacing}></View>
                    <View style={style.nameView}>
                      <Text style={style.name}>
                        {val.name.length > 14
                          ? val.name.substring(0, 14 - 2) + '...'
                          : val.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export { Teams };

/* <View style={style.container}>
      <Text style={style.text}>Team Lead</Text>
      <ScrollView
        style={style.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={style.wrapper}>
          {json.map((val, i) => {
            return (
              <FieldArray
                name="lead"
                render={(arrayHelpers) => (
                  <TouchableOpacity
                    onPress={() => {
                      arrayHelpers.push(val.name);
                      setstate([...new Set([...state, val.name])]);
                    }}
                  >
                    <View style={style.main} key={i}>
                      <View style={style.imageView}>
                        <Image
                          style={style.image}
                          source={require('../../../assets/images/person.jpeg')}
                        />
                        {state.map(
                          (name) =>
                            name === val.name && (
                              <Icon
                                name="check-circle"
                                size={20}
                                color={colors.green}
                              />
                            )
                        )}
                      </View>
                      <View style={style.spacing}></View>
                      <View style={style.nameView}>
                        <Text style={style.name}>
                          {val.name.length > 14
                            ? val.name.substring(0, 14 - 2) + '...'
                            : val.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>*/
