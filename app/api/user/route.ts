import fsPromises from 'fs/promises';
import path from 'path';
import { toJSON } from '@/app/utilities/adapters';

const mockedUserPath = path.join(process.cwd(), 'public/mocks/user.json');

export async function POST(request: Request) {
    const { name, email } = await toJSON(request.body);

    const currentUserStr = JSON.stringify({
        id: `uid_${name}`,
        email,
        name: name || email,
    });

    await fsPromises.writeFile(mockedUserPath, currentUserStr);
    return new Response(JSON.stringify({ message: 'Saved' }));
}


export async function DELETE(request: Request) {
    await fsPromises.writeFile(mockedUserPath, '{}');
    return new Response(JSON.stringify({ message: 'Deleted' }));
}