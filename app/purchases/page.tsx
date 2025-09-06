"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, ArrowLeft, Package, Star, MessageCircle, RotateCcw } from "lucide-react"

// Mock purchase data
const mockPurchases = [
  {
    id: 1,
    orderId: "ECO-2024-001",
    title: "Designer Handbag",
    description: "Authentic Coach handbag, gently used",
    price: 180.0,
    category: "Accessories",
    condition: "Very Good",
    image: "/placeholder.svg?key=purch1",
    seller: "luxury_finds",
    purchaseDate: "2024-01-20",
    status: "Delivered",
    trackingNumber: "1Z999AA1234567890",
    deliveryDate: "2024-01-25",
  },
  {
    id: 2,
    orderId: "ECO-2024-002",
    title: "Acoustic Guitar",
    description: "Yamaha acoustic guitar, perfect for beginners",
    price: 120.0,
    category: "Musical Instruments",
    condition: "Good",
    image: "/placeholder.svg?key=purch2",
    seller: "music_maven",
    purchaseDate: "2024-01-18",
    status: "In Transit",
    trackingNumber: "1Z999AA1234567891",
    estimatedDelivery: "2024-01-28",
  },
  {
    id: 3,
    orderId: "ECO-2024-003",
    title: "Hardcover Book Collection",
    description: "Set of 15 classic literature books in great condition",
    price: 35.0,
    category: "Books",
    condition: "Very Good",
    image: "/placeholder.svg?key=purch3",
    seller: "book_lover",
    purchaseDate: "2024-01-15",
    status: "Delivered",
    trackingNumber: "1Z999AA1234567892",
    deliveryDate: "2024-01-20",
  },
]

export default function PurchasesPage() {
  const [purchases] = useState(mockPurchases)

  const deliveredItems = purchases.filter((item) => item.status === "Delivered")
  const inTransitItems = purchases.filter((item) => item.status === "In Transit")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "In Transit":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">My Purchases</h2>
          <p className="text-muted-foreground">Track your sustainable shopping journey and past orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{purchases.length}</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{deliveredItems.length}</div>
              <div className="text-sm text-muted-foreground">Delivered</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{inTransitItems.length}</div>
              <div className="text-sm text-muted-foreground">In Transit</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">
                ${purchases.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Orders ({purchases.length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({deliveredItems.length})</TabsTrigger>
            <TabsTrigger value="transit">In Transit ({inTransitItems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {purchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{purchase.orderId}</CardTitle>
                      <CardDescription>
                        Placed on {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(purchase.status)}>{purchase.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={purchase.image || "/placeholder.svg"}
                        alt={purchase.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-1">{purchase.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{purchase.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {purchase.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {purchase.condition}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Sold by @{purchase.seller}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary text-lg">${purchase.price.toFixed(2)}</div>
                      {purchase.status === "Delivered" && purchase.deliveryDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Delivered {new Date(purchase.deliveryDate).toLocaleDateString()}
                        </p>
                      )}
                      {purchase.status === "In Transit" && purchase.estimatedDelivery && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Est. delivery {new Date(purchase.estimatedDelivery).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="h-4 w-4" />
                      Tracking: {purchase.trackingNumber}
                    </div>
                    <div className="flex gap-2">
                      {purchase.status === "Delivered" && (
                        <>
                          <Button variant="outline" size="sm">
                            <Star className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Return
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Seller
                      </Button>
                      <Button variant="outline" size="sm">
                        Track Package
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            {deliveredItems.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{purchase.orderId}</CardTitle>
                      <CardDescription>
                        Delivered on {new Date(purchase.deliveryDate!).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={purchase.image || "/placeholder.svg"}
                        alt={purchase.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-1">{purchase.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{purchase.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {purchase.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {purchase.condition}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary text-lg">${purchase.price.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4 mr-2" />
                      Write Review
                    </Button>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Return Item
                    </Button>
                    <Button variant="outline" size="sm">
                      Buy Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="transit" className="space-y-4">
            {inTransitItems.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{purchase.orderId}</CardTitle>
                      <CardDescription>
                        Estimated delivery: {new Date(purchase.estimatedDelivery!).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={purchase.image || "/placeholder.svg"}
                        alt={purchase.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-1">{purchase.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{purchase.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {purchase.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {purchase.condition}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary text-lg">${purchase.price.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="h-4 w-4" />
                      Tracking: {purchase.trackingNumber}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Track Package
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Seller
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {purchases.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No purchases yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your sustainable shopping journey by browsing our unique second-hand items
              </p>
              <Link href="/products">
                <Button>Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
