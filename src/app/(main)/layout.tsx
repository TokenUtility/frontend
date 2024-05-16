"use client"
import "../globals.scss";
import AppHeader from "@/app/components/AppHeader";
import AppFooter from "@/app/components/AppFooter";
import AppProviders from "@/app/components/Web3ReactManager/AppProviders";
import Notification from "@/app/components/Notification";
import LoadingModal from "@/app/components/Modal/Loading";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="wrapper-content">
        <AppProviders>
          <AppHeader />
          {children}
        </AppProviders>
      </div>
      <LoadingModal />
      <AppFooter />
      <Notification />
    </>
  );
}
