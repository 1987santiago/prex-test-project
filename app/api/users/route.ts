import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
    return new Response(
        JSON.stringify({ message: '[GET] - ok' })
    );
}

export async function POST(request: NextRequest) { }

export async function PATCH(request: NextRequest) { }

export async function PUT(request: NextRequest) { }

export async function DELETE(request: NextRequest) { }