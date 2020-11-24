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
import { AppIcon, SelectButton } from '../../common';
import { momentdate } from '../../utils/momentDate';
import { getUser } from '../../utils';

const Projects = ({
  handleChange,
  error,
  touched,
  defaultValue,
  date,
}: {
  handleChange: Function;
  error: any;
  touched: any;
  defaultValue: number;
  date?: Date;
}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showmore, setShowmore] = useState('chevron-down-circle');
  const [allprojects, setAllprojects] = useState([]);
  const getPojects = async () => {
    const user = await getUser();
    setLoading(true);
    getAllProjects(JSON.parse(user).id)
      .then((data) => {
        setLoading(false);
        setAllprojects(data);
        setProjects(data.filter((item, id) => id < 3));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    !defaultValue && getPojects();
  }, []);

  useEffect(() => {
    if (showmore === 'chevron-down-circle') {
      setProjects(allprojects.filter((item, id) => id < 3));
    } else {
      setProjects(allprojects);
    }
  }, [showmore]);

  const [type, setType] = useState(0);
  return (
    <View style={style.container}>
      <View style={[style.wrapper, defaultValue ? style.padNone : null]}>
        {defaultValue ? (
          <View style={style.editdate}>
            <Text style={style.text}>
              Project :{' '}
              <Text style={{ color: colors.primary }}>{defaultValue}</Text>
            </Text>
            <Text style={style.text}>{momentdate(date, 'll')}</Text>
          </View>
        ) : (
          <>
            <View style={style.moreContainer}>
              <Text style={[style.text, style.padNone]}>Choose a Project</Text>
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
        )}
        {error.project_id && touched.project_id && (
          <Text style={descriptionStyle.error}>{error.project_id}</Text>
        )}
      </View>
    </View>
  );
};

export default Projects;
