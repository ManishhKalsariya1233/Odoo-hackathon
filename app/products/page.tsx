"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { AppHeader } from "@/components/ui/app-header"
import { PageHeader } from "@/components/ui/page-header"
import { ProductCard } from "@/components/ui/product-card"
import { EmptyState } from "@/components/ui/empty-state"
import { useToast } from "@/hooks/use-toast"
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react"

// Mock product data with additional fields for enhanced filtering
const mockProducts = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    description: "Classic brown leather jacket in excellent condition",
    price: 89.99,
    category: "Clothing",
    image: "/placeholder.svg?key=p5dpk",
    seller: "fashionista_eco",
    condition: "Excellent",
    postedDate: "2024-01-20",
    location: "San Francisco, CA",
    tags: ["vintage", "leather", "jacket", "brown"],
  },
  {
    id: 2,
    title: "Retro Coffee Table",
    description: "Mid-century modern coffee table with hairpin legs",
    price: 150.0,
    category: "Furniture",
    image: "/placeholder.svg?key=ofrg4",
    seller: "vintage_home",
    condition: "Good",
    postedDate: "2024-01-18",
    location: "Los Angeles, CA",
    tags: ["retro", "coffee table", "mid-century", "furniture"],
  },
  {
    id: 3,
    title: "iPhone 12 Pro",
    description: "Unlocked iPhone 12 Pro, 128GB, minor scratches",
    price: 450.0,
    category: "Electronics",
    image: "/placeholder.svg?key=m4n0a",
    seller: "tech_saver",
    condition: "Good",
    postedDate: "2024-01-22",
    location: "New York, NY",
    tags: ["iphone", "smartphone", "apple", "unlocked"],
  },
  {
    id: 4,
    title: "Hardcover Book Collection",
    description: "Set of 15 classic literature books in great condition",
    price: 35.0,
    category: "Books",
    image: "/placeholder.svg?key=kolhf",
    seller: "book_lover",
    condition: "Very Good",
    postedDate: "2024-01-15",
    location: "Chicago, IL",
    tags: ["books", "literature", "classic", "collection"],
  },
  {
    id: 5,
    title: "Acoustic Guitar",
    description: "Yamaha acoustic guitar, perfect for beginners",
    price: 120.0,
    category: "Musical Instruments",
    image: "/placeholder.svg?key=lgsyx",
    seller: "music_maven",
    condition: "Good",
    postedDate: "2024-01-19",
    location: "Austin, TX",
    tags: ["guitar", "acoustic", "yamaha", "music"],
  },
  {
    id: 6,
    title: "Designer Handbag",
    description: "Authentic Coach handbag, gently used",
    price: 180.0,
    category: "Accessories",
    image: "/placeholder.svg?key=36zlx",
    seller: "luxury_finds",
    condition: "Very Good",
    postedDate: "2024-01-21",
    location: "Miami, FL",
    tags: ["handbag", "coach", "designer", "luxury"],
  },
  {
    id: 7,
    title: "Vintage Vinyl Records",
    description: "Collection of 20 classic rock vinyl records from the 70s",
    price: 75.0,
    category: "Music",
    image: "/placeholder.svg?key=vinyl1",
    seller: "vinyl_collector",
    condition: "Good",
    postedDate: "2024-01-17",
    location: "Seattle, WA",
    tags: ["vinyl", "records", "music", "classic rock"],
  },
  {
    id: 8,
    title: "Exercise Bike",
    description: "Stationary exercise bike, barely used, great for home workouts",
    price: 200.0,
    category: "Sports",
    image: "/placeholder.svg?key=bike1",
    seller: "fitness_fan",
    condition: "Like New",
    postedDate: "2024-01-16",
    location: "Denver, CO",
    tags: ["exercise", "bike", "fitness", "workout"],
  },
]

const categories = [
  "All",
  "Clothing",
  "Electronics",
  "Furniture",
  "Books",
  "Musical Instruments",
  "Accessories",
  "Sports",
  "Music",
  "Home & Garden",
]

const conditions = ["Like New", "Excellent", "Very Good", "Good", "Fair"]
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "title", label: "Title A-Z" },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("newest")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [products] = useState(mockProducts)
  const { toast } = useToast()

  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

      const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(product.condition)

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesCondition && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        case "oldest":
          return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const addToCart = (product) => {
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    })
  }

  const handleConditionChange = (condition: string, checked: boolean) => {
    if (checked) {
      setSelectedConditions([...selectedConditions, condition])
    } else {
      setSelectedConditions(selectedConditions.filter((c) => c !== condition))
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
    setSelectedConditions([])
    setPriceRange([0, 500])
    setSortBy("newest")
  }

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    selectedConditions.length +
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      <AppHeader showSearch cartItemCount={3} />

      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Browse Products"
          description="Discover unique second-hand items from our sustainable community"
        >
          <Link href="/products/add">
            <Button>Sell Item</Button>
          </Link>
        </PageHeader>

        <div className="space-y-4 mb-8">
          {/* Primary Search and Filter Row */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search products, descriptions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="w-full lg:w-auto"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* Advanced Filters */}
          <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
            <CollapsibleContent className="space-y-4">
              {/* Price Range */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Price Range</label>
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Condition Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Condition</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {conditions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={selectedConditions.includes(condition)}
                        onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                      />
                      <label
                        htmlFor={condition}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex justify-end pt-4 border-t">
                  <Button variant="outline" onClick={clearAllFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== "All" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {selectedCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
                </Badge>
              )}
              {selectedConditions.map((condition) => (
                <Badge key={condition} variant="secondary" className="flex items-center gap-1">
                  {condition}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleConditionChange(condition, false)} />
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 500) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  ${priceRange[0]} - ${priceRange[1]}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 500])} />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedProducts.length} of {products.length} products
            {sortBy !== "newest" && (
              <span className="ml-2">• Sorted by {sortOptions.find((opt) => opt.value === sortBy)?.label}</span>
            )}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <EmptyState
            icon={Search}
            title="No products found"
            description="Try adjusting your search terms or filters to find what you're looking for"
            action={{
              label: "Clear All Filters",
              onClick: clearAllFilters,
            }}
          />
        )}
      </div>
    </div>
  )
}
