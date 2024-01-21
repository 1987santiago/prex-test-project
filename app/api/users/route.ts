import { NextResponse, NextRequest } from 'next/server';
import path from 'path';
import fsPromises from 'fs/promises';

const mockedUsersPath = path.join(process.cwd(), 'public/mocks/users.json');

export async function GET() {
    try {
        const usersData = await fsPromises.readFile(mockedUsersPath, 'utf-8');
        const jsonUsersData = JSON.parse(usersData);
        return NextResponse.json(JSON.stringify(jsonUsersData, null, 4));
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'No data found' }),
            {
                status: 404,
                headers: { 'content-type': 'application/json' }
            }
        );
    }
}

export async function POST(request: NextRequest) { }

export async function PATCH(request: NextRequest) { }

export async function PUT(request: NextRequest) { }

export async function DELETE(request: NextRequest) { }