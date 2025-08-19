import React from 'react';
import { View, Text } from 'react-native';

type ProgressBarProps = {
  total: number;
  current: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, current }) => {
  const percentage = (current / total) * 100;

  return (
    <View className="w-full rounded-md p-4">
      <View className="mb-1 flex-row justify-between">
        <Text className="text-sm text-white">Itens Auditados</Text>
        <Text className="text-sm text-white">
          {current} / {total}
        </Text>
      </View>

      <View className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
        <View className="h-full rounded-full bg-green-500" style={{ width: `${percentage}%` }} />
      </View>

      <Text className="mt-1 text-xs text-gray-400">{total - current} itens restantes</Text>
    </View>
  );
};
