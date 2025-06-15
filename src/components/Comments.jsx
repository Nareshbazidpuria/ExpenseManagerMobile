import { Pressable, Text, TextInput, View } from "react-native";
import tw from "twrnc";
import IonIcon from "@expo/vector-icons/Ionicons";
import { primary } from "../utils/common";
import { useState } from "react";
import Avatar from "./Avatar";

const Comments = ({ data }) => {
  const [comments, setComments] = useState([]),
    [payload, setPayload] = useState({ comment: "" }),
    [replying, setReplying] = useState();

  return (
    <View>
      <Text style={tw`my-2 font-semibold`}>Comments</Text>
      {comments?.length ? (
        <View style={tw`mb-1 max-w-full`}>
          {comments.map((comment, index) => (
            <View style={tw`mb-1 border-l border-[${primary}] pl-1`}>
              <View style={tw`flex flex-row items-center gap-2 max-w-4/5`}>
                <Avatar value="Tanvi Negi" w={6} />
                <View>
                  <Text key={index} style={tw`text-xs`}>
                    {comment}
                  </Text>
                  <View style={tw`flex flex-row items-center gap-2`}>
                    <Pressable onPress={setReplying.bind("", comment)}>
                      <Text style={tw`text-[10px] text-[${primary}]`}>
                        Reply
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              {
                <View style={tw`my-1 ml-6`}>
                  <View style={tw`flex flex-row items-center gap-2 max-w-4/5`}>
                    <Avatar value="Naresh Bazidpuria" w={6} />
                    <View>
                      <Text key={index} style={tw`text-xs`}>
                        <Text style={tw`text-[${primary}] font-bold text-xs`}>
                          @Tanvi Negi
                        </Text>{" "}
                        {comment}
                      </Text>
                      <View style={tw`flex flex-row items-center gap-2`}>
                        <Pressable onPress={setReplying.bind("", comment)}>
                          <Text style={tw`text-[10px] text-[${primary}]`}>
                            Reply
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              }
            </View>
          ))}
        </View>
      ) : (
        <Text style={tw`mb-2`}>No comments yet</Text>
      )}
      {/* {data.comments?.length ? <Text>dd</Text> : <Text>No comments yet</Text>} */}
      <View style={tw`${replying ? `border rounded border-[${primary}]` : ""}`}>
        {replying && (
          <View
            style={tw`flex flex-row justify-between items-center bg-green-100 py-1 px-2 rounded border-l-2 border-[${primary}] m-0.5`}
          >
            <View>
              <Text style={tw`font-bold text-[10px]`}>Tanvi Negi </Text>
              <Text style={tw`text-xs`}>{replying}</Text>
            </View>
            <IonIcon
              name="close"
              style={tw`text-base`}
              onPress={setReplying.bind("", false)}
            />
          </View>
        )}
        <View
          style={tw`flex flex-row justify-between items-center px-2 ${
            !replying ? `border rounded-full border-[${primary}]` : ""
          }`}
        >
          <TextInput
            placeholder="Add a comment"
            style={tw`w-[90%] py-1`}
            value={payload.comment}
            onChangeText={(comment) =>
              setPayload((prev) => ({ ...prev, comment }))
            }
          />
          <IonIcon
            name="send"
            style={tw`text-[${primary}] text-lg p-1`}
            onPress={() => setComments([...comments, payload.comment])}
          />
        </View>
      </View>
    </View>
  );
};

export default Comments;
