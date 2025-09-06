import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppHeader } from "@/components/ui/app-header"
import { PageHeader } from "@/components/ui/page-header"
import { Plus, Search, ShoppingBag, Heart, History, List } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader cartItemCount={3} />

      <div className="container mx-auto px-4 py-8">
        <PageHeader title="Welcome back!" description="Ready to discover unique finds and make sustainable choices?" />

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/products">
            <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <Search className="h-12 w-12 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">Browse Products</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>Discover unique second-hand items</CardDescription>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  Start Browsing
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/products/add">
            <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <Plus className="h-12 w-12 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">Sell an Item</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>List your items for sale</CardDescription>
                <Button className="w-full mt-4">Add Listing</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/cart">
            <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">My Cart</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>View items in your cart</CardDescription>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  View Cart
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/listings">
            <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <List className="h-12 w-12 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">My Listings</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>Manage your product listings</CardDescription>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  View Listings
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Link href="/purchases">
            <Card className="hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Recent Purchases
                </CardTitle>
                <CardDescription>Your latest sustainable finds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Designer Handbag</p>
                      <p className="text-xs text-muted-foreground">Delivered Jan 25</p>
                    </div>
                    <div className="ml-auto text-sm font-medium text-primary">$180.00</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Book Collection</p>
                      <p className="text-xs text-muted-foreground">Delivered Jan 20</p>
                    </div>
                    <div className="ml-auto text-sm font-medium text-primary">$35.00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Saved Items
              </CardTitle>
              <CardDescription>Items you've marked as favorites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No saved items yet</p>
                <p className="text-sm">Heart items while browsing to save them here!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
