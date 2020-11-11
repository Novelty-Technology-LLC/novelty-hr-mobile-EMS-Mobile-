import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { descriptionStyle, leaveType as style } from '../../../assets/styles';
import color from '../../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllProjects } from '../../services/projectService';
import { ProjectPlaceHolder } from '../loader';
import colors from '../../../assets/colors';

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
  const getPojects = () => {
    setLoading(true);
    getAllProjects()
      .then((data) => {
        setLoading(false);
        setProjects(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    !defaultValue && getPojects();
  }, []);

  const [type, setType] = useState(0);
  return (
    <View style={style.container}>
      <View style={style.wrapper}>
        {loading && <ProjectPlaceHolder />}
        {defaultValue ? (
          <Text style={style.text}>
            Selected Project :{' '}
            <Text style={{ color: colors.primary }}>{defaultValue}</Text>
          </Text>
        ) : (
          <>
            <Text style={style.text}>Choose a Project *</Text>
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
