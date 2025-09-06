"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Heart, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  title: string
  description: string
  price: number
  category: string
  condition: string
  image: string
  seller: string
  location?: string
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (onAddToCart) {
      onAddToCart(product)
    } else {
      toast({
        title: "Added to cart!",
        description: `${product.title} has been added to your cart.`,
      })
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)

    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${product.title} has been ${isLiked ? "removed from" : "added to"} your favorites.`,
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
          <Button variant="ghost" size="sm" className="p-1 h-8 w-8 hover:bg-transparent" onClick={handleLike}>
            <Heart
              className={`h-4 w-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"}`}
            />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.condition}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="line-clamp-2 mb-3">{product.description}</CardDescription>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <Button size="sm" onClick={handleAddToCart} className="hover:scale-105 transition-transform">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Sold by @{product.seller}</p>
          {product.location && <p className="text-xs text-muted-foreground">{product.location}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
