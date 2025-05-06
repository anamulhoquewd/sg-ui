"use client"

import { useState } from "react"
import { Store, Mail, Phone, MapPin, Globe, CreditCard, Truck, Save, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    name: "Shuddhoghor",
    email: "info@shuddhoghor.com",
    phone: "01712345678",
    address: "123 Fruit Street, Gulshan, Dhaka, Bangladesh",
    currency: "BDT",
    timezone: "Asia/Dhaka",
    logo: "/placeholder.svg?height=100&width=100",
    description: "Premium organic food store providing fresh and healthy products.",
    taxRate: "15",
    orderPrefix: "SG-",
    language: "en",
    metaTitle: "Shuddhoghor - Organic Food Store",
    metaDescription: "Buy fresh organic food products online with fast delivery.",
  })

  const [paymentSettings, setPaymentSettings] = useState({
    acceptCreditCards: true,
    acceptPaypal: true,
    acceptCryptocurrency: false,
    acceptBankTransfer: true,
    acceptCashOnDelivery: true,
    stripeEnabled: true,
    stripeKey: "pk_test_51HZL...",
    stripeSecret: "sk_test_51HZL...",
    paypalClientId: "AeL6J3Y...",
    paypalSecret: "EFDxN7K...",
    invoicePrefix: "INV-",
    invoiceFooter: "Thank you for shopping with us!",
  })

  const [shippingSettings, setShippingSettings] = useState({
    enableFreeShipping: true,
    freeShippingMinimum: "1000",
    enableLocalPickup: true,
    enableInternationalShipping: false,
    defaultShippingRate: "120",
    shippingCalculationType: "flat",
    weightUnit: "kg",
    dimensionUnit: "cm",
    processingTime: "1-2",
    shippingPartners: ["DHL", "FedEx", "Local Courier"],
  })

  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderStatusUpdate: true,
    orderShipped: true,
    orderDelivered: true,
    lowStockAlert: true,
    newProductAlert: false,
    marketingEmails: false,
    adminNewOrder: true,
    adminLowStock: true,
    adminSystemAlert: true,
    smsNotifications: false,
    pushNotifications: true,
    emailTemplate: "default",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: "90",
    loginAttempts: "5",
    sessionTimeout: "60",
    ipRestriction: false,
    dataBackup: true,
    backupFrequency: "daily",
    gdprCompliance: true,
    privacyPolicyUrl: "/privacy-policy",
    termsOfServiceUrl: "/terms-of-service",
    cookieConsent: true,
  })

  const handleStoreSettingsChange = (field: string, value: string) => {
    setStoreSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleToggleChange = (settingsType: string, field: string, value: boolean) => {
    switch (settingsType) {
      case "payment":
        setPaymentSettings((prev) => ({ ...prev, [field]: value }))
        break
      case "shipping":
        setShippingSettings((prev) => ({ ...prev, [field]: value }))
        break
      case "notification":
        setNotificationSettings((prev) => ({ ...prev, [field]: value }))
        break
      case "security":
        setSecuritySettings((prev) => ({ ...prev, [field]: value }))
        break
    }
  }

  const handleInputChange = (settingsType: string, field: string, value: string) => {
    switch (settingsType) {
      case "payment":
        setPaymentSettings((prev) => ({ ...prev, [field]: value }))
        break
      case "shipping":
        setShippingSettings((prev) => ({ ...prev, [field]: value }))
        break
      case "notification":
        setNotificationSettings((prev) => ({ ...prev, [field]: value }))
        break
      case "security":
        setSecuritySettings((prev) => ({ ...prev, [field]: value }))
        break
    }
  }

  const handleSaveSettings = () => {
    // In a real application, this would save to a database
    toast("Event has been created.")

  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your store settings and preferences.</p>
        </div>
        <Button onClick={handleSaveSettings} className="hidden sm:flex">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Basic information about your store.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={storeSettings.logo || "/placeholder.svg"} alt="Store logo" />
                    <AvatarFallback>{storeSettings.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="store-name">Store Name</Label>
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="store-name"
                          value={storeSettings.name}
                          onChange={(e) => handleStoreSettingsChange("name", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store-email">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="store-email"
                          type="email"
                          value={storeSettings.email}
                          onChange={(e) => handleStoreSettingsChange("email", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="store-phone">Phone Number</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="store-phone"
                          value={storeSettings.phone}
                          onChange={(e) => handleStoreSettingsChange("phone", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store-address">Address</Label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="store-address"
                          value={storeSettings.address}
                          onChange={(e) => handleStoreSettingsChange("address", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-description">Store Description</Label>
                  <Textarea
                    id="store-description"
                    value={storeSettings.description}
                    onChange={(e) => handleStoreSettingsChange("description", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-currency">Currency</Label>
                    <Select
                      value={storeSettings.currency}
                      onValueChange={(value) => handleStoreSettingsChange("currency", value)}
                    >
                      <SelectTrigger id="store-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BDT">BDT - Bangladeshi Taka</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-timezone">Timezone</Label>
                    <Select
                      value={storeSettings.timezone}
                      onValueChange={(value) => handleStoreSettingsChange("timezone", value)}
                    >
                      <SelectTrigger id="store-timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Dhaka">Asia/Dhaka (GMT+6)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    value={storeSettings.taxRate}
                    onChange={(e) => handleStoreSettingsChange("taxRate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-prefix">Order Prefix</Label>
                  <Input
                    id="order-prefix"
                    value={storeSettings.orderPrefix}
                    onChange={(e) => handleStoreSettingsChange("orderPrefix", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-language">Default Language</Label>
                  <Select
                    value={storeSettings.language}
                    onValueChange={(value) => handleStoreSettingsChange("language", value)}
                  >
                    <SelectTrigger id="store-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="bn">Bengali</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <h3 className="text-sm font-medium">SEO Settings</h3>
              <div className="flex space-x-2">
                <div className="w-full space-y-2 md:w-80">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={storeSettings.metaTitle}
                    onChange={(e) => handleStoreSettingsChange("metaTitle", e.target.value)}
                  />
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure which payment methods your store accepts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Credit/Debit Cards</p>
                      <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, etc.</p>
                    </div>
                  </div>
                  <Switch
                    checked={paymentSettings.acceptCreditCards}
                    onCheckedChange={(checked) => handleToggleChange("payment", "acceptCreditCards", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-muted-foreground">Accept payments via PayPal</p>
                    </div>
                  </div>
                  <Switch
                    checked={paymentSettings.acceptPaypal}
                    onCheckedChange={(checked) => handleToggleChange("payment", "acceptPaypal", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">Accept cash payments on delivery</p>
                    </div>
                  </div>
                  <Switch
                    checked={paymentSettings.acceptCashOnDelivery}
                    onCheckedChange={(checked) => handleToggleChange("payment", "acceptCashOnDelivery", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-muted-foreground">Accept direct bank transfers</p>
                    </div>
                  </div>
                  <Switch
                    checked={paymentSettings.acceptBankTransfer}
                    onCheckedChange={(checked) => handleToggleChange("payment", "acceptBankTransfer", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Gateway Settings</h3>

                <div className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Stripe</h4>
                      <p className="text-sm text-muted-foreground">Credit card processing via Stripe</p>
                    </div>
                    <Switch
                      checked={paymentSettings.stripeEnabled}
                      onCheckedChange={(checked) => handleToggleChange("payment", "stripeEnabled", checked)}
                    />
                  </div>

                  {paymentSettings.stripeEnabled && (
                    <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="stripe-key">Publishable Key</Label>
                        <Input
                          id="stripe-key"
                          value={paymentSettings.stripeKey}
                          onChange={(e) => handleInputChange("payment", "stripeKey", e.target.value)}
                          type="password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stripe-secret">Secret Key</Label>
                        <Input
                          id="stripe-secret"
                          value={paymentSettings.stripeSecret}
                          onChange={(e) => handleInputChange("payment", "stripeSecret", e.target.value)}
                          type="password"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">PayPal</h4>
                      <p className="text-sm text-muted-foreground">Accept payments via PayPal</p>
                    </div>
                    <Switch
                      checked={paymentSettings.acceptPaypal}
                      onCheckedChange={(checked) => handleToggleChange("payment", "acceptPaypal", checked)}
                    />
                  </div>

                  {paymentSettings.acceptPaypal && (
                    <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="paypal-client">Client ID</Label>
                        <Input
                          id="paypal-client"
                          value={paymentSettings.paypalClientId}
                          onChange={(e) => handleInputChange("payment", "paypalClientId", e.target.value)}
                          type="password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paypal-secret">Secret</Label>
                        <Input
                          id="paypal-secret"
                          value={paymentSettings.paypalSecret}
                          onChange={(e) => handleInputChange("payment", "paypalSecret", e.target.value)}
                          type="password"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                  <Input
                    id="invoice-prefix"
                    value={paymentSettings.invoicePrefix}
                    onChange={(e) => handleInputChange("payment", "invoicePrefix", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-footer">Invoice Footer Text</Label>
                  <Textarea
                    id="invoice-footer"
                    value={paymentSettings.invoiceFooter}
                    onChange={(e) => handleInputChange("payment", "invoiceFooter", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Options</CardTitle>
              <CardDescription>Configure shipping methods and rates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">
                      Offer free shipping on orders above a minimum amount
                    </p>
                  </div>
                  <Switch
                    checked={shippingSettings.enableFreeShipping}
                    onCheckedChange={(checked) => handleToggleChange("shipping", "enableFreeShipping", checked)}
                  />
                </div>
                {shippingSettings.enableFreeShipping && (
                  <div className="space-y-2 rounded-lg border p-4">
                    <Label htmlFor="free-shipping-minimum">Minimum Order Amount</Label>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">{storeSettings.currency}</span>
                      <Input
                        id="free-shipping-minimum"
                        value={shippingSettings.freeShippingMinimum}
                        onChange={(e) => handleInputChange("shipping", "freeShippingMinimum", e.target.value)}
                        type="number"
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Local Pickup</h4>
                    <p className="text-sm text-muted-foreground">Allow customers to pick up orders from your store</p>
                  </div>
                  <Switch
                    checked={shippingSettings.enableLocalPickup}
                    onCheckedChange={(checked) => handleToggleChange("shipping", "enableLocalPickup", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">International Shipping</h4>
                    <p className="text-sm text-muted-foreground">Ship orders to international destinations</p>
                  </div>
                  <Switch
                    checked={shippingSettings.enableInternationalShipping}
                    onCheckedChange={(checked) =>
                      handleToggleChange("shipping", "enableInternationalShipping", checked)
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default-rate">Default Shipping Rate</Label>
                  <div className="flex items-center">
                    <span className="mr-2 text-muted-foreground">{storeSettings.currency}</span>
                    <Input
                      id="default-rate"
                      value={shippingSettings.defaultShippingRate}
                      onChange={(e) => handleInputChange("shipping", "defaultShippingRate", e.target.value)}
                      type="number"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calculation-type">Shipping Calculation</Label>
                  <Select
                    value={shippingSettings.shippingCalculationType}
                    onValueChange={(value) => handleInputChange("shipping", "shippingCalculationType", value)}
                  >
                    <SelectTrigger id="calculation-type">
                      <SelectValue placeholder="Select calculation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat Rate</SelectItem>
                      <SelectItem value="weight">Weight Based</SelectItem>
                      <SelectItem value="price">Price Based</SelectItem>
                      <SelectItem value="distance">Distance Based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="weight-unit">Weight Unit</Label>
                  <Select
                    value={shippingSettings.weightUnit}
                    onValueChange={(value) => handleInputChange("shipping", "weightUnit", value)}
                  >
                    <SelectTrigger id="weight-unit">
                      <SelectValue placeholder="Select weight unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="g">Grams (g)</SelectItem>
                      <SelectItem value="lb">Pounds (lb)</SelectItem>
                      <SelectItem value="oz">Ounces (oz)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimension-unit">Dimension Unit</Label>
                  <Select
                    value={shippingSettings.dimensionUnit}
                    onValueChange={(value) => handleInputChange("shipping", "dimensionUnit", value)}
                  >
                    <SelectTrigger id="dimension-unit">
                      <SelectValue placeholder="Select dimension unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">Centimeters (cm)</SelectItem>
                      <SelectItem value="m">Meters (m)</SelectItem>
                      <SelectItem value="in">Inches (in)</SelectItem>
                      <SelectItem value="ft">Feet (ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processing-time">Processing Time (days)</Label>
                  <Select
                    value={shippingSettings.processingTime}
                    onValueChange={(value) => handleInputChange("shipping", "processingTime", value)}
                  >
                    <SelectTrigger id="processing-time">
                      <SelectValue placeholder="Select processing time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-day">Same Day</SelectItem>
                      <SelectItem value="1-2">1-2 Days</SelectItem>
                      <SelectItem value="3-5">3-5 Days</SelectItem>
                      <SelectItem value="5-7">5-7 Days</SelectItem>
                      <SelectItem value="7-14">7-14 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and system notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Customer Notifications</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">Order Confirmation</h4>
                      <p className="text-sm text-muted-foreground">Send email when an order is placed</p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderConfirmation}
                      onCheckedChange={(checked) => handleToggleChange("notification", "orderConfirmation", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">Order Status Updates</h4>
                      <p className="text-sm text-muted-foreground">Send email when order status changes</p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderStatusUpdate}
                      onCheckedChange={(checked) => handleToggleChange("notification", "orderStatusUpdate", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">Shipping Confirmation</h4>
                      <p className="text-sm text-muted-foreground">Send email when order is shipped</p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderShipped}
                      onCheckedChange={(checked) => handleToggleChange("notification", "orderShipped", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">Delivery Confirmation</h4>
                      <p className="text-sm text-muted-foreground">Send email when order is delivered</p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderDelivered}
                      onCheckedChange={(checked) => handleToggleChange("notification", "orderDelivered", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Admin Notifications</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">New Order Alerts</h4>
                      <p className="text-sm text-muted-foreground">Receive notification when new orders are placed</p>
                    </div>
                    <Switch
                      checked={notificationSettings.adminNewOrder}
                      onCheckedChange={(checked) => handleToggleChange("notification", "adminNewOrder", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">Low Stock Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notification when products are low in stock
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.adminLowStock}
                      onCheckedChange={(checked) => handleToggleChange("notification", "adminLowStock", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">System Alerts</h4>
                      <p className="text-sm text-muted-foreground">Receive notification for system events</p>
                    </div>
                    <Switch
                      checked={notificationSettings.adminSystemAlert}
                      onCheckedChange={(checked) => handleToggleChange("notification", "adminSystemAlert", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => handleToggleChange("notification", "smsNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">Send browser push notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => handleToggleChange("notification", "pushNotifications", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-template">Email Template</Label>
                <Select
                  value={notificationSettings.emailTemplate}
                  onValueChange={(value) => handleInputChange("notification", "emailTemplate", value)}
                >
                  <SelectTrigger id="email-template">
                    <SelectValue placeholder="Select email template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Template</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and privacy settings for your store.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => handleToggleChange("security", "twoFactorAuth", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Data Backup</h4>
                    <p className="text-sm text-muted-foreground">Automatically backup store data</p>
                  </div>
                  <Switch
                    checked={securitySettings.dataBackup}
                    onCheckedChange={(checked) => handleToggleChange("security", "dataBackup", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">GDPR Compliance</h4>
                    <p className="text-sm text-muted-foreground">Enable GDPR compliance features</p>
                  </div>
                  <Switch
                    checked={securitySettings.gdprCompliance}
                    onCheckedChange={(checked) => handleToggleChange("security", "gdprCompliance", checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Cookie Consent</h4>
                    <p className="text-sm text-muted-foreground">Show cookie consent banner</p>
                  </div>
                  <Switch
                    checked={securitySettings.cookieConsent}
                    onCheckedChange={(checked) => handleToggleChange("security", "cookieConsent", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input
                    id="password-expiry"
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => handleInputChange("security", "passwordExpiry", e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-attempts">Max Login Attempts</Label>
                  <Input
                    id="login-attempts"
                    value={securitySettings.loginAttempts}
                    onChange={(e) => handleInputChange("security", "loginAttempts", e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleInputChange("security", "sessionTimeout", e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="privacy-policy">Privacy Policy URL</Label>
                  <Input
                    id="privacy-policy"
                    value={securitySettings.privacyPolicyUrl}
                    onChange={(e) => handleInputChange("security", "privacyPolicyUrl", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="terms-service">Terms of Service URL</Label>
                  <Input
                    id="terms-service"
                    value={securitySettings.termsOfServiceUrl}
                    onChange={(e) => handleInputChange("security", "termsOfServiceUrl", e.target.value)}
                  />
                </div>
              </div>

              {securitySettings.dataBackup && (
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select
                    value={securitySettings.backupFrequency}
                    onValueChange={(value) => handleInputChange("security", "backupFrequency", value)}
                  >
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Select backup frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center sm:hidden">
        <Button onClick={handleSaveSettings} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
