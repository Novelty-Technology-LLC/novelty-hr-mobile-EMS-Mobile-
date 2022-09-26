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
  hashtagError,
  values,
  updatehashtag,
  editHashtag,
  onChangeHashTag,
}: {
  hashtagError: any;
  handleChange: Function;
  defaultValue?: string;
  timelog?: boolean;
  editlog?: boolean;
  error?: any;
  touched?: any;
  values?: any;
  updatehashtag?: any;
  editHashtag?: string;
  onChangeHashTag: any;
}) => {
  const [type, setType] = useState(0);
  const [loading, setloading] = useState(false);
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

  const onTextAreaChange = (text: string) => {
    let finalText = text;

    if (timelog) {
      onChangeHashTag(hashtagError);
      //code will be in need
      // let tag = text.split(" ");
      // let selectedTag = tag[tag.length - 1];

      // let findHashTag = -1;
      // if (selectedTag.includes("#")) {
      //   if (selectedTag == "#d") {
      //     findHashTag = hashtag.findIndex((item: any) => item.value === "#db");
      //   } else {
      //     findHashTag = hashtag.findIndex((item: any) => {
      //       const regExp = new RegExp(selectedTag, "g");
      //       return item.value.match(regExp);
      //     });
      //   }
      // }

      // if (findHashTag >= 0) {
      //   const isEqual = hashtag[findHashTag].value === selectedTag;
      //   if (!isEqual) {
      //     hashtag[findHashTag].isSelected = false;
      //     if (selectedTag == "#d") {
      //       finalText = tag.filter((item: string) => item !== "#d").join(" ");
      //     } else {
      //       finalText = tag
      //         .filter((item: string) => !item.match(new RegExp(selectedTag)))
      //         .join(" ");
      //     }
      //   }
      // }
      const splitedNote = text.replace(/\n/g, "").split(" ");

      if (splitedNote.length) {
        hashtag.forEach((el: any) => {
          const exist = splitedNote.find((val) => val === el.label);
          el.isSelected = exist ? true : false;
        });
      }

      setHashtag([...hashtag]);
      handleChange("hashtag")(
        JSON.stringify(
          hashtag
            .filter((item: any) => item.isSelected)
            .map((item) => item.value)
        )
      );
    }
    handleChange(error ? "note" : "task")(finalText);
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
                      onChangeHashTag(hashtagError);
                      item.isSelected = !item.isSelected;
                      setType(0),
                        handleChange("hashtag")(
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
                      const isEmpty = newVal + selectedHashtag === [];

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
          maxLength={200}
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
          onChangeText={onTextAreaChange}
        />
        {error && touched && error.note && touched.note && (
          <Text style={style.error}>{error.note}</Text>
        )}
        {hashtagError && <Text style={style.error}>{hashtagError}</Text>}
      </View>
    </View>
  );
};

export { Description };
