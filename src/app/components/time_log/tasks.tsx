import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { descriptionStyle, timeLogStyle } from "../../../assets/styles";
import { Task } from "./task";
import Swipe from "../leave_screen/swipe";
import { getHrs, momentdate, totalHours } from "../../utils";
import TaskContext from "./taskContext";
import { navigate } from "../../utils/navigation";
import normalize from "react-native-normalize";

const Tasks = ({ value, handleChange, note, groupby = "Project" }: any) => {
  const [loading, setLoading] = useState(false);
  const { tasks, setTasks } = useContext(TaskContext);
  let notes = [];
  if (tasks[1]) {
    notes = tasks[1].filter((task) => task.id === value.id)[0].note;
  } else {
    notes = tasks.note;
  }
  let row: Array<any> = [];

  return (
    <View style={descriptionStyle.main}>
      <View style={[timeLogStyle.rowAlign, { alignItems: "flex-end" }]}>
        {note && (
          <Text style={[timeLogStyle.dateText]}>
            {groupby === "Date"
              ? value.project.name
              : momentdate(value.log_date, "ll")}
          </Text>
        )}
      </View>
      {notes[0] &&
        notes.map((item, index) => (
          <Swipeable
            key={item.id}
            ref={(ref) => (row[index] = ref)}
            renderRightActions={() => (
              <Swipe
                edittimelog={true}
                item={item}
                value={value}
                onPress={() => {
                  row[index].close();
                }}
                setLoading={setLoading}
              />
            )}
          >
            <TouchableOpacity
              onPress={() => {
                value.item = item;

                navigate("logtime", value);
              }}
              disabled={loading}
            >
              <Task item={item} />
            </TouchableOpacity>
          </Swipeable>
        ))}

      <View style={[timeLogStyle.dateView, { marginBottom: normalize(5) }]}>
        <View style={[timeLogStyle.total, timeLogStyle.gap]}>
          <Text style={[timeLogStyle.date]}>Total</Text>
          <Text style={[timeLogStyle.duration]}>
            {getHrs(totalHours(note ? { note: notes } : { note: tasks.note }))}
          </Text>
        </View>
      </View>
    </View>
  );
};

export { Tasks };
