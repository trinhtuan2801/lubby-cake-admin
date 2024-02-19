import { Autocomplete, AutocompleteProps } from '@mui/joy';
import { useForm } from 'react-hook-form';

type Option = Record<string, any>;

type FormMethods<T extends Option> = ReturnType<typeof useForm<T>>;

export type AutocompleteBaseProps<T> = AutocompleteProps<
  T,
  boolean,
  boolean,
  boolean
>;

interface Props<FormFields extends Option>
  extends AutocompleteBaseProps<FormFields> {
  formMethods?: FormMethods<FormFields>;
}

export default function MyAutocomplete<T extends Option>({
  formMethods,
  ...props
}: Props<T>) {
  // eslint-disable-next-line
  const { register } = formMethods ?? {};

  return <Autocomplete {...props} />;
}
