import { Tabs } from 'expo-router/tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';


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
      initialRouteName="profile"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen
        name="user-profile"
        options={{
          href: '/home/user-profile',
          title: 'ss',
          tabBarIcon: ({ color }) => (<TabBarIcon title="profile" />),
        }}
      />
      <Tabs.Screen
        name="needs"
        options={{
          href: '/home/needs',
          title: 'sa',
          tabBarIcon: ({ color }) => (<TabBarIcon title="needs" />),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          href: '/home/calendar',
          title: 'st',
          tabBarIcon: ({ color }) => (<TabBarIcon title="calendar" />),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
