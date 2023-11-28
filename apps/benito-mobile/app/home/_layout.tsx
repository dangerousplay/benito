import { Tabs } from 'expo-router/tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import {HandHeartIcon, UserIcon, UsersIcon} from "benito-common/icons";


export const TabBarIcon = ({title}) => {
  return (
    <View className="flex-col items-center mt-10">
      <Text className="text-sm text-black" >
        {title}
      </Text>
    </View>
  );
};

export const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName="needs"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen
        name="user-profile"
        options={{
          href: '/home/user-profile',
          title: 'Usuário',
          tabBarIcon: ({ color }) => (<UserIcon color={color} height={32} width={32}/>),
        }}
      />
      <Tabs.Screen
        name="needs"
        options={{
          href: '/home/needs',
          title: 'Necessidades',
          tabBarIcon: ({ color }) => (<HandHeartIcon color={color} height={26} width={26}/>),
        }}
      />
      <Tabs.Screen
        name="entities"
        options={{
          href: '/home/entities',
          title: 'Organizações',
          tabBarIcon: ({ color }) => (<UsersIcon color={color} height={36} width={36}/>),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
