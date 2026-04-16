// app/layout.js - TODO 1: Root layout with navigation bar
import Link from 'next/link'
import './globals.css'

export const metadata = {
    title: 'Auth Vitamin',
    description: 'Next.js + Supabase Auth',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
                <nav style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '15px 30px',
                    backgroundColor: '#333',
                    color: 'white'
                }}>
                    <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                    <Link href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
                    <Link href="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                </nav>
                {children}
                <footer style={{ padding: '15px 30px', backgroundColor: '#eee', textAlign: 'center', marginTop: 'auto' }}>
                    Auth Vitamin &copy; 2026
                </footer>
            </body>
        </html>
    )
}
