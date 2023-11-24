import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';


const InputText = ({ label, className = '' }) => {
    return (
        <View className={`space-y-1 ${className}`}>
            <Text>Password</Text>
            <View className="rounded-2xl border-2">
                <TextInput className="mx-2" />
            </View>
        </View>
    );
};

const Login = () => {


    return (
        <View className="flex-1 items-center justify-center space-y-10">

            <View className="w-2/3 space-y-1">
                <Text>Username</Text>
                <View className="rounded-2xl border-2">
                    <TextInput className="mx-2" />
                </View>
            </View>

            <View className="w-2/3 space-y-1">
                <Text>Password</Text>
                <View className="rounded-2xl border-2">
                    <TextInput className="mx-2" />
                </View>
            </View>

            <View className="w-2/3 pt-10">
                <TouchableOpacity className="items-center justify-center bg-gray-200" onPress={(_) => router.replace('/home')}>
                    <Text className="p-1 text-xl font-bold">Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export { Login };
