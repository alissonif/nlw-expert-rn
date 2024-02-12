import { View, Text, FlatList } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Header } from '../components/header';
import { CategoryButton } from '../components/categoryButton';
import { CATEGORIES } from '../../utils/data/products';
import { useState } from 'react';
export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])
  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory)
  }
  return (
    <View className="flex-1 pt-8">
      <Text className="text-white text-2xl font-heading"></Text>
      <Header title='Faça seu pedido' cardQuantityItems={5} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelected(item)}
          />
        )}
        horizontal
        className='max-h-10 mt-5'
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
      />
    </View>
  )
}