// app/api/auth/user/route.js - TODO 10: Get user API route
import { supabase } from '../../../../lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ data })
}
