// app/page.js - TODO 12: Home page (Server Component) that imports AuthStatus (Client Component)
import AuthStatus from './components/AuthStatus'

export default function HomePage() {
    return (
        <div style={{ maxWidth: '600px', margin: '100px auto', padding: '20px' }}>
            <h1>Welcome to AuthVitamin</h1>
            <p>This text was rendered on the server instantly.</p>

            {/* This interactive part is a client component */}
            <AuthStatus />
        </div>
    )
}
