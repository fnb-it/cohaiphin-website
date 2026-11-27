import './globals.css';

export const metadata = {
  title: 'Cô Hai Phin Coffee — Một ly phin, một chuyện Việt',
  description: 'Khám phá cà phê Việt cùng Cô Hai Phin.',
  icons: { icon: '/assets/Logo_Do.svg' },
};

export const viewport = { themeColor: '#2d1b15' };

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
