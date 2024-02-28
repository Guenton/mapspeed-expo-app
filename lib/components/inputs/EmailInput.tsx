import { NativeSyntheticEvent, TextInput, TextInputSubmitEditingEventData } from 'react-native';

import { surface } from '$lib/theme/colors';

type Props = {
  value?: string;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
};

export default ({ value, onChangeText, onSubmitEditing }: Props) => {
  return (
    <TextInput
      className="w-full bg-surface-200 dark:bg-surface-600 px-5 py-3 dark:text-white rounded-full"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      placeholderTextColor={surface[400]}
      placeholder="Email"
      keyboardType="email-address"
      autoComplete="email"
    />
  );
};
