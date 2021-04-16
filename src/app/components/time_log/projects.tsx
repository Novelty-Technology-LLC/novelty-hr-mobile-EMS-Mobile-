import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  descriptionStyle,
  leaveType as style,
  myRequestsStyle,
} from '../../../assets/styles';
import { getAllProjects } from '../../services/projectService';
import { ProjectPlaceHolder } from '../loader';
import colors from '../../../assets/colors';
import { AppIcon, SelectButton, SmallHeader } from '../../common';
import { getUser } from '../../utils';
import normalize from 'react-native-normalize';

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
  const [type, setType] = useState(0);
  const getPojects = async () => {
    const user = await getUser();
    setLoading(true);
    getAllProjects(JSON.parse(user).id)
      .then((data) => {
        setLoading(false);

        if (defaultValue) {
          const selectedProject = data.filter(
            (project) => project.id === defaultValue
          );
          const unselectedProject = data.filter(
            (project) => project.id !== defaultValue
          );
          setProjects(
            selectedProject.concat(
              unselectedProject.filter((item, id) => id < 2)
            )
          );
          setAllprojects(selectedProject.concat(unselectedProject));
        } else {
          setProjects(data.filter((item, id) => id < 3));
          setAllprojects(data);
        }
        setType(defaultValue ? defaultValue : data[0].id);
        handleChange('project_id')(
          defaultValue ? defaultValue.toString() : data[0].id.toString()
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPojects();
  }, []);

  useEffect(() => {
    if (showmore === 'chevron-down-circle') {
      setProjects(allprojects.filter((item, id) => id < 3));
    } else {
      setProjects(allprojects);
    }
  }, [showmore]);

  return (
    <View style={style.container}>
      <View style={[style.wrapper, defaultValue ? style.padNone : null]}>
        <>
          <View style={style.moreContainer}>
            <SmallHeader text="Choose a Project" history={true} />
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
              <View style={[style.row, { marginBottom: normalize(12) }]}>
                <Text style={myRequestsStyle.history}>
                  {showmore === 'chevron-up-circle' ? 'Show less' : 'Show more'}
                </Text>
                <View style={myRequestsStyle.gap} />
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
              </View>
            </TouchableOpacity>
          </View>
          {loading && <ProjectPlaceHolder />}
          <View style={style.body}>
            {projects &&
              projects.map((project, index) => (
                <>
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setType(project.id),
                        handleChange('project_id')(project.id.toString());
                    }}
                    style={style.projectbutton}
                  >
                    <SelectButton
                      text={project.name}
                      active={type === project.id}
                    />
                  </TouchableOpacity>
                  {index % 3 !== 2 && <View style={style.spacer}></View>}
                </>
              ))}
          </View>
        </>
        {error.project_id && touched.project_id && (
          <Text style={descriptionStyle.error}>{error.project_id}</Text>
        )}
      </View>
    </View>
  );
};

export default Projects;
