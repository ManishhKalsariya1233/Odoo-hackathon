"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Leaf, ArrowLeft, Heart, ShoppingCart, MessageCircle, Share2, User } from "lucide-react"

// Mock product data - in real app this would come from API
const mockProduct = {
  id: 1,
  title: "Vintage Leather Jacket",
  description:
    "This classic brown leather jacket is in excellent condition with minimal wear. Perfect for anyone looking to add a timeless piece to their wardrobe. The jacket features a full zip closure, two side pockets, and a comfortable cotton lining. Originally purchased from a high-end boutique, this jacket has been well-maintained and is ready for its next owner.",
  price: 89.99,
  category: "Clothing",
  condition: "Excellent",
  images: ["/placeholder.svg?key=a1xku", "/placeholder.svg?key=qfyh6", "/placeholder.svg?key=n6qy4"],
  seller: {
    username: "fashionista_eco",
    name: "Sarah Johnson",
    rating: 4.8,
    reviewCount: 23,
    joinDate: "2023",
    avatar: "/placeholder.svg?key=gpmzs",
  },
  specifications: {
    Size: "Medium",
    Material: "Genuine Leather",
    Color: "Brown",
    Brand: "Vintage Collection",
  },
  postedDate: "2024-01-15",
  location: "San Francisco, CA",
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const { toast } = useToast()

  const addToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${mockProduct.title} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/products" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Link>
              <div className="flex items-center gap-2">
                <Leaf className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">EcoFinds</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/cart">
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={mockProduct.images[selectedImageIndex] || "/placeholder.svg"}
                alt={mockProduct.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                    selectedImageIndex === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${mockProduct.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{mockProduct.title}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{mockProduct.category}</Badge>
                    <Badge variant="outline">{mockProduct.condition}</Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary mb-4">${mockProduct.price.toFixed(2)}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1" onClick={addToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Seller
              </Button>
            </div>

            {/* Product Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{mockProduct.description}</p>
              </CardContent>
            </Card>

            {/* Product Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(mockProduct.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                      <dd className="text-sm text-foreground">{value}</dd>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mockProduct.seller.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{mockProduct.seller.name}</h3>
                    <p className="text-sm text-muted-foreground">@{mockProduct.seller.username}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm">⭐ {mockProduct.seller.rating}</span>
                      <span className="text-sm text-muted-foreground">({mockProduct.seller.reviewCount} reviews)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Member since {mockProduct.seller.joinDate} • {mockProduct.location}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
