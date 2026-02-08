import { Section } from '../layout/Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { merchShops } from '../../content/merchShops';
import { ShoppingBag } from 'lucide-react';

export function MerchShopsSection() {
  return (
    <Section
      id="merch-shops"
      title="Merch Shops"
      subtitle="Take home a piece of the terror"
      icon={<ShoppingBag className="h-10 w-10 text-destructive" />}
    >
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {merchShops.shops.map((shop, index) => (
          <Card
            key={index}
            className="bg-card/80 backdrop-blur-sm border-destructive/20 hover:border-destructive/50 transition-all hover:shadow-xl"
          >
            <CardHeader>
              <CardTitle className="text-2xl text-destructive">{shop.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{shop.items}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-lg px-4 py-2 border-destructive/30">
                ${shop.price}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-2xl mx-auto bg-accent/50 border-destructive/20">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground italic">{merchShops.note}</p>
        </CardContent>
      </Card>
    </Section>
  );
}
