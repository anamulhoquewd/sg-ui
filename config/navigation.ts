import {
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  CreditCard,
} from "lucide-react";

const navigation = [

  {
    icon: Package,
    title: "Products",
    children: [
      { title: "All Products", url: "/admin/products" },
      { title: "Add Product", url: "/admin/products/new" },
      { title: "Categories", url: "/admin/products/categories" },
      { title: "Inventory", url: "/admin/products/inventory" },
    ],
  },
  {
    icon: ShoppingCart,
    title: "Orders",
    children: [
      { title: "All Orders", url: "/admin/orders" },
      { title: "Pending", url: "/admin/orders?status=pending" },
      { title: "Processing", url: "/admin/orders?status=processing" },
      { title: "Shipped", url: "/admin/orders?status=shipped" },
      { title: "Delivered", url: "/admin/orders?status=delivered" },
      { title: "Cancelled", url: "/admin/orders?status=cancelled" },
    ],
  },
  {
    icon: Users,
    title: "Users",
    children: [
      { title: "All Users", url: "/admin/users" },
      { title: "Admins", url: "/admin/users/admins" },
      { title: "Customers", url: "/admin/users/customers" },
      { title: "Add User", url: "/admin/users/new" },
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics",
    children: [
      { title: "Sales", url: "/admin/analytics/sales" },
      { title: "Products", url: "/admin/analytics/products" },
      { title: "Customers", url: "/admin/analytics/customers" },
      { title: "Reports", url: "/admin/analytics/reports" },
    ],
  },
  {
    icon: CreditCard,
    title: "Payments",
    children: [
      { title: "Transactions", url: "/admin/payments" },
      { title: "Refunds", url: "/admin/payments/refunds" },
      { title: "Payment Methods", url: "/admin/payments/methods" },
    ],
  },

];

export { navigation };
