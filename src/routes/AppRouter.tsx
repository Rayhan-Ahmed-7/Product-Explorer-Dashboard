import { Routes, Route, Navigate } from 'react-router'
import MainLayout from '@/layouts/MainLayout'
import ProductListPage from '@/features/products/pages/ProductListPage'
import ProductDetailPage from '@/features/products/pages/ProductDetailPage'
import ProductSearchPage from '@/features/products/pages/ProductSearchPage'
import CategoriesPage from '@/features/products/pages/CategoriesPage'
import SettingsPage from '@/features/settings/pages/SettingsPage'

export function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Navigate to="/products" replace />} />
                <Route path="products" element={<ProductListPage />} />
                <Route path="products/search" element={<ProductSearchPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="products/categories" element={<CategoriesPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/products" replace />} />
            </Route>
        </Routes>
    )
}
