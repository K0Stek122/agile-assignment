import React from 'react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from './ui/sidebar';

import { CalendarClockIcon, CarFrontIcon, HouseIcon, IdCardIcon, LogOutIcon, Settings2Icon, ShieldCheckIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navigationItems = [
  { title: 'Home', href: '/', icon: HouseIcon },
  { title: 'Membership', href: '/membership', icon: IdCardIcon },
  { title: 'Parking', href: '/parking', icon: CarFrontIcon },
  { title: 'Sessions', href: '/sessions', icon: CalendarClockIcon },
  { title: 'Account Options', href: '/account-options', icon: Settings2Icon },
  { title: 'Log Out', href: '/login', icon: LogOutIcon },
]

export const SidebarWrapper: React.FC = () => {
  const location = useLocation()

  return (
        <div className="flex flex-row">
          <Sidebar collapsible="none" className="border-r border-sidebar-border h-screen">
            <SidebarHeader className="px-4 py-5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ShieldCheckIcon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-tight">Agile Club</p>
                  <p className="text-xs text-sidebar-foreground/70">Member Portal</p>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup className="px-3 py-2">
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={<Link to={item.href} />}
                        isActive={location.pathname === item.href || (item.href === '/' && location.pathname === '/')}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border p-4">
              <div className="rounded-md bg-sidebar-accent/60 px-3 py-2">
                <p className="text-xs text-sidebar-foreground/70">Signed in as</p>
                <p className="text-sm font-medium">Alex Johnson</p>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="min-h-svh w-full bg-background">
            <div className="flex h-full flex-col">
              <header className="border-b border-border px-6 py-5">
                <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
              </header>
              <main className="flex-1 px-6 py-6">
                <div className="rounded-xl border border-dashed border-border bg-muted/40 p-8 text-sm text-muted-foreground">
                  Main dashboard content goes here.
                </div>
              </main>
            </div>
          </SidebarInset>
        </div>
      )
    }