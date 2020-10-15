import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { teamStyle as style } from '../../../assets/styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getlead } from '../../services';
import colors from '../../../assets/colors';
import { LeadPlaceHolder } from '../loader';
import { leadname } from '../../utils/getName';
import { getUser, HR_ID } from '../../utils';

class Teams extends Component {
  user = {};
  state = {
    lead: [],
    teamLead: [],
    user: {},
  };
  list = [];
  data = [];

  async componentDidMount() {
    this.setState({ user: JSON.parse(await getUser()) }, () => {
      console.log(this.state.user.id);
    });
    getlead().then((data) => {
      data = data.filter((item) => item.id !== this.state.user.id);
      this.setState({ teamLead: data }, () => {
        this.state.teamLead.map((val) => {
          if (this.props.defaultValue) {
            JSON.parse(this.props.defaultValue).map((id) => {
              if (id === val.id) {
                val.selected = val.first_name;
                this.data.push(val);
              }
            });
          } else {
            if (HR_ID === val.id && this.state.user.id !== HR_ID) {
              val.selected = val.first_name;
              this.data.push(val);
            }
          }
        });
        this.setState({ lead: [...this.state.lead].concat(this.data) });
      });
    });
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
                      if (val.id !== HR_ID) {
                        if (val.selected) {
                          val.selected = false;
                        } else {
                          val.selected = val.first_name;
                        }
                        this.setState(
                          { lead: [...new Set(this.state.lead.concat(val))] },
                          () => {
                            this.props.handleChange('lead')(
                              JSON.stringify(
                                this.state.lead
                                  .filter((item) => item.selected)
                                  .map((item) => item.id)
                              )
                            );
                          }
                        );
                      }
                    }}
                  >
                    <View style={style.main} key={i}>
                      <View style={style.imageView}>
                        <Image
                          style={style.image}
                          source={
                            val.image_url
                              ? { uri: val.image_url }
                              : require('../../../assets/images/person.jpeg')
                          }
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
                        <Text style={style.name}>{leadname(val)}</Text>
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
