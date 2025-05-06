"use client"

import { useState } from "react"
import { Bell, Save, RefreshCw, AlertTriangle, Truck, Package, BarChart, Calendar, Mail } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"

export default function InventorySettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  
  // General settings
  const [enableInventoryTracking, setEnableInventoryTracking] = useState(true)
  const [trackByVariants, setTrackByVariants] = useState(true)
  const [allowBackorders, setAllowBackorders] = useState(false)
  const [allowNegativeStock, setAllowNegativeStock] = useState(false)
  const [displayStockLevels, setDisplayStockLevels] = useState(true)
  const [stockDisplayThreshold, setStockDisplayThreshold] = useState(5)
  
  // Notification settings
  const [enableLowStockAlerts, setEnableLowStockAlerts] = useState(true)
  const [defaultLowStockThreshold, setDefaultLowStockThreshold] = useState(10)
  const [notifyAdmin, setNotifyAdmin] = useState(true)
  const [notifySupplier, setNotifySupplier] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [dashboardNotifications, setDashboardNotifications] = useState(true)
  
  // Automation settings
  const [enableAutoReorder, setEnableAutoReorder] = useState(false)
  const [autoReorderThreshold, setAutoReorderThreshold] = useState(5)
  const [defaultSupplier, setDefaultSupplier] = useState("rajshahi-farms")
  const [autoGeneratePurchaseOrders, setAutoGeneratePurchaseOrders] = useState(false)
  
  // Reporting settings
  const [stockMovementReporting, setStockMovementReporting] = useState(true)
  const [inventoryValuationMethod, setInventoryValuationMethod] = useState("fifo")
  const [enableStockForecast, setEnableStockForecast] = useState(true)
  const [forecastPeriod, setForecastPeriod] = useState("30")
  
  const handleSaveSettings = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast("Event has been created.")

    }, 1000)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Settings</h1>
          <p className="text-muted-foreground">Configure how your inventory system works.</p>
        </div>
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Inventory Settings</CardTitle>
              <CardDescription>
                Configure basic inventory tracking and display options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="inventory-tracking">Enable Inventory Tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Track stock levels for all products in your store.
                  </p>
                </div>
                <Switch
                  id="inventory-tracking"
                  checked={enableInventoryTracking}
                  onCheckedChange={setEnableInventoryTracking}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="track-variants">Track Inventory by Variants</Label>
                  <p className="text-sm text-muted-foreground">
                    Track stock levels separately for each product variant.
                  </p>
                </div>
                <Switch
                  id="track-variants"
                  checked={trackByVariants}
                  onCheckedChange={setTrackByVariants}
                  disabled={!enableInventoryTracking}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="backorders">Allow Backorders</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow customers to order products that are out of stock.
                  </p>
                </div>
                <Switch
                  id="backorders"
                  checked={allowBackorders}
                  onCheckedChange={setAllowBackorders}
                  disabled={!enableInventoryTracking}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="negative-stock">Allow Negative Stock</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow stock levels to go below zero.
                  </p>
                </div>
                <Switch
                  id="negative-stock"
                  checked={allowNegativeStock}
                  onCheckedChange={setAllowNegativeStock}
                  disabled={!enableInventoryTracking || !allowBackorders}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="display-stock">Display Stock Levels on Product Page</Label>
                  <p className="text-sm text-muted-foreground">
                    Show customers how many items are in stock.
                  </p>
                </div>
                <Switch
                  id="display-stock"
                  checked={displayStockLevels}
                  onCheckedChange={setDisplayStockLevels}
                  disabled={!enableInventoryTracking}
                />
              </div>
              
              {displayStockLevels && (
                <div className="space-y-4 rounded-md border p-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock-display-threshold">
                      Stock Display Threshold
                    </Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Only show exact stock levels when below this threshold
                      </span>
                      <span className="w-12 rounded-md border border-input px-2 py-0.5 text-center text-sm">
                        {stockDisplayThreshold}
                      </span>
                    </div>
                    <Slider
                      id="stock-display-threshold"
                      min={0}
                      max={50}
                      step={1}
                      value={[stockDisplayThreshold]}
                      onValueChange={(value) => setStockDisplayThreshold(value[0])}
                      disabled={!displayStockLevels || !enableInventoryTracking}
                    />
                    <p className="text-xs text-muted-foreground">
                      When stock is above this threshold, display "In Stock" instead of the exact quantity.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Notifications</CardTitle>
              <CardDescription>
                Configure alerts for low stock and other inventory events.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="low-stock-alerts">Enable Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when products are running low.
                  </p>
                </div>
                <Switch
                  id="low-stock-alerts"
                  checked={enableLowStockAlerts}
                  onCheckedChange={setEnableLowStockAlerts}
                />
              </div>
              
              {enableLowStockAlerts && (
                <div className="space-y-4 rounded-md border p-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-threshold">
                      Default Low Stock Threshold
                    </Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Default threshold for all products
                      </span>
                      <span className="w-12 rounded-md border border-input px-2 py-0.5 text-center text-sm">
                        {defaultLowStockThreshold}
                      </span>
                    </div>
                    <Slider
                      id="default-threshold"
                      min={1}
                      max={50}
                      step={1}
                      value={[defaultLowStockThreshold]}
                      onValueChange={(value) => setDefaultLowStockThreshold(value[0])}
                      disabled={!enableLowStockAlerts}
                    />
                    <p className="text-xs text-muted-foreground">
                      This threshold can be overridden for individual products.
                    </p>
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Recipients</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-admin">Notify Admin</Label>
                    <p className="text-sm text-muted-foreground">
                      Send low stock alerts to admin users.
                    </p>
                  </div>
                  <Switch
                    id="notify-admin"
                    checked={notifyAdmin}
                    onCheckedChange={setNotifyAdmin}
                    disabled={!enableLowStockAlerts}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-supplier">Notify Supplier</Label>
                    <p className="text-sm text-muted-foreground">
                      Send low stock alerts to product suppliers.
                    </p>
                  </div>
                  <Switch
                    id="notify-supplier"
                    checked={notifySupplier}
                    onCheckedChange={setNotifySupplier}
                    disabled={!enableLowStockAlerts}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Methods</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications via email.
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    disabled={!enableLowStockAlerts}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="dashboard-notifications">Dashboard Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show notifications in the admin dashboard.
                    </p>
                  </div>
                  <Switch
                    id="dashboard-notifications"
                    checked={dashboardNotifications}
                    onCheckedChange={setDashboardNotifications}
                    disabled={!enableLowStockAlerts}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Automation</CardTitle>
              <CardDescription>
                Configure automatic reordering and other inventory automation features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-reorder">Enable Automatic Reordering</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically create purchase orders when stock is low.
                  </p>
                </div>
                <Switch
                  id="auto-reorder"
                  checked={enableAutoReorder}
                  onCheckedChange={setEnableAutoReorder}
                />
              </div>
              
              {enableAutoReorder && (
                <div className="space-y-4 rounded-md border p-4">
                  <div className="space-y-2">
                    <Label htmlFor="reorder-threshold">
                      Auto-Reorder Threshold
                    </Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Reorder when stock falls below this level
                      </span>
                      <span className="w-12 rounded-md border border-input px-2 py-0.5 text-center text-sm">
                        {autoReorderThreshold}
                      </span>
                    </div>
                    <Slider
                      id="reorder-threshold"
                      min={1}
                      max={20}
                      step={1}
                      value={[autoReorderThreshold]}
                      onValueChange={(value) => setAutoReorderThreshold(value[0])}
                      disabled={!enableAutoReorder}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-supplier">Default Supplier</Label>
                    <Select
                      value={defaultSupplier}
                      onValueChange={setDefaultSupplier}
                      disabled={!enableAutoReorder}
                    >
                      <SelectTrigger id="default-supplier">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rajshahi-farms">Rajshahi Farms</SelectItem>
                        <SelectItem value="chapai-farms">Chapai Farms</SelectItem>
                        <SelectItem value="sundarbans-apiaries">Sundarbans Apiaries</SelectItem>
                        <SelectItem value="dinajpur-orchards">Dinajpur Orchards</SelectItem>
                        <SelectItem value="gazipur-farms">Gazipur Farms</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      This supplier will be used when no specific supplier is set for a product.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-purchase-orders">Auto-Generate Purchase Orders</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically create purchase orders for reordering.
                      </p>
                    </div>
                    <Switch
                      id="auto-purchase-orders"
                      checked={autoGeneratePurchaseOrders}
                      onCheckedChange={setAutoGeneratePurchaseOrders}
                      disabled={!enableAutoReorder}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reporting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Reporting</CardTitle>
              <CardDescription>
                Configure inventory reports and analytics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="stock-movement">Enable Stock Movement Reporting</Label>
                  <p className="text-sm text-muted-foreground">
                    Track and report on all inventory changes.
                  </p>
                </div>
                <Switch
                  id="stock-movement"
                  checked={stockMovementReporting}
                  onCheckedChange={setStockMovementReporting}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="valuation-method">Inventory Valuation Method</Label>
                <Select
                  value={inventoryValuationMethod}
                  onValueChange={setInventoryValuationMethod}
                >
                  <SelectTrigger id="valuation-method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fifo">FIFO (First In, First Out)</SelectItem>
                    <SelectItem value="lifo">LIFO (Last In, First Out)</SelectItem>
                    <SelectItem value="average">Average Cost</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  This method will be used to calculate the value of your inventory.
                </p>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="stock-forecast">Enable Stock Forecasting</Label>
                  <p className="text-sm text-muted-foreground">
                    Use historical data to predict future stock needs.
                  </p>
                </div>
                <Switch
                  id="stock-forecast"
                  checked={enableStockForecast}
                  onCheckedChange={setEnableStockForecast}
                />
              </div>
              
              {enableStockForecast && (
                <div className="space-y-2">
                  <Label htmlFor="forecast-period">Forecast Period</Label>
                  <Select
                    value={forecastPeriod}
                    onValueChange={setForecastPeriod}
                    disabled={!enableStockForecast}
                  >
                    <SelectTrigger id="forecast-period">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    How far into the future to forecast inventory needs.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
