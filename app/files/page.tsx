'use client'

import FilesList from '@/app/components/files-list';
import UploadFile from '@/app/components/upload-file';
import { useState, useEffect } from 'react';
import { FileProps } from '@/types';
import { USER, ROUTES } from '@/constants';
import styles from './page.module.css';

export default function Files() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getFiles();
    }, [])

    async function getFiles() {
        const res = await fetch(ROUTES.API.FILES);
        let files = await res.json();
        if (res.status === 400) {
            files = [];
            console.log('No files found. Please retry.');
        }
        console.log(files);
        setFiles(files);
    }

    async function uploadFile(file: File) {
        const formData = new FormData();
        formData.set('file', file);
        formData.set('author', (localStorage?.getItem(USER.ACTIVE) || ''));

        const res = await fetch(ROUTES.API.FILES, {
            method: 'POST',
            body: formData
        });
        getFiles();
    }

    async function deleteFile(file: FileProps) {
        console.log('Delete', file);
        const response = await fetch(ROUTES.API.FILES, {
            method: 'DELETE',
            body: JSON.stringify({
                file,
                currentUser: localStorage?.getItem(USER.ACTIVE) || ''
            })
        });
        const responseData = await response.json();
        console.log(responseData);
        getFiles();
    }

    async function shareFile({ file, viewers }: { file: FileProps, viewers: Array<string> }) {
        const response = await fetch(ROUTES.API.FILES, {
            method: 'PATCH',
            body: JSON.stringify({
                file,
                currentUser: localStorage?.getItem(USER.ACTIVE) || '',
                viewers
            })
        });
        const responseData = await response.json();
        console.log(responseData);
    }

    return (
        <main className={styles.main}>
            <UploadFile uploadFile={uploadFile} />
            <FilesList files={files} getFiles={getFiles} deleteFile={deleteFile} shareFile={shareFile} />
        </main>
    )
}
