"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Download, FileSpreadsheet, FileText, Calendar, Filter, RefreshCw, Check, ChevronDown, Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {toast} from "sonner"

export default function ExportPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [exportFormat, setExportFormat] = useState("csv")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  })
  
  // Export fields
  const [selectedFields, setSelectedFields] = useState({
    id: true,
    name: true,
    sku: true,
    category: true,
    price: true,
    cost: true,
    stock: true,
    lowStockThreshold: true,
    supplier: true,
    lastUpdated: true,
  })
  
  // Filter options
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [supplierFilter, setSupplierFilter] = useState("all")
  
  const handleExport = () => {
    setIsLoading(true)
    
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false)
      toast("Export complete")
    }, 2000)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Export Inventory</h1>
          <p className="text-muted-foreground">Export your inventory data for reporting and analysis.</p>
        </div>
      </div>
      
      <Tabs defaultValue="standard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="standard">Standard Export</TabsTrigger>
          <TabsTrigger value="custom">Custom Export</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Export</CardTitle>
              <CardDescription>
                Export your inventory data with predefined templates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="cursor-pointer border-2 hover:border-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Full Inventory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Export all inventory data including stock levels, prices, and suppliers.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      Export as Excel
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="cursor-pointer border-2 hover:border-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Stock Levels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Export current stock levels for all products.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Export as CSV
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="cursor-pointer border-2 hover:border-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Low Stock Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Export products that are below their low stock threshold.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Export as CSV
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Export</CardTitle>
              <CardDescription>
                Customize your export with specific fields and filters.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Export Format</h3>
                  <RadioGroup
                    value={exportFormat}
                    onValueChange={setExportFormat}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="csv" id="csv" />
                      <Label htmlFor="csv">CSV</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excel" id="excel" />
                      <Label htmlFor="excel">Excel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pdf" id="pdf" />
                      <Label htmlFor="pdf">PDF</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Date Range</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>From</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-full justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {dateRange.from ? format(dateRange.from, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={dateRange.from}
                            onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>To</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-full justify-start text-left font-normal", !dateRange.to && "text-muted-foreground")}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {dateRange.to ? format(dateRange.to, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={dateRange.to}
                            onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Fields to Export</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const allSelected = Object.values(selectedFields).every(Boolean)
                        const newValue = !allSelected
                        setSelectedFields({
                          id: newValue,
                          name: newValue,
                          sku: newValue,
                          category: newValue,
                          price: newValue,
                          cost: newValue,
                          stock: newValue,
                          lowStockThreshold: newValue,
                          supplier: newValue,
                          lastUpdated: newValue,
                        })
                      }}
                    >
                      {Object.values(selectedFields).every(Boolean) ? "Deselect All" : "Select All"}
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="field-id"
                        checked={selectedFields.id}
                        onCheckedChange={(checked) => setSelectedFields({ ...selectedFields, id: !!checked })}
                      />
                      <Label htmlFor="field-id">Product ID</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="field-name"
                        checked={selectedFields.name}
                        onCheckedChange={(checked) => setSelectedFields({ ...selectedFields, name: !!checked })}
                      />
                      <Label htmlFor="field-name">Product Name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="field-sku"
                        checked={selectedFields.sku}
                        onCheckedChange={(checked) => setSelectedFields({ ...selectedFields, sku: !!checked })}
                      />
                      <Label htmlFor="field-sku">SKU</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="field-category"
                        checked={selectedFields.category}
                        onCheckedChange={(checked) => setSelectedFields({ ...selectedFields, category: !!checked })}
                      />
                      <Label htmlFor="field-category">Category</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="field-price"
                        checked={selectedFields.price}
                        onCheckedChange={(checked) => setSelectedFields({ ...selectedFields, price: !!checked })}
                      />
                      <Label htmlFor="field-price">Price</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="field-cost"
                        checked={selectedFields.cost}
                        onCheckedChange={(checked) => setSelectedFields({ ...selectedFields, cost: !!checked })}
                      />
                      <Label htmlFor="field-cost">Cost</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="field-stock"
                        checked={selectedFields.stock}
                        onCheckedChange={(checked) => setSelectedFields({ ...selectedFields, stock: !!checked })}
                      />
                      <Label htmlFor="field-stock">Stock Level</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="field-threshold"
                        checked={selectedFields.lowStockThreshold}
                        onCheckedChange={(checked) => setSelectedFields({ ...selectedFields, lowStockThreshold: !!checked })}
                      />
                      <Label htmlFor="field-threshold">Low Stock Threshold</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="field-supplier"
                        checked={selectedFields.supplier}
                        onCheckedChange={(checked) => setSelectedFields({ ...selectedFields, supplier: !!checked })}
                      />
                      <Label htmlFor="field-supplier">Supplier</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="field-updated"
                        checked={selectedFields.lastUpdated}
                        onCheckedChange={(checked) => setSelectedFields({ ...selectedFields, lastUpdated: !!checked })}
                      />
                      <Label htmlFor="field-updated">Last Updated</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Filters</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="category-filter">Category</Label>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger id="category-filter">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="mangoes">Mangoes</SelectItem>
                          <SelectItem value="honey">Honey</SelectItem>
                          <SelectItem value="bundles">Bundles</SelectItem>
                          <SelectItem value="fruits">Fruits</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stock-filter">Stock Status</Label>
                      <Select value={stockFilter} onValueChange={setStockFilter}>
                        <SelectTrigger id="stock-filter">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Stock Statuses</SelectItem>
                          <SelectItem value="in-stock">In Stock</SelectItem>
                          <SelectItem value="low-stock">Low Stock</SelectItem>
                          <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supplier-filter">Supplier</Label>
                      <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                        <SelectTrigger id="supplier-filter">
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Suppliers</SelectItem>
                          <SelectItem value="rajshahi-farms">Rajshahi Farms</SelectItem>
                          <SelectItem value="chapai-farms">Chapai Farms</SelectItem>
                          <SelectItem value="sundarbans-apiaries">Sundarbans Apiaries</SelectItem>
                          <SelectItem value="dinajpur-orchards">Dinajpur Orchards</SelectItem>
                          <SelectItem value="gazipur-farms">Gazipur Farms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleExport} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Exports</CardTitle>
              <CardDescription>
                Set up automatic exports on a regular schedule.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">Weekly Inventory Report</h3>
                    <p className="text-sm text-muted-foreground">
                      Exports full inventory data every Monday at 8:00 AM
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">Monthly Stock Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Exports stock movement data on the 1st of each month
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Create New Scheduled Export
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
