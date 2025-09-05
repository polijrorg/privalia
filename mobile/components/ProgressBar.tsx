import React from 'react';
import { View, Text } from 'react-native';
import { Typography } from '~/Utils/Tipografia';

type ProgressBarProps = {
  total: number;
  current: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, current }) => {
  const percentage = (current / total) * 100;

  return (
    <View className="w-full rounded-md p-4">
      <View className="mb-1 flex-row justify-between">
        <Text className={Typography.Titulo3}>Itens Auditados</Text>
        <Text className={Typography.Titulo3}>
          {current} / {total}
        </Text>
      </View>

      <View className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
        <View className="h-full rounded-full bg-green-500" style={{ width: `${percentage}%` }} />
      </View>

      <Text className={Typography.Titulo3}>{total - current} itens restantes</Text>
    </View>
  );
};
