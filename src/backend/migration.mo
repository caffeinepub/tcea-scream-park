import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";

module {
  type OldActor = {/* previous state without kid grove etc. */ };
  type NewActor = {
    /* new state including kid grove etc. */
    themedLands : Map.Map<Nat, NewThemedLand>;
    merchShops : Map.Map<Nat, NewMerchShop>;
    foodBooths : Map.Map<Nat, NewThemedFoodBooth>;
    nextLandId : Nat;
    nextShopId : Nat;
    nextBoothId : Nat;
  };

  // Additional Types for New Entities in Migration
  type NewThemedLand = {
    id : Nat;
    name : Text;
    description : Text;
    openingYear : Nat;
    sizeSqFt : Nat;
    futureShows : [Nat];
    status : LandStatus;
  };
  type LandStatus = { #planned; #underConstruction; #open };

  type NewMerchShop = {
    id : Nat;
    name : Text;
    products : [Product];
    location : Text;
  };
  type Product = {
    name : Text;
    price : Float;
    category : ProductCategory;
    description : Text;
    availability : AvailabilityStatus;
  };
  type ProductCategory = { #shoes; #clothes; #autograph; #skateboard; #posters };
  type AvailabilityStatus = { #inStock; #limited; #outOfStock };

  type NewThemedFoodBooth = {
    id : Nat;
    name : Text;
    paintMenu : [FoodItem];
    deathMenu : [FoodItem];
    location : Text;
    description : Text;
  };
  type FoodItem = {
    name : Text;
    price : Float;
    description : Text;
    theme : FoodTheme;
    itemType : FoodType;
    specialNotes : Text;
    allergens : [Text];
  };
  type FoodTheme = { #paint; #death };
  type FoodType = { #food; #drink; #dessert };

  public func run(old : OldActor) : NewActor {
    let themedLands = Map.empty<Nat, NewThemedLand>();
    let merchShops = Map.empty<Nat, NewMerchShop>();
    let foodBooths = Map.empty<Nat, NewThemedFoodBooth>();

    let kidGroveLand : NewThemedLand = {
      id = 1;
      name = "Kid Grove";
      description = "A kid-friendly themed land featuring vibrant colors and fun attractions.";
      openingYear = 2050;
      sizeSqFt = 500_000;
      futureShows = [10];
      status = #planned;
    };
    themedLands.add(1, kidGroveLand);

    let deadEyesShop : NewMerchShop = {
      id = 1;
      name = "Dead Eyes";
      products = [
        {
          name = "Signature Shoes";
          price = 49.99;
          category = #shoes;
          description = "High-quality shoes with unique designs.";
          availability = #inStock;
        },
        {
          name = "Autographed Posters";
          price = 29.99;
          category = #autograph;
          description = "Posters signed by popular characters.";
          availability = #limited;
        },
      ];
      location = "Main Street";
    };
    merchShops.add(1, deadEyesShop);

    let themedFoodBooth : NewThemedFoodBooth = {
      id = 1;
      name = "Paint & Death Eats";
      paintMenu = [
        {
          name = "Rainbow Burger";
          price = 12.99;
          description = "A colorful burger with vibrant sauces and toppings.";
          theme = #paint;
          itemType = #food;
          specialNotes = "Contains gluten and dairy";
          allergens = ["gluten", "dairy"];
        },
        {
          name = "Unicorn Shake";
          price = 6.99;
          description = "A magical, colorful milkshake topped with whipped cream and sprinkles.";
          theme = #paint;
          itemType = #drink;
          specialNotes = "Contains dairy";
          allergens = ["dairy"];
        },
      ];
      deathMenu = [
        {
          name = "Tombstone Tacos";
          price = 10.99;
          description = "Dark-themed tacos with a spooky presentation.";
          theme = #death;
          itemType = #food;
          specialNotes = "Gluten free";
          allergens = [];
        },
        {
          name = "Bloody Mary Deluxe";
          price = 8.99;
          description = "A premium Bloody Mary with horror-themed garnishes.";
          theme = #death;
          itemType = #drink;
          specialNotes = "Spicy";
          allergens = [];
        },
      ];
      location = "Food Court";
      description = "A food booth with two distinctive menus - paint-themed and death-themed cuisine.";
    };
    foodBooths.add(1, themedFoodBooth);

    {
      old with themedLands;
      merchShops;
      foodBooths;
      nextLandId = 2;
      nextShopId = 2;
      nextBoothId = 2;
    };
  };
};
