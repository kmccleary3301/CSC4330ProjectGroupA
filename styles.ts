import { create } from 'tailwind-rn';
import generatedStyles from './styles.json';

const tailwind = create(generatedStyles as Record<string, any>, {
    orientation: 'portrait',
    colorScheme: 'light',
    reduceMotion: false,
    width: 0,
    height: 0,
  });

const appStyles = {
  container: tailwind('flex-1 justify-center items-center'),
  title: tailwind('text-3xl font-bold'),
  separator: tailwind('m-8 w-full border border-solid border-gray-200'),
  input: tailwind('border border-solid border-gray-200 rounded-md p-2'),
  inputContainer: tailwind('flex-row justify-center items-center p-2'),
  inputField: tailwind('border border-solid border-gray-200 rounded-md p-2 flex-1'),
  button: tailwind('bg-blue-500 rounded-md p-2 m-2'),
  buttonText: tailwind('text-white font-bold'),
  link: tailwind('text-blue-500'),
  linkText: tailwind('font-bold'),
  error: tailwind('text-red-500'),
  success: tailwind('text-green-500'),
};

export { appStyles as styles };
