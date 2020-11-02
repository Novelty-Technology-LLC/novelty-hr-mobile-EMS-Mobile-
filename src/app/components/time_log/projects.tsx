import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { descriptionStyle, leaveType as style } from '../../../assets/styles';
import color from '../../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllProjects } from '../../services/projectService';
import { ProjectPlaceHolder } from '../loader';

const Projects = ({
  handleChange,
  error,
}: {
  handleChange: Function;
  error: any;
}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPojects = () => {
    getAllProjects()
      .then((data) => {
        setLoading(false);
        setProjects(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPojects();
  }, []);

  const [type, setType] = useState(0);
  // defaultValue ? (defaultValue.toUpperCase() === 'PAID TIME OFF' ? 1 : 0) : 1
  return (
    <View style={style.container}>
      <View style={style.wrapper}>
        <Text style={style.text}>Choose a Project *</Text>
        {loading && <ProjectPlaceHolder />}
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
                      type === project.id ? style.paidView : style.floatingView
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
        {error.project && (
          <Text style={descriptionStyle.error}>{error.project}</Text>
        )}
      </View>
    </View>
  );
};

export default Projects;
