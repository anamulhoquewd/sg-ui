"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  AlertTriangle,
  History,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";

// Sample product data
const products = [
  {
    id: 1,
    name: "Himshagor Mango",
    sku: "MNG-HMS-001",
    category: "Mangoes",
    price: 350,
    stock: 120,
    lowStockThreshold: 20,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40",
    lastUpdated: new Date(2023, 4, 15),
    supplier: "Rajshahi Farms",
  },
  {
    id: 2,
    name: "Rupali Mango",
    sku: "MNG-RPL-002",
    category: "Mangoes",
    price: 400,
    stock: 85,
    lowStockThreshold: 15,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40",
    lastUpdated: new Date(2023, 4, 18),
    supplier: "Rajshahi Farms",
  },
  {
    id: 3,
    name: "Bari 4 Mango",
    sku: "MNG-BR4-003",
    category: "Mangoes",
    price: 380,
    stock: 15,
    lowStockThreshold: 20,
    status: "Low Stock",
    image: "/placeholder.svg?height=40&width=40",
    lastUpdated: new Date(2023, 4, 20),
    supplier: "Chapai Farms",
  },
  {
    id: 4,
    name: "Pure Honey",
    sku: "HNY-PUR-001",
    category: "Honey",
    price: 650,
    stock: 50,
    lowStockThreshold: 10,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40",
    lastUpdated: new Date(2023, 4, 10),
    supplier: "Sundarbans Apiaries",
  },
  {
    id: 5,
    name: "Seasonal Mango Pack",
    sku: "BDL-MNG-001",
    category: "Bundles",
    price: 1200,
    stock: 0,
    lowStockThreshold: 5,
    status: "Out of Stock",
    image: "/placeholder.svg?height=40&width=40",
    lastUpdated: new Date(2023, 4, 5),
    supplier: "Rajshahi Farms",
  },
  {
    id: 6,
    name: "Litchi (Premium)",
    sku: "LTC-PRM-001",
    category: "Fruits",
    price: 450,
    stock: 8,
    lowStockThreshold: 10,
    status: "Low Stock",
    image: "/placeholder.svg?height=40&width=40",
    lastUpdated: new Date(2023, 4, 22),
    supplier: "Dinajpur Orchards",
  },
  {
    id: 7,
    name: "Organic Black Seed Honey",
    sku: "HNY-BLK-001",
    category: "Honey",
    price: 850,
    stock: 25,
    lowStockThreshold: 8,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40",
    lastUpdated: new Date(2023, 4, 12),
    supplier: "Sundarbans Apiaries",
  },
  {
    id: 8,
    name: "Jackfruit (Khaja)",
    sku: "JCK-KHJ-001",
    category: "Fruits",
    price: 550,
    stock: 0,
    lowStockThreshold: 5,
    status: "Out of Stock",
    image: "/placeholder.svg?height=40&width=40",
    lastUpdated: new Date(2023, 4, 8),
    supplier: "Gazipur Farms",
  },
];

// Stock adjustment dialog component
function StockAdjustmentDialog({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) {
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState("in");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-md">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
          <p className="text-sm">Current Stock: {product.stock}</p>
        </div>
      </div>

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="adjustment-type">Adjustment Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="adjustment-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in">Stock In</SelectItem>
                <SelectItem value="out">Stock Out</SelectItem>
                <SelectItem value="return">Return</SelectItem>
                <SelectItem value="correction">Correction</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number.parseInt(e.target.value) || 0)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            placeholder="Add notes about this adjustment"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" onClick={onClose}>
          Save Changes
        </Button>
      </DialogFooter>
    </div>
  );
}

// Low stock threshold dialog component
function LowStockThresholdDialog({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) {
  const [threshold, setThreshold] = useState(product.lowStockThreshold);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-md">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
          <p className="text-sm">Current Stock: {product.stock}</p>
        </div>
      </div>

      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="threshold">Low Stock Threshold</Label>
            <span className="text-sm">{threshold} units</span>
          </div>
          <Slider
            id="threshold"
            min={0}
            max={100}
            step={1}
            value={[threshold]}
            onValueChange={(value) => setThreshold(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            You will be alerted when stock falls below this threshold.
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" onClick={onClose}>
          Save Changes
        </Button>
      </DialogFooter>
    </div>
  );
}

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);

  const [isThresholdDialogOpen, setIsThresholdDialogOpen] = useState(false);

  const handleStockAdjustment = (product: any) => {
    setSelectedProduct(product);
    setIsStockDialogOpen(true);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleAllProducts = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    }
  };

  const getStockPercentage = (product: any) => {
    // Calculate percentage based on a reasonable maximum (e.g., 5x the low stock threshold)
    const maxExpected = product.lowStockThreshold * 5;
    const percentage = (product.stock / maxExpected) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  const getStockStatusColor = (product: any) => {
    if (product.stock === 0) return "bg-red-500";
    if (product.stock <= product.lowStockThreshold) return "bg-amber-500";
    return "bg-green-500";
  };

  const handleThresholdAdjustment = (product: any) => {
    setSelectedProduct(product);
    setIsThresholdDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory, prices, and categories.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>
            You have {products.length} products in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="mangoes">Mangoes</SelectItem>
                  <SelectItem value="honey">Honey</SelectItem>
                  <SelectItem value="bundles">Bundles</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={selectedProducts.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={selectedProducts.length === 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedProducts.length === filteredProducts.length &&
                        filteredProducts.length > 0
                      }
                      onCheckedChange={toggleAllProducts}
                      aria-label="Select all products"
                    />
                  </TableHead>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Product
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No products found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() =>
                            toggleProductSelection(product.id)
                          }
                          aria-label={`Select ${product.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="relative h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span>{product.stock}</span>
                          <div className="w-16">
                            <Progress
                              value={getStockPercentage(product)}
                              className="h-1.5"
                              indicatorClassName={cn(
                                getStockStatusColor(product)
                              )}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.status === "In Stock"
                              ? "default"
                              : product.status === "Low Stock"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(product.lastUpdated, "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Dialog
                            open={
                              isStockDialogOpen &&
                              selectedProduct?.id === product.id
                            }
                            onOpenChange={(open) =>
                              !open && setIsStockDialogOpen(false)
                            }
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleStockAdjustment(product)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Adjust Stock</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Adjust Stock</DialogTitle>
                                <DialogDescription>
                                  Update the stock level for this product.
                                </DialogDescription>
                              </DialogHeader>
                              {selectedProduct && (
                                <StockAdjustmentDialog
                                  product={selectedProduct}
                                  onClose={() => setIsStockDialogOpen(false)}
                                />
                              )}
                            </DialogContent>
                          </Dialog>

                          <Dialog
                            open={
                              isThresholdDialogOpen &&
                              selectedProduct?.id === product.id
                            }
                            onOpenChange={(open) =>
                              !open && setIsThresholdDialogOpen(false)
                            }
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleThresholdAdjustment(product)
                                }
                              >
                                <AlertTriangle className="h-4 w-4" />
                                <span className="sr-only">
                                  Set Low Stock Threshold
                                </span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Set Low Stock Threshold
                                </DialogTitle>
                                <DialogDescription>
                                  Set the threshold at which you'll be alerted
                                  about low stock.
                                </DialogDescription>
                              </DialogHeader>
                              {selectedProduct && (
                                <LowStockThresholdDialog
                                  product={selectedProduct}
                                  onClose={() =>
                                    setIsThresholdDialogOpen(false)
                                  }
                                />
                              )}
                            </DialogContent>
                          </Dialog>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More Options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <History className="mr-2 h-4 w-4" />
                                View History
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
