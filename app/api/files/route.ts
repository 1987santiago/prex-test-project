import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { FileProps } from '@/types';

const mockedFilesDataPath = path.join(process.cwd(), 'public/mocks/files-manifest.json');
const mockedUserDataPath = path.join(process.cwd(), 'public/mocks/user.json');

export async function GET() {
    try {
        if (!fs.existsSync(mockedFilesDataPath)) {
            fs.appendFileSync(mockedFilesDataPath, '[]');
        }
        const filesData = await fsPromises.readFile(mockedFilesDataPath, 'utf-8');
        const currentUserData = await fsPromises.readFile(mockedUserDataPath, 'utf-8');
        const filesList = JSON.parse(filesData);
        const currentUser = JSON.parse(currentUserData);

        const allowedFilesList = filesList.filter((file: FileProps) => {
            const isOwner = (file.author === currentUser.email);
            const isViewer = (file.viewers?.includes(currentUser.email));
            return (isOwner || isViewer);
        }) || [];

        return new Response(JSON.stringify(allowedFilesList));
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'No data found' }),
            {
                status: 404,
                headers: { 'content-type': 'application/json' }
            }
        );
    }
}

export async function PATCH(request: Request) {
    const filesData = await fsPromises.readFile(mockedFilesDataPath, 'utf-8');
    const filesList = JSON.parse(filesData);
    const { file, currentUser, viewers } = await request.json();
    const { author, name, filepath } = file;
    const fileIndex = filesList.findIndex((fileData: FileProps) => fileData.name === name);
    const fileToUpdate = filesList[fileIndex];

    if (fileToUpdate.author !== currentUser) {
        return new Response(
            JSON.stringify({ message: '[Unauthorized action] - you must be the owner of the file to update it' })
        );
    }

    fileToUpdate.viewers = viewers;

    filesList[fileIndex] = fileToUpdate;
    const updatedFilesList = JSON.stringify(filesList);

    await fsPromises.writeFile(mockedFilesDataPath, updatedFilesList);

    return new Response(
        JSON.stringify({ message: 'The file was update correctly' }),
        {
            status: 200,
            headers: { 'content-type': 'application/json' }
        }
    )
}

export async function POST(request: Request) {

    const data = await request.formData();
    const file: FileProps = data.get('file');
    const author = data.get('author');

    const bytes = await file?.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), 'public', file?.name);

    const filesData = await fsPromises.readFile(mockedFilesDataPath, 'utf-8');
    const filesList = JSON.parse(filesData);
    const fileIndex = filesList.findIndex((fileData: FileProps) => fileData.name === file.name);

    if (fileIndex >= 0) {
        return new Response(JSON.stringify({
            message: 'File already exists',
        }));
    }

    const dataFile = {
        name: file.name,
        size: file.size,
        filePath,
        author,
    };
    filesList.push(dataFile);
    const updatedFileList = JSON.stringify(filesList);
    await fsPromises.writeFile(mockedFilesDataPath, updatedFileList);

    await fsPromises.writeFile(filePath, buffer);

    return new Response(JSON.stringify({ message: 'Saved file' }));
}

export async function DELETE(request: Request) {
    const filesData = await fsPromises.readFile(mockedFilesDataPath, 'utf-8');
    const filesList = JSON.parse(filesData);
    const { file, currentUser } = await request.json();
    const { author, name, filePath } = file;
    const fileIndex = filesList.findIndex((fileData: FileProps) => fileData.name === name);
    const fileToDelete = filesList[fileIndex];

    if (fileToDelete.author !== currentUser) {
        return new Response(
            JSON.stringify({ message: '[Unauthorized action] - you must be the owner of the file to delete it' })
        );
    }

    filesList.splice(fileIndex, 1);
    const updatedFilesList = JSON.stringify(filesList);

    await fsPromises.writeFile(mockedFilesDataPath, updatedFilesList);
    await fsPromises.rm(filePath);

    return new Response(
        JSON.stringify({ message: 'The file was deleted correctly' }),
        {
            status: 200,
            headers: { 'content-type': 'application/json' }
        }
    )
}