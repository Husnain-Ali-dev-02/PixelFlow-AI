function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full h-auto">{children}</main>;
}
export default AppLayout;