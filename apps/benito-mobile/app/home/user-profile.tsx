import {Text, TextInput, View} from 'react-native';
import {Button} from "@/components";

const LoginOrRegister = () => {
    return (
        <View className="flex-1 items-center justify-center space-y-10">
            <View className="w-2/3 space-y-1">
                <Text>Email</Text>
                <View className="rounded-2xl border-2">
                    <TextInput className="mx-2" />
                </View>
            </View>

            <View className="w-2/3 space-y-1">
                <Text>Senha</Text>
                <View className="rounded-2xl border-2">
                    <TextInput className="mx-2" secureTextEntry />
                </View>
            </View>

            <View className="w-2/3 pt-10">
                <Button variant={'primary'}>Login</Button>
                <Button variant={'secondary'} classesName={"mt-2"}>Registrar-se</Button>
            </View>
            <View className="w-2/3">

            </View>
        </View>
    )
};


export const UserProfile = () => {
  return (
      <LoginOrRegister/>
  )
};

export default UserProfile;
