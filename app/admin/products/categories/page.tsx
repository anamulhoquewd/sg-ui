"use client"

import React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Search, Plus, Edit, Trash2, ChevronRight, MoreHorizontal, FolderTree } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

// Sample categories data
const initialCategories = [
  { id: "1", name: "Mangoes", slug: "mangoes", parent: null, productCount: 3 },
  { id: "2", name: "Honey", slug: "honey", parent: null, productCount: 1 },
  { id: "3", name: "Bundles", slug: "bundles", parent: null, productCount: 1 },
  { id: "4", name: "Himshagor", slug: "himshagor", parent: "1", productCount: 1 },
  { id: "5", name: "Rupali", slug: "rupali", parent: "1", productCount: 1 },
  { id: "6", name: "Bari 4", slug: "bari-4", parent: "1", productCount: 1 },
  { id: "7", name: "Pure Honey", slug: "pure-honey", parent: "2", productCount: 1 },
  { id: "8", name: "Seasonal Pack", slug: "seasonal-pack", parent: "3", productCount: 1 },
]

// Form schema
const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  parent: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<(typeof categories)[0] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with default values
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      parent: undefined,
    },
  })

  // Initialize edit form
  const editForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      parent: undefined,
    },
  })

  // Filter categories based on search query
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get parent categories (top level)
  const parentCategories = categories.filter((category) => category.parent === null)

  // Get child categories for a parent
  const getChildCategories = (parentId: string) => {
    return categories.filter((category) => category.parent === parentId)
  }

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
  }

  // Handle name change to auto-generate slug
  const handleNameChange = (name: string) => {
    form.setValue("name", name)
    if (!form.getValues("slug")) {
      form.setValue("slug", generateSlug(name))
    }
  }

  // Handle edit name change
  const handleEditNameChange = (name: string) => {
    editForm.setValue("name", name)
    if (editForm.getValues("slug") === editingCategory?.slug) {
      editForm.setValue("slug", generateSlug(name))
    }
  }

  // Open edit dialog
  const openEditDialog = (category: (typeof categories)[0]) => {
    setEditingCategory(category)
    editForm.reset({
      name: category.name,
      slug: category.slug,
      parent: category.parent || undefined,
    })
    setIsEditDialogOpen(true)
  }

  // Add new category
  const onSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true)

    try {
      // In a real app, you would submit data to your API
      const newCategory = {
        id: `${categories.length + 1}`,
        name: data.name,
        slug: data.slug,
        parent: data.parent || null,
        productCount: 0,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCategories([...categories, newCategory])

      toast("Event has been created.")


      // Reset form and close dialog
      form.reset()
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error creating category:", error)
      toast("Event has been created.")

    } finally {
      setIsSubmitting(false)
    }
  }

  // Update category
  const onUpdate = async (data: CategoryFormValues) => {
    if (!editingCategory) return

    setIsSubmitting(true)

    try {
      // In a real app, you would submit data to your API
      const updatedCategories = categories.map((category) => {
        if (category.id === editingCategory.id) {
          return {
            ...category,
            name: data.name,
            slug: data.slug,
            parent: data.parent || null,
          }
        }
        return category
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCategories(updatedCategories)

      toast("Event has been created.")


      // Reset form and close dialog
      editForm.reset()
      setIsEditDialogOpen(false)
      setEditingCategory(null)
    } catch (error) {
      console.error("Error updating category:", error)
      toast("Event has been created.")

    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete category
  const deleteCategory = async (categoryId: string) => {
    try {
      // Check if category has children
      const hasChildren = categories.some((category) => category.parent === categoryId)

      if (hasChildren) {
        toast("Event has been created.")

        return
      }

      // In a real app, you would submit delete request to your API
      const updatedCategories = categories.filter((category) => category.id !== categoryId)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCategories(updatedCategories)

      toast("Event has been created.")

    } catch (error) {
      console.error("Error deleting category:", error)
      toast("Event has been created.")

    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage product categories and subcategories.</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>Create a new category for organizing your products.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter category name"
                            {...field}
                            onChange={(e) => handleNameChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter slug" {...field} />
                        </FormControl>
                        <FormDescription>Used in URLs. Auto-generated from name.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Category (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="None (Top Level)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None (Top Level)</SelectItem>
                            {parentCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Select a parent category to create a subcategory.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                      {isSubmitting ? "Creating..." : "Create Category"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
          <CardDescription>You have {categories.length} categories in total.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No categories found. Try adjusting your search or create a new category.
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {/* Parent categories first */}
                    {filteredCategories
                      .filter((category) => category.parent === null)
                      .map((category) => (
                        <React.Fragment key={category.id}>
                          <TableRow>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <FolderTree className="h-4 w-4 text-muted-foreground" />
                                {category.name}
                              </div>
                            </TableCell>
                            <TableCell>{category.slug}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{category.productCount}</Badge>
                            </TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEditDialog(category)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                        className="text-destructive"
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will permanently delete the category. This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => deleteCategory(category.id)}
                                          className="bg-destructive hover:bg-destructive/90"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>

                          {/* Child categories */}
                          {getChildCategories(category.id).map((childCategory) => (
                            <TableRow key={childCategory.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2 pl-6">
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  {childCategory.name}
                                </div>
                              </TableCell>
                              <TableCell>{childCategory.slug}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{childCategory.productCount}</Badge>
                              </TableCell>
                              <TableCell>{category.name}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => openEditDialog(childCategory)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <DropdownMenuItem
                                          onSelect={(e) => e.preventDefault()}
                                          className="text-destructive"
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This will permanently delete the category. This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => deleteCategory(childCategory.id)}
                                            className="bg-destructive hover:bg-destructive/90"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </React.Fragment>
                      ))}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category details.</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onUpdate)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter category name"
                        {...field}
                        onChange={(e) => handleEditNameChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter slug" {...field} />
                    </FormControl>
                    <FormDescription>Used in URLs. Auto-generated from name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="parent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="None (Top Level)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None (Top Level)</SelectItem>
                        {parentCategories
                          .filter((category) => category.id !== editingCategory?.id)
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select a parent category to create a subcategory.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                  {isSubmitting ? "Updating..." : "Update Category"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
