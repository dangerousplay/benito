import { Text, View } from 'react-native';
import { Base } from '@/components/base';

import { useFindManyTag } from 'benito-common/hooks';

export const Calendar = () => {
    const {data: entityCategories, error, isFetching} = useFindManyTag({
        select: {name: true, id: true}
    })

  return (
    <Base>
      <View className="items-center">
        <Text className="text-2xl font-bold">Calendar Tab</Text>
        <Text>A great tool for planning :)</Text>
          {entityCategories?.map(i => <Text>{i.name}</Text>)}
      </View>
    </Base>
  );
};

export default Calendar;
