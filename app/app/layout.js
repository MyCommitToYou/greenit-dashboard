import './globals.css';

export const metadata = {
  title: 'GreenIT Analytics',
  description: 'Track and reduce your IT carbon footprint',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
