import { View, Text, FlatList, SectionList } from "react-native";
import { Header } from "../components/header";
import { CategoryButton } from "../components/categoryButton";
import { CATEGORIES, MENU } from "../../utils/data/products";
import { useRef, useState } from "react";
import { Product } from "@/components/product";
import { Link } from "expo-router";
import { useCardStore } from "@/stores/card-store";
export default function Home() {
  const cartStore = useCardStore();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const sectionListRef = useRef<SectionList>(null);
  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0,
  );
  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory);
    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory,
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex: sectionIndex,
        itemIndex: 0,
      });
    }
  }
  return (
    <View className="flex-1 pt-8">
      <Text className="text-white text-2xl font-heading"></Text>
      <Header title="Faça seu pedido" cardQuantityItems={cartQuantityItems} />
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
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white text-xl font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
