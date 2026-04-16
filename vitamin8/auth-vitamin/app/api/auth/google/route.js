// app/api/auth/google/route.js - TODO 13: Google OAuth API route
import { supabase } from '../../../../lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${request.nextUrl.origin}/dashboard`,
        },
    })

    if (error) {
        return NextResponse.json({ error }, { status: 400 })
    }

    // Redirect the user to the Google OAuth URL
    return NextResponse.redirect(data.url)
}
