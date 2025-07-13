import { Pressable, Text, TextInput, View } from 'react-native';
import { primary } from '../utils/global';
import { useState } from 'react';
import Avatar from './Avatar';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Comments = ({ data }) => {
  const [comments, setComments] = useState([]),
    [payload, setPayload] = useState({ comment: '' }),
    [replying, setReplying] = useState();

  return (
    <View>
      <Text className={`my-2 font-semibold`}>Comments</Text>
      {comments?.length ? (
        <View className={`mb-1 max-w-full`}>
          {comments.map((comment, index) => (
            <View
              className={`mb-1 border-l pl-1`}
              style={{ borderColor: primary }}
            >
              <View className={`flex flex-row items-center gap-2 max-w-4/5`}>
                <Avatar value="Tanvi Negi" w={30} />
                <View>
                  <Text key={index} className={`text-xs`}>
                    {comment}
                  </Text>
                  <View className={`flex flex-row items-center gap-2`}>
                    <Pressable onPress={setReplying.bind('', comment)}>
                      <Text
                        className={`text-[10px]`}
                        style={{ color: primary }}
                      >
                        Reply
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              {
                <View className={`my-1 ml-6`}>
                  <View
                    className={`flex flex-row items-center gap-2 max-w-4/5`}
                  >
                    <Avatar value="Naresh Bazidpuria" w={30} />
                    <View>
                      <Text key={index} className={`text-xs`}>
                        <Text
                          className={`font-bold text-xs`}
                          style={{ color: primary }}
                        >
                          @Tanvi Negi
                        </Text>
                        {comment}
                      </Text>
                      <View className={`flex flex-row items-center gap-2`}>
                        <Pressable onPress={setReplying.bind('', comment)}>
                          <Text
                            className={`text-[10px]]`}
                            style={{ color: primary }}
                          >
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
        <Text className={`mb-2`}>No comments yet</Text>
      )}
      {/* {data.comments?.length ? <Text>dd</Text> : <Text>No comments yet</Text>} */}
      <View
        className={`${replying ? `border rounded` : ''}`}
        style={{ borderColor: primary }}
      >
        {replying && (
          <View
            className={`flex flex-row justify-between items-center bg-green-100 py-1 px-2 rounded border-l-2 m-0.5`}
            style={{ borderColor: primary }}
          >
            <View>
              <Text className={`font-bold text-[10px]`}>Tanvi Negi </Text>
              <Text className={`text-xs`}>{replying}</Text>
            </View>
            <IonIcon
              name="close"
              className={`text-base`}
              onPress={setReplying.bind('', false)}
            />
          </View>
        )}
        <View
          className={`flex flex-row justify-between items-center px-2 ${
            !replying ? `border rounded-full` : ''
          }`}
          style={{ borderColor: primary }}
        >
          <TextInput
            placeholder="Add a comment"
            className={`w-[90%] py-1`}
            value={payload.comment}
            onChangeText={comment => setPayload(prev => ({ ...prev, comment }))}
          />
          <IonIcon
            name="send"
            className={`text-lg p-1`}
            style={{ color: primary }}
            onPress={() => setComments([...comments, payload.comment])}
          />
        </View>
      </View>
    </View>
  );
};

export default Comments;
