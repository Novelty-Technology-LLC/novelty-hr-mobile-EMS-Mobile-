import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { header as Header } from "../../common";
import {
  leaveType as style,
  requestLeave,
  historyStyle,
  headerTxtStyle,
  theme,
} from "../../../assets/styles";
import colors from "../../../assets/colors";
import { momentdate } from "../../utils";
import { Tasks } from "../../components/time_log";
import TaskContext from "../../components/time_log/taskContext";
import { RequestButton } from "../../components/requestButton";
import normalize from "react-native-normalize";

const LogListings = ({ route }: any) => {
  let olddata = route.params;
  const [tasks, setTasks] = useState(olddata ? olddata : []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <Header icon={true}>
        <Text
          style={[headerTxtStyle.headerText, { marginLeft: normalize(20) }]}
        >
          {olddata[0] ?? "Log Time"}
        </Text>
      </Header>
      <ScrollView
        style={requestLeave.container}
        showsVerticalScrollIndicator={false}
      >
        {!olddata[0] && (
          <View style={style.container}>
            <View style={style.padNone}>
              <View style={style.editdate}>
                <Text style={style.text}>
                  Project:{" "}
                  <Text style={{ color: colors.primary }}>
                    {olddata[0] ?? olddata.project.name}
                  </Text>
                </Text>
                <Text
                  style={[
                    style.text,
                    {
                      fontSize: normalize(theme.size.xs),
                      color: colors.fontGrey,
                    },
                  ]}
                >
                  {momentdate(olddata.log_date, "ll")}
                </Text>
              </View>
            </View>
          </View>
        )}
        {tasks[0] ? (
          tasks[1].map((item: any) => (
            <Tasks
              key={item.id}
              value={item}
              note={item.note}
              groupby={olddata.groupby}
            />
          ))
        ) : (
          <Tasks value={tasks} />
        )}
        <View style={historyStyle.timelogcontainer}></View>
      </ScrollView>
      {console.log("olddata[0]", olddata)}
      {olddata && (
        <RequestButton screen="logtime" addToList={true} olddata={olddata} />
      )}
    </TaskContext.Provider>
  );
};

export { LogListings };
