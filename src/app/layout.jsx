  import './globals.css';
  import { AuthProvider } from '../contexts/AuthContext';
  import Layout from '@/components/Layout';

  export const metadata = {
    title: 'TNB Mail',
    description: 'Internal mail app',
  };

  export default function RootLayout({ children }) {
    const handleSearch = (query) => {
      console.log('Search query:', query);
      // Implement search logic here if needed
    };

    return (
      <html lang="en">
        <body>
          <AuthProvider>
            <Layout>
              {children}
            </Layout>
          </AuthProvider>
        </body>
      </html>
    );
  }