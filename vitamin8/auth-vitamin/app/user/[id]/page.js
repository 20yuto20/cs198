// app/user/[id]/page.js - TODO 4: Dynamic route page
export default async function UserProfile({ params }) {
    const { id } = await params
    return (
        <div style={{ maxWidth: '600px', margin: '100px auto', padding: '20px' }}>
            <h1>User Profile: {id}</h1>
        </div>
    )
}
