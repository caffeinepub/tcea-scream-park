import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generatedImages } from "@/content/generatedImages";
import {
  type MerchProduct,
  merchCategories,
  merchProducts,
} from "@/content/merchStorefront";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useState } from "react";
import { Section } from "../layout/Section";

export function MerchShopsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [boothImageError, setBoothImageError] = useState(false);

  const filteredProducts =
    selectedCategory === "all"
      ? merchProducts
      : merchProducts.filter((p) => p.category === selectedCategory);

  const felixBoothImage = generatedImages.other["Felix Merch Booth"];

  return (
    <Section
      id="merch-shops"
      title="Merch Storefront"
      subtitle="Take home a piece of the magic with character gear"
      icon={<ShoppingBag className="h-10 w-10 text-primary" />}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Felix's Merch Booth Sneak Peek */}
        <Card className="bg-card/80 backdrop-blur-sm border-primary/30 shadow-xl overflow-hidden poster-spotlight">
          {felixBoothImage && !boothImageError && (
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={felixBoothImage}
                alt="Felix's Merch Booth interior"
                className="w-full h-full object-cover"
                onError={() => setBoothImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" />
            </div>
          )}
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="text-3xl text-center text-primary">
                Felix's Merch Booth
              </CardTitle>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardDescription className="text-center text-lg">
              Step inside Felix's exclusive merch booth and discover a treasure
              trove of character collectibles, limited-edition items, and fan
              favorites. From cozy hoodies to adorable plushies, Felix has
              curated the ultimate selection for true fans. Come see what's
              waiting for you!
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="poster-spotlight"
          >
            All Items
          </Button>
          {merchCategories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className="poster-spotlight"
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <MerchProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="max-w-2xl mx-auto bg-accent/50 border-primary/20">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                No products found in this category.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Section>
  );
}

function MerchProductCard({ product }: { product: MerchProduct }) {
  const characterColors: Record<string, string> = {
    Riley:
      "bg-amber-500/20 border-amber-500/40 text-amber-700 dark:text-amber-300",
    Ace: "bg-blue-500/20 border-blue-500/40 text-blue-700 dark:text-blue-300",
    Kevin:
      "bg-green-500/20 border-green-500/40 text-green-700 dark:text-green-300",
    Rocky: "bg-red-500/20 border-red-500/40 text-red-700 dark:text-red-300",
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:shadow-xl poster-spotlight">
      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription className="text-sm">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-primary/30">
            {product.category}
          </Badge>
          {product.character && (
            <Badge
              variant="outline"
              className={
                characterColors[product.character] || "border-primary/30"
              }
            >
              {product.character}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
