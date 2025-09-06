"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, ArrowLeft, Plus, Edit, Trash2, Eye } from "lucide-react"

// Mock user listings data
const mockListings = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    description: "Classic brown leather jacket in excellent condition",
    price: 89.99,
    category: "Clothing",
    condition: "Excellent",
    image: "/vintage-leather-jacket.png",
    status: "Active",
    views: 45,
    likes: 8,
    postedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Retro Coffee Table",
    description: "Mid-century modern coffee table with hairpin legs",
    price: 150.0,
    category: "Furniture",
    condition: "Good",
    image: "/retro-coffee-table.jpg",
    status: "Active",
    views: 23,
    likes: 5,
    postedDate: "2024-01-10",
  },
  {
    id: 3,
    title: "Designer Handbag",
    description: "Authentic Coach handbag, gently used",
    price: 180.0,
    category: "Accessories",
    condition: "Very Good",
    image: "/coach-handbag.jpg",
    status: "Sold",
    views: 67,
    likes: 12,
    postedDate: "2024-01-05",
  },
]

export default function MyListingsPage() {
  const [listings] = useState(mockListings)

  const activeListings = listings.filter((listing) => listing.status === "Active")
  const soldListings = listings.filter((listing) => listing.status === "Sold")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <Leaf className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">EcoFinds</h1>
              </div>
            </div>
            <Link href="/products/add">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">My Listings</h2>
          <p className="text-muted-foreground">Manage your product listings and track their performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{listings.length}</div>
              <div className="text-sm text-muted-foreground">Total Listings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{activeListings.length}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{soldListings.length}</div>
              <div className="text-sm text-muted-foreground">Sold</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                {listings.reduce((sum, listing) => sum + listing.views, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Listings */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Active Listings</h3>
          {activeListings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeListings.map((listing) => (
                <Card key={listing.id} className="group">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {listing.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {listing.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {listing.condition}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="line-clamp-2 mb-3">{listing.description}</CardDescription>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-primary">${listing.price.toFixed(2)}</span>
                      <div className="text-sm text-muted-foreground">
                        {listing.views} views • {listing.likes} likes
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/products/${listing.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Plus className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No active listings</h3>
                <p className="text-muted-foreground mb-4">Start selling by creating your first product listing</p>
                <Link href="/products/add">
                  <Button>Create Your First Listing</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sold Listings */}
        {soldListings.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Sold Items</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {soldListings.map((listing) => (
                <Card key={listing.id} className="opacity-75">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        Sold
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="line-clamp-2 mb-3">{listing.description}</CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">${listing.price.toFixed(2)}</span>
                      <div className="text-sm text-muted-foreground">
                        {listing.views} views • {listing.likes} likes
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
