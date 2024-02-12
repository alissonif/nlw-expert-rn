import { View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Header } from '@/components/header';
export default function Home() {
  return (
    <View className="flex-1 pt-8">
      <Text className="text-white text-2xl font-heading"></Text>
      <Header title='Faça seu pedido' cardQuantityItems={5} />
    </View>
  )
}