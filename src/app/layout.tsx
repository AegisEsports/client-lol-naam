import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className='h-full bg-white dark:bg-gray-900 text-black dark:text-white'>
      <body className='h-full'>
        <main className='h-full'>{children}</main>
      </body>
    </html>
  );
}
