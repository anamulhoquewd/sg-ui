"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Save, RefreshCw, Search, Trash2, FileText, Calendar, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {toast} from "sonner"

// Sample product data
const products = [
  {
    id: 1,
    name: "Himshagor Mango",
    sku: "MNG-HMS-001",
    category: "Mangoes",
    currentStock: 120,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Rupali Mango",
    sku: "MNG-RPL-002",
    category: "Mangoes",
    currentStock: 85,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Bari 4 Mango",
    sku: "MNG-BR4-003",
    category: "Mangoes",
    currentStock: 15,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Pure Honey",
    sku: "HNY-PUR-001",
    category: "Honey",
    currentStock: 50,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Seasonal Mango Pack",
    sku: "BDL-MNG-001",
    category: "Bundles",
    currentStock: 0,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Litchi (Premium)",
    sku: "LTC-PRM-001",
    category: "Fruits",
    currentStock: 8,
    image: "/placeholder.svg?height=40&width=40",
  },
]

// Sample supplier data
const suppliers = [
  { id: 1, name: "Rajshahi Farms", email: "info@rajshahifarms.com", phone: "+880 1712 345678" },
  { id: 2, name: "Chapai Farms", email: "info@chapaifarms.com", phone: "+880 1812 345678" },
  { id: 3, name: "Sundarbans Apiaries", email: "info@sundarbanshoney.com", phone: "+880 1912 345678" },
  { id: 4, name: "Dinajpur Orchards", email: "info@dinajpurorchards.com", phone: "+880 1612 345678" },
  { id: 5, name: "Gazipur Farms", email: "info@gazipurfarms.com", phone: "+880 1512 345678" },
]

export default function AddStockPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [stockItems, setStockItems] = useState<
    {
      productId: number
      quantity: number
    }[]
  >([])
  const [supplier, setSupplier] = useState("")
  const [referenceNumber, setReferenceNumber] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [notes, setNotes] = useState("")
  const [stockType, setStockType] = useState("stock-in")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleProductSelection = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
      setStockItems(stockItems.filter((item) => item.productId !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
      setStockItems([...stockItems, { productId, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: number, quantity: number) => {
    setStockItems(stockItems.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
  }

  const removeStockItem = (productId: number) => {
    setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    setStockItems(stockItems.filter((item) => item.productId !== productId))
  }

  const handleAddStock = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast("Stock updated")

      // Reset form
      setSelectedProducts([])
      setStockItems([])
      setSupplier("")
      setReferenceNumber("")
      setDate(new Date())
      setNotes("")
    }, 1500)
  }

  const getProductById = (id: number) => {
    return products.find((product) => product.id === id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Stock</h1>
          <p className="text-muted-foreground">Update inventory levels for your products.</p>
        </div>
      </div>

      <Tabs defaultValue="manual" className="space-y-4">
        <TabsList>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Details</CardTitle>
              <CardDescription>Enter the details for this stock update.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stock-type">Stock Type</Label>
                  <Select value={stockType} onValueChange={setStockType}>
                    <SelectTrigger id="stock-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stock-in">Stock In</SelectItem>
                      <SelectItem value="stock-out">Stock Out</SelectItem>
                      <SelectItem value="return">Return</SelectItem>
                      <SelectItem value="adjustment">Adjustment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select value={supplier} onValueChange={setSupplier}>
                    <SelectTrigger id="supplier">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id.toString()}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference">Reference Number</Label>
                  <Input
                    id="reference"
                    placeholder="Invoice or PO number"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional information about this stock update"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Products</CardTitle>
              <CardDescription>Choose the products you want to update stock for.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products by name or SKU..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <span className="sr-only">Select</span>
                      </TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Current Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No products found. Try adjusting your search.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() => toggleProductSelection(product.id)}
                              aria-label={`Select ${product.name}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">{product.currentStock}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {selectedProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Update Stock Quantities</CardTitle>
                <CardDescription>Enter the quantities for each selected product.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">New Stock Level</TableHead>
                        <TableHead className="w-12">
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stockItems.map((item) => {
                        const product = getProductById(item.productId)
                        if (!product) return null

                        const newStockLevel =
                          stockType === "stock-in" || stockType === "return"
                            ? product.currentStock + item.quantity
                            : product.currentStock - item.quantity

                        return (
                          <TableRow key={item.productId}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.sku}</TableCell>
                            <TableCell>{product.currentStock}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.productId, Number.parseInt(e.target.value) || 0)}
                                className="w-24 mx-auto text-center"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge variant={newStockLevel < 0 ? "destructive" : "outline"}>{newStockLevel}</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" onClick={() => removeStockItem(item.productId)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProducts([])
                    setStockItems([])
                  }}
                >
                  Clear All
                </Button>
                <Button onClick={handleAddStock} disabled={isLoading || stockItems.length === 0}>
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {stockType === "stock-in" || stockType === "return" ? "Add Stock" : "Remove Stock"}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Import</CardTitle>
              <CardDescription>Import stock updates from a CSV or Excel file.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bulk-stock-type">Stock Type</Label>
                  <Select defaultValue="stock-in">
                    <SelectTrigger id="bulk-stock-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stock-in">Stock In</SelectItem>
                      <SelectItem value="stock-out">Stock Out</SelectItem>
                      <SelectItem value="return">Return</SelectItem>
                      <SelectItem value="adjustment">Adjustment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulk-supplier">Supplier</Label>
                  <Select>
                    <SelectTrigger id="bulk-supplier">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id.toString()}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload File</Label>
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Drag & drop your file here</p>
                      <p className="text-xs text-muted-foreground">Supports CSV and Excel files</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Template</Label>
                  <Button variant="link" size="sm" className="h-auto p-0">
                    <FileText className="mr-1 h-4 w-4" />
                    Download Template
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Download our template file to ensure your data is formatted correctly.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Upload className="mr-2 h-4 w-4" />
                Upload and Process
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
