import { Routes, Route, Navigate } from 'react-router'
import MainLayout from '@/layouts/MainLayout'
import { JustGoLayout } from '@/layouts/JustGoLayout'
import ProductListPage from '@/features/products/pages/ProductListPage'
import ProductDetailPage from '@/features/products/pages/ProductDetailPage'
import ProductSearchPage from '@/features/products/pages/ProductSearchPage'
import CategoriesPage from '@/features/products/pages/CategoriesPage'
import SettingsPage from '@/features/settings/pages/SettingsPage'
import { MembersPage } from '@/features/members/pages/MembersPage'
import { ComponentLibraryPage } from '@/features/components/pages/ComponentLibraryPage'

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/members" replace />} />
            
            <Route element={<JustGoLayout />}>
                <Route path="members" element={<MembersPage />} />
            </Route>

            <Route element={<MainLayout />}>
                <Route path="products" element={<ProductListPage />} />
                <Route path="products/search" element={<ProductSearchPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="products/categories" element={<CategoriesPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="components" element={<ComponentLibraryPage />} />
                <Route path="*" element={<Navigate to="/products" replace />} />
            </Route>
        </Routes>
    )
}
