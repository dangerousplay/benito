import { Text, View } from 'react-native';
import { Base } from '@/components/base';

export const UserProfile = () => {
  return (
    <Base>
      <View className="items-center">
        <Text className="text-2xl font-bold">User profile Tab</Text>
        <Text>A great place to stay :)</Text>
      </View>
    </Base>
  )
};

export default UserProfile;
