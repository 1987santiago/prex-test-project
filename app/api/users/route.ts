import { NextResponse, NextRequest } from 'next/server';
import path from 'path';
import fsPromises from 'fs/promises';
import fs from 'fs';
import { toJSON } from '@/app/utilities/adapters';

const mockedUsersPath = path.join(process.cwd(), 'public/mocks/users.json');

export async function GET() {
    try {
        if (!fs.existsSync(mockedUsersPath)) {
            fs.appendFileSync(mockedUsersPath, '[]');
        }
        const usersData = await fsPromises.readFile(mockedUsersPath, 'utf-8');
        const jsonUsersData = JSON.parse(usersData);

        return NextResponse.json(JSON.stringify(jsonUsersData, null, 4));
    } catch (error) {
        return new Response(
            JSON.stringify({ message: error.message }),
            {
                status: 404,
                headers: { 'content-type': 'application/json' }
            }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        if (!fs.existsSync(mockedUsersPath)) {
            fs.appendFileSync(mockedUsersPath, '[]');
        }
        const newUserData = await toJSON(request.body);
        const usersData = await fsPromises.readFile(mockedUsersPath, 'utf-8');
        const jsonDataList = JSON.parse(usersData);
        const { email, username, password } = newUserData;
        const userIndex = jsonDataList.findIndex((user: DataProps) => user.email === email);

        if (userIndex >= 0) {
            // Este usuario ya existe...
            return new Response(
                JSON.stringify({ message: 'This email is already registered' }),
                {
                    status: 409,
                    headers: { 'content-type': 'application/json' }
                }
            );
        }

        const newUser = {
            id: `uid_${jsonDataList.length + 1}`,
            email,
            name: username || email,
            password,
        };
        jsonDataList.push(newUser);

        const updatedData = JSON.stringify(jsonDataList);

        await fsPromises.writeFile(mockedUsersPath, updatedData);

        return new Response(
            JSON.stringify({
                message: 'User created successfully',
                user: newUser,
            }),
            { status: 201 }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ message: error.message }),
            {
                status: 404,
                headers: { 'content-type': 'application/json' }
            }
        );
    }
}

export async function PATCH(request: NextRequest) { }

export async function PUT(request: NextRequest) { }

export async function DELETE(request: NextRequest) { }