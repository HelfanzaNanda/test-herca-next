'use client'
import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { toastSuccess } from '@/lib/my-toast';
import { METHOD_GET, fetcher, fetcherGet } from '@/lib/api-instance';
import { getRoleName, removeAuth } from '@/lib/authentication';
import Cookies from "js-cookie";


export default function NavbarComponent() {
    const pathname = usePathname();
    
    // const currentRole = getRoleName();
    const currentRole = localStorage.getItem("role");
    // console.log('currentRole : ', currentRole);
    

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    
    const menuItems = [,
        { label : 'Dashboard', url: '/dashboard', roles : ['ADMIN', 'CUSTOMER'] },
        { label : 'Sales', url: '/sales', roles : ['ADMIN', 'CUSTOMER'] },
        { label : 'Users', url: '/users', roles : ['ADMIN'] },
        { label : 'Revenue', url: '/revenue', roles : ['ADMIN'] },
        { label : 'My Credit', url: '/my-credit', roles : ['CUSTOMER'] },
    ];

    const menus = menuItems.filter(menu => menu?.roles.includes(currentRole!!));
    // console.log('MENUS : ', menus);
    


    const router = useRouter();
    const handleLogout = async () => {
        const response = await fetcherGet("logout")
        if (response.status) {
            removeAuth();
            toastSuccess("logout successfully");
            router.push("/login")
        }
    }


    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    {/* <AcmeLogo /> */}
                    <p className="font-bold text-inherit">TEST</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {
                    menus.map((menu, key) => (
                        <NavbarItem key={key} isActive={pathname == menu?.url}>
                            <Link
                                color="foreground"
                                href={menu?.url}>
                                {menu?.label}
                            </Link>
                        </NavbarItem>
                    ))
                }
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button onClick={handleLogout} as={Link} color="primary" href="#" variant="flat">
                        Logout
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}
