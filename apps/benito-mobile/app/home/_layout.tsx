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
      initialRouteName="needs"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen
        name="user-profile"
        options={{
          href: '/home/user-profile',
          title: 'Usuário',
          tabBarIcon: ({ color }) => (<TabBarIcon title="profile" />),
        }}
      />
      <Tabs.Screen
        name="needs"
        options={{
          href: '/home/needs',
          title: 'Necessidades',
          tabBarIcon: ({ color }) => (<TabBarIcon title="needs" />),
        }}
      />
      <Tabs.Screen
        name="entities"
        options={{
          href: '/home/entities',
          title: 'Organizações',
          tabBarIcon: ({ color }) => (<TabBarIcon title="Organizações" />),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
