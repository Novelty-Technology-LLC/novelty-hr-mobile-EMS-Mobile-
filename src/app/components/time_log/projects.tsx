import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  descriptionStyle,
  leaveType as style,
  myRequestsStyle,
} from '../../../assets/styles';
import color from '../../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllProjects } from '../../services/projectService';
import { ProjectPlaceHolder } from '../loader';
import colors from '../../../assets/colors';
import { AppIcon } from '../../common';

const Projects = ({
  handleChange,
  error,
  touched,
  defaultValue,
}: {
  handleChange: Function;
  error: any;
  touched: any;
  defaultValue: number;
}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showmore, setShowmore] = useState('chevron-down-circle');
  const [allprojects, setAllprojects] = useState([]);
  const getPojects = () => {
    setLoading(true);
    getAllProjects()
      .then((data) => {
        setLoading(false);
        setAllprojects(data);
        setProjects(allprojects.filter((item, id) => id < 4));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    !defaultValue && getPojects();
  }, []);

  useEffect(() => {
    if (showmore === 'chevron-down-circle') {
      setProjects(allprojects.filter((item, id) => id < 4));
    } else {
      setProjects(allprojects);
    }
  }, [showmore]);

  const [type, setType] = useState(0);
  return (
    <View style={style.container}>
      <View style={[style.wrapper, defaultValue ? style.padNone : null]}>
        {loading && <ProjectPlaceHolder />}
        {defaultValue ? (
          <Text style={style.text}>
            Project :{' '}
            <Text style={{ color: colors.primary }}>{defaultValue}</Text>
          </Text>
        ) : (
          <>
            <View style={style.moreContainer}>
              <Text style={[style.text, style.padNone]}>
                Choose a Project *
              </Text>
              <View style={style.row}>
                <Text style={myRequestsStyle.history}>Show more</Text>
                <View style={myRequestsStyle.gap}></View>
                <TouchableOpacity
                  onPress={() =>
                    setShowmore(
                      showmore === 'chevron-up-circle'
                        ? 'chevron-down-circle'
                        : 'chevron-up-circle'
                    )
                  }
                  disabled={allprojects.length < 5}
                >
                  <AppIcon
                    name={showmore}
                    size={25}
                    color={
                      showmore !== 'chevron-up-circle'
                        ? allprojects.length < 5
                          ? colors.secondary
                          : colors.primary
                        : colors.secondary
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={style.body}>
              {projects &&
                projects.map((project, index) => (
                  <>
                    <TouchableOpacity
                      key={project.id}
                      onPress={() => {
                        setType(project.id),
                          handleChange('project_id')(project.id.toString());
                      }}
                      style={style.button}
                    >
                      <View
                        style={
                          type === project.id
                            ? style.paidView
                            : style.floatingView
                        }
                      >
                        <View style={style.icon}>
                          {type === project.id && (
                            <Icon
                              name="check-circle"
                              color={color.primary}
                              size={17}
                              style={{ marginRight: 6 }}
                            />
                          )}
                        </View>
                        <Text
                          style={
                            type === project.id
                              ? style.buttonTextPaid
                              : style.buttonTextFloat
                          }
                        >
                          {project.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {index % 2 === 0 && <View style={style.spacer}></View>}
                  </>
                ))}
            </View>
          </>
        )}
        {error.project_id && touched.project_id && (
          <Text style={descriptionStyle.error}>{error.project_id}</Text>
        )}
      </View>
    </View>
  );
};

export default Projects;
