import { Text, TextInput, View } from 'react-native';

import { surface } from '$lib/theme/colors';

type Props = {
  value?: string;
  label?: string;
  placeholder?: string;
};

export default ({ value, label, placeholder }: Props) => {
  return (
    <View className="flex-1 flex">
      {label && (
        <Text style={{ fontFamily: 'Manrope' }} className="ml-3 dark:text-white">
          {label}
        </Text>
      )}

      <TextInput
        className="w-full bg-surface-300 dark:bg-surface-500 text-surface-400 px-5 py-2 rounded-full"
        value={value}
        placeholderTextColor={surface[400]}
        placeholder={placeholder}
        editable={false}
      />
    </View>
  );
};
