import React, { useState, useEffect } from "react";
import { View, Text, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Textarea from "react-native-textarea";
import { descriptionStyle as style } from "../../../assets/styles";
import { HashTagButton, SmallHeader } from "../../common";
import { HashtagPlaceHolder } from "../loader";
import { getHash } from "../../services/timeLogService";
import normalize from "react-native-normalize";

const Description = ({
  handleChange,
  defaultValue,
  timelog,
  editlog,
  error,
  touched,
  values,
  updatehashtag,
  hashtags,
  editHashtag,
}: {
  handleChange: Function;
  defaultValue?: string;
  timelog?: boolean;
  editlog?: boolean;
  error?: any;
  touched?: any;
  values?: any;
  hashtags?: any;
  updatehashtag?: any;
  editHashtag?: string;
}) => {
  const [type, setType] = useState(0);

  const [loading, setloading] = useState(false);
  const [hash, sethash] = useState([]);

  const [hashtag, setHashtag] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setloading(true);
        const response = await getHash("timelogHashtag");
        const mapData =
          updatehashtag !== null
            ? response.hashtags.map((item: any) => {
                const hashtag = {
                  ...item,
                  isSelected:
                    updatehashtag?.length && updatehashtag.includes(item.value),
                };
                return hashtag;
              })
            : response.hashtags.map((item) => {
                return {
                  ...item,
                  isSelected: false,
                };
              });
        setHashtag(mapData);
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    };
    fetch();
  }, [updatehashtag]);
  const filterTagWords = (word: string) => {
    //when enter key \n is added in string.to Remove replace(/\n/g, '')
    const splitedNote = word.replace(/\n/g, "").split(" ");
    if (splitedNote.length) {
      hashtag.forEach((el) => {
        const exist = splitedNote.find((val) => val === el.label);
        el.isSelected = exist ? true : false;
      });
    }

    setHashtag([...hashtag]);

    return hashtag;
  };

  const onValueChanged = (name: string, value: string) => {
    let filteredhashtag: any;

    if (name === "note") filteredhashtag = filterTagWords(value);
    console.log(filteredhashtag, "filteredhashtag");
    console.log(value, "filteredhashtag");

    handleChange(name)(value);
    handleChange("hashtags")(
      JSON.stringify(
        filteredhashtag
          .filter((item) => item.isSelected)
          .map((item) => item.label)
      )
    );
  };

  return (
    <View
      style={{
        flexDirection: "column",
        marginTop: normalize(timelog ? 10 : -5),
      }}
    >
      <View
        style={[
          style.main,
          editlog ? { marginTop: 0 } : {},
          {
            marginTop: normalize(
              timelog && Platform.OS === "android" ? -10 : -7
            ),
          },
        ]}
      >
        <SmallHeader text={timelog ? "Task summary" : "Note"} />
        {timelog && (
          <>
            <View style={style.hashtag}>
              {loading && <HashtagPlaceHolder />}
              {hashtag.length > 0 &&
                hashtag.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      item.isSelected = !item.isSelected;

                      setType(0);
                      handleChange("hashtags")(
                        JSON.stringify(
                          hashtag
                            .filter((item) => item.isSelected)
                            .map((item) => item.value)
                        )
                      );

                      const selectedHashtag = item.isSelected ? item.value : "";

                      let newVal: any = values.note;

                      const splittedArr = values.note.split(" ");

                      newVal = splittedArr
                        .filter((val) => val && val !== item.value)
                        .join(" ");
                      const isEmpty = newVal + selectedHashtag === "";

                      handleChange("note")(
                        isEmpty ? "" : newVal + " " + selectedHashtag
                      );
                    }}
                  >
                    <HashTagButton
                      text={item.label}
                      active={item.isSelected}
                      key={index}
                    />
                  </TouchableOpacity>
                ))}
            </View>
          </>
        )}
        <Textarea
          containerStyle={
            error ? style.textareaContainer : style.editlogContainer
          }
          style={style.textArea}
          maxLength={280}
          defaultValue={editHashtag ?? values?.note ?? defaultValue}
          placeholder={
            timelog
              ? "Write a short summary about your task.."
              : "Write a short note for your leave.."
          }
          placeholderTextColor={"#c7c7c7"}
          underlineColorAndroid={"transparent"}
          name={timelog ? "task" : "note"}
          label={timelog ? "task" : "note"}
          onChange={() => {
            onValueChanged(error ? "note" : "task", "");
          }}
          onChangeText={(text: any) => {
            onValueChanged(error ? "note" : "task", text);
          }}
        />
        {error && touched && error.note && touched.note && (
          <Text style={style.error}>{error.note}</Text>
        )}
        {error && touched && error.hashtags && touched.hashtags && (
          <Text style={style.error}>{error.hashtags}</Text>
        )}
      </View>
    </View>
  );
};

export { Description };
