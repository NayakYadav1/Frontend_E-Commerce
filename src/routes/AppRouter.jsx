import { Layout } from "@/components"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import * as Pages from "@/pages"
import { PrivateRoute } from "./PrivateRoute"
import { AdminRoute } from "./AdminRoute"
import { CmsRoute } from "./CmsRoute"

export const AppRouter = () => {
    
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PrivateRoute element={<Pages.Dashboard.Home />} />} />

                <Route path="profile/edit" element={<PrivateRoute element={<Pages.Profile.Edit /> } /> } />
                <Route path="profile/password" element={<PrivateRoute element={<Pages.Profile.Password /> } /> } />

                {/* <Route path="staffs" element={<PrivateRoute element={<Pages.Staffs.List /> } /> } />
                <Route path="staffs/create" element={<PrivateRoute element={<Pages.Staffs.Create /> } /> } />
                <Route path="staffs/:id" element={<PrivateRoute element={<Pages.Staffs.Edit /> } /> } /> */}

                {/* Alternative of above commented code */}
                <Route path="staffs" element={<PrivateRoute element={<AdminRoute element={<Outlet /> } />} />} >  
                    <Route index element={<Pages.Staffs.List />} />
                    <Route path="create" element={<Pages.Staffs.Create />} />
                    <Route path=":id" element={<Pages.Staffs.Edit />} />
                </Route>

                <Route path="customers" element={<PrivateRoute element={<CmsRoute element={<Outlet /> } />} />} >  
                    <Route index element={<Pages.Customers.List />} />
                    <Route path="create" element={<Pages.Customers.Create />} />
                    <Route path=":id" element={<Pages.Customers.Edit />} />
                </Route>

                <Route path="categories" element={<PrivateRoute element={<CmsRoute element={<Outlet /> } />} />} >  
                    <Route index element={<Pages.Categories.List />} />
                    <Route path="create" element={<Pages.Categories.Create />} />
                    <Route path=":id" element={<Pages.Categories.Edit />} />
                </Route>

                <Route path="brands" element={<PrivateRoute element={<CmsRoute element={<Outlet /> } />} />} >  
                    <Route index element={<Pages.Brands.List />} />
                    <Route path="create" element={<Pages.Brands.Create />} />
                    <Route path=":id" element={<Pages.Brands.Edit />} />
                </Route>
                
                <Route path="login" element={<Pages.Auth.Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
}