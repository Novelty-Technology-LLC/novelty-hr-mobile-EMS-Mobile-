import React, { Fragment, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Platform } from "react-native";
import {
  descriptionStyle,
  leaveType as style,
  myRequestsStyle,
} from "../../../assets/styles";
import { getAllProjects } from "../../services/projectService";
import { ProjectPlaceHolder } from "../loader";
import colors from "../../../assets/colors";
import { AppIcon, SelectButton, SmallHeader } from "../../common";
import { getUser } from "../../utils";
import normalize from "react-native-normalize";

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
  const [showmore, setShowmore] = useState("chevron-down-circle");
  const [allprojects, setAllprojects] = useState([]);
  const [type, setType] = useState(0);

  const getPojects = async () => {
    const user: any = await getUser();
    setLoading(true);
    getAllProjects(JSON.parse(user).id)
      .then((data: any) => {
        setLoading(false);

        if (defaultValue) {
          const selectedProject = data.filter(
            (project: any) => project.id === defaultValue
          );
          const unselectedProject = data.filter(
            (project: any) => project.id !== defaultValue
          );
          setProjects(selectedProject.concat([...unselectedProject]));
          setAllprojects(selectedProject.concat(unselectedProject));
        } else {
          setProjects(data);
          setAllprojects(data);
        }
        setType(defaultValue ? defaultValue : data[0].id);
        handleChange("project_id")(
          defaultValue ? defaultValue.toString() : data[0].id.toString()
        );
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getPojects();
  }, []);

  useEffect(() => {
    if (showmore === "chevron-down-circle") {
      if (allprojects.length) {
        let projects = [...allprojects].splice(0, 3);
        const selectedProject = allprojects?.find((x: any) => x.id === type);
        if (!projects.find((x: any) => x.id === type) && selectedProject) {
          projects.unshift(selectedProject);
        }
        // setProjects(projects.splice(0, 3));
        setProjects(allprojects);
      }
    } else {
      setProjects(allprojects);
    }
  }, [showmore]);

  return (
    <View style={style.container}>
      <View style={[style.wrapper]}>
        <>
          <View style={style.moreContainer}>
            <SmallHeader text='Choose a Project' history={true} />
            <TouchableOpacity
              onPress={() =>
                setShowmore(
                  showmore === "chevron-up-circle"
                    ? "chevron-down-circle"
                    : "chevron-up-circle"
                )
              }
              disabled={allprojects.length < 5}
            >
              <View style={[style.row]}>
                <Text style={myRequestsStyle.history}>
                  {showmore === "chevron-up-circle" ? "Show less" : "Show more"}
                </Text>
                <View style={myRequestsStyle.gap} />
                <AppIcon
                  name={showmore}
                  size={25}
                  color={
                    showmore !== "chevron-up-circle"
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
          {projects && showmore !== "chevron-up-circle" ? (
            <View style={[style.body]}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={projects}
                renderItem={({ item, index, separators }) => (
                  <View style={style.scrollHorizontal}>
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setType(item?.id),
                          handleChange("project_id")(item?.id.toString());
                      }}
                    >
                      <SelectButton
                        text={item.name}
                        active={type === item.id}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item?.id}
              />
            </View>
          ) : (
            <View style={[style.body]}>
              {projects.map((project: any, index: number) => (
                <Fragment key={index}>
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setType(project.id),
                        handleChange("project_id")(project.id.toString());
                    }}
                    style={style.projectbutton}
                  >
                    <SelectButton
                      text={project.name}
                      active={type === project.id}
                    />
                  </TouchableOpacity>
                  {index % 3 !== 2 && <View style={style.spacer}></View>}
                </Fragment>
              ))}
            </View>
          )}
        </>
        {error.project_id && touched.project_id && (
          <Text style={descriptionStyle.error}>{error.project_id}</Text>
        )}
      </View>
    </View>
  );
};

export default Projects;
