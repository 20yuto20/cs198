// app/api/auth/login/route.js - TODO 8: Login API route
import { supabase } from '../../../../lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
    const { email, password } = await request.json()

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
        return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ data })
}
