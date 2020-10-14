import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { teamStyle as style } from '../../../assets/styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getlead } from '../../services';
import colors from '../../../assets/colors';
import { LeadPlaceHolder } from '../loader';

class Teams extends Component {
  state = {
    lead: [],
    teamLead: [],
  };
  list = [];
  data = [];

  async componentDidMount() {
    getlead().then((data) =>
      this.setState({ teamLead: data }, () => {
        this.props.defaultValue &&
          this.state.teamLead.map((val) => {
            JSON.parse(this.props.defaultValue).map((id) => {
              if (id === val.lead_id) {
                val.selected = val.first_name;
                this.data.push(val);
              }
            });
          });

        this.props.values.userQuota = data.length > 0 && data[0].userLeaveQuota;
        this.setState({ lead: [...this.state.lead].concat(this.data) });
      })
    );
  }
  
  render() {  
    return (
      <View style={style.container}>
        <Text style={style.text}>Team Lead</Text>
        {this.state.teamLead.length > 0 ? (
          <ScrollView
            style={style.scrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={style.wrapper}>
              {this.state.teamLead.map((val, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (val.selected) {
                        val.selected = false;
                      } else {
                        val.selected = val.first_name;
                      }
                      this.setState(
                        { lead: [...new Set(this.state.lead.concat(val))] },
                        () =>
                          this.props.handleChange('lead')(
                            JSON.stringify(
                              this.state.lead
                                .filter((item) => item.selected)
                                .map((item) => item.lead_id)
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
                            item.selected === val.first_name && (
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
                          {val.first_name.length > 14
                            ? val.first_name.substring(0, 14 - 2) + '...'
                            : val.first_name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <LeadPlaceHolder />
        )}
      </View>
    );
  }
}

export { Teams };
