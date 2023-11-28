import type React from 'react';
import { SafeAreaView } from 'react-native';

type BaseProps = {
  classesName?: string;
};

export const Base = ({ children, classesName = '' }: React.PropsWithChildren<BaseProps>) => {
  return <SafeAreaView className={`pt-4 ${classesName}`}>{children}</SafeAreaView>;
};
