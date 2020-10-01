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
  list = Object.assign(json);
  data = [];

  componentDidMount() {
    this.setState({ lead: [...JSON.parse(this.props.defaultValue)] }, () => {
      this.list.map((val) => {
        this.state.lead.map((id) => {
          if (id === val.id) {
            val.selected = val.name;
            this.data.push(val);
          }
        });
      });
      this.setState({ lead: [...this.state.lead].concat(this.data) });
    });
  }

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
            {this.list.map((val, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (val.selected) {
                      val.selected = false;
                    } else {
                      val.selected = val.name;
                    }
                    this.setState(
                      { lead: [...new Set(this.state.lead.concat(val))] },
                      () =>
                        this.props.handleChange('lead')(
                          JSON.stringify(
                            this.state.lead
                              .filter((item) => item.selected)
                              .map((item) => item.id)
                          )
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
                      {this.state.lead.map((item) => {
                        return (
                          item.selected === val.name && (
                            <View style={style.iconContainer}>
                              <Icon
                                name="check-circle"
                                size={20}
                                color={colors.green}
                              />
                            </View>
                          )
                        );
                      })}
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
