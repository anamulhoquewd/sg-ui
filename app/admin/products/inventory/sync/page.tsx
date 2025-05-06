"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Database,
  Server,
  Settings,
  ArrowDownUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {toast} from "sonner"

// Sample sync history data
const syncHistory = [
  {
    id: 1,
    date: new Date(2023, 4, 25, 14, 30),
    status: "success",
    duration: "1m 45s",
    items: 245,
    errors: 0,
    type: "manual",
  },
  {
    id: 2,
    date: new Date(2023, 4, 24, 8, 0),
    status: "success",
    duration: "2m 12s",
    items: 245,
    errors: 0,
    type: "scheduled",
  },
  {
    id: 3,
    date: new Date(2023, 4, 23, 8, 0),
    status: "partial",
    duration: "2m 30s",
    items: 240,
    errors: 5,
    type: "scheduled",
  },
  {
    id: 4,
    date: new Date(2023, 4, 22, 8, 0),
    status: "failed",
    duration: "0m 45s",
    items: 0,
    errors: 1,
    type: "scheduled",
  },
  {
    id: 5,
    date: new Date(2023, 4, 21, 8, 0),
    status: "success",
    duration: "1m 58s",
    items: 243,
    errors: 0,
    type: "scheduled",
  },
]

export default function SyncPage() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [autoSync, setAutoSync] = useState(true)
  const [syncFrequency, setSyncFrequency] = useState("daily")
  const [syncTime, setSyncTime] = useState("08:00")

  const handleSync = () => {
    setIsSyncing(true)
    setSyncProgress(0)

    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSyncing(false)
          toast( "Sync complete")
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">Success</Badge>
      case "partial":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Partial
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Sync</h1>
          <p className="text-muted-foreground">Synchronize your inventory data across all systems.</p>
        </div>
        <Button onClick={handleSync} disabled={isSyncing}>
          {isSyncing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Now
            </>
          )}
        </Button>
      </div>

      {isSyncing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Syncing inventory data...</h3>
                <span className="text-sm">{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="status" className="space-y-4">
        <TabsList>
          <TabsTrigger value="status">Sync Status</TabsTrigger>
          <TabsTrigger value="history">Sync History</TabsTrigger>
          <TabsTrigger value="settings">Sync Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Last Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-xl font-medium">{format(syncHistory[0].date, "MMM d, yyyy h:mm a")}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {syncHistory[0].status === "success" ? "Completed successfully" : "Completed with issues"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Sync Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  {syncHistory[0].status === "success" ? (
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  ) : syncHistory[0].status === "partial" ? (
                    <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                  ) : (
                    <XCircle className="mr-2 h-5 w-5 text-red-500" />
                  )}
                  <span className="text-xl font-medium">
                    {syncHistory[0].status === "success"
                      ? "All Systems Synced"
                      : syncHistory[0].status === "partial"
                        ? "Partially Synced"
                        : "Sync Failed"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {syncHistory[0].items} items processed in {syncHistory[0].duration}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Next Scheduled Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-xl font-medium">
                    {format(new Date().setHours(8, 0, 0, 0), "MMM d, yyyy h:mm a")}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Automatic daily sync at 8:00 AM</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Connected Systems</CardTitle>
              <CardDescription>Status of all systems connected to your inventory.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Main Database</h3>
                      <p className="text-sm text-muted-foreground">Primary inventory database</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>

                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center">
                    <Server className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">E-commerce Platform</h3>
                      <p className="text-sm text-muted-foreground">Online store inventory</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>

                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center">
                    <ArrowDownUp className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Supplier Portal</h3>
                      <p className="text-sm text-muted-foreground">Supplier inventory management</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>

                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Warehouse Management System</h3>
                      <p className="text-sm text-muted-foreground">Physical inventory tracking</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-amber-500 border-amber-500">
                    Partial
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sync History</CardTitle>
              <CardDescription>Record of all inventory synchronization activities.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Date & Time</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Duration</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Items Processed</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Errors</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syncHistory.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="px-4 py-3 text-sm">{format(item.date, "MMM d, yyyy h:mm a")}</td>
                        <td className="px-4 py-3 text-sm">{getStatusBadge(item.status)}</td>
                        <td className="px-4 py-3 text-sm">{item.duration}</td>
                        <td className="px-4 py-3 text-sm">{item.items}</td>
                        <td className="px-4 py-3 text-sm">
                          {item.errors > 0 ? <span className="text-red-500">{item.errors}</span> : item.errors}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline">{item.type === "manual" ? "Manual" : "Scheduled"}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 5 of 25 sync records</div>
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
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>Configure how and when your inventory data is synchronized.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-sync">Automatic Synchronization</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync inventory data on a schedule.</p>
                </div>
                <Switch id="auto-sync" checked={autoSync} onCheckedChange={setAutoSync} />
              </div>

              {autoSync && (
                <div className="space-y-4 rounded-md border p-4">
                  <div className="space-y-2">
                    <Label htmlFor="sync-frequency">Sync Frequency</Label>
                    <Select value={syncFrequency} onValueChange={setSyncFrequency}>
                      <SelectTrigger id="sync-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sync-time">Sync Time</Label>
                    <Select value={syncTime} onValueChange={setSyncTime}>
                      <SelectTrigger id="sync-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="00:00">12:00 AM</SelectItem>
                        <SelectItem value="04:00">4:00 AM</SelectItem>
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Sync Options</h3>

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-images">Sync Product Images</Label>
                    <p className="text-sm text-muted-foreground">Include product images in synchronization.</p>
                  </div>
                  <Switch id="sync-images" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-prices">Sync Prices</Label>
                    <p className="text-sm text-muted-foreground">Include product prices in synchronization.</p>
                  </div>
                  <Switch id="sync-prices" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-descriptions">Sync Descriptions</Label>
                    <p className="text-sm text-muted-foreground">Include product descriptions in synchronization.</p>
                  </div>
                  <Switch id="sync-descriptions" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-deleted">Sync Deleted Products</Label>
                    <p className="text-sm text-muted-foreground">Include deleted products in synchronization.</p>
                  </div>
                  <Switch id="sync-deleted" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notifications</h3>

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-success">Notify on Successful Sync</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when sync completes successfully.
                    </p>
                  </div>
                  <Switch id="notify-success" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-error">Notify on Sync Error</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications when sync encounters errors.</p>
                  </div>
                  <Switch id="notify-error" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
