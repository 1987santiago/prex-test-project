'use client';

import React, { useState } from 'react';
import { FileProps } from '@/types';

const FilesList = (
    {
        files,
        getFiles,
        deleteFile,
        shareFile,
    }:
        {
            files: Array<FileProps>,
            getFiles: Function,
            deleteFile: Function,
            shareFile: Function,
        }
) => {
    const [shareViewEnable, setShareViewEnable] = useState(false);
    const [currentFile, setCurrentFile] = useState();

    const shareFileHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const viewers = e.target.querySelector('#emails').value.split(',');
        shareFile({ file: currentFile, viewers })
        setShareViewEnable(false);
    };

    if (!files || files.length <= 0) {
        return (
            <>
                Empty List
                <button type='button' onClick={() => getFiles()}>Click to check for new files</button>
            </>
        )
    }
    return (
        <>
            <h2>Files List</h2>
            <ul>
                {
                    files.map((file, i) => (
                        <li key={file.name + i}>
                            <img src={file.filepath} alt={file.name} title={file.name} />
                            <span>{file.name}</span>
                            <div>
                                <button type="button" onClick={() => { deleteFile(file) }}>delete</button>
                                <button type="button" onClick={() => {
                                    setCurrentFile(file);
                                    setShareViewEnable(!!file)
                                }}>share</button>
                                <a href={window.location.origin + '/' + file.name} download>download</a>
                            </div>
                        </li>
                    ))
                }
            </ul>
            {shareViewEnable && (
                <aside>
                    <form onSubmit={shareFileHandler}>
                        <label htmlFor="emails">Share this file with:</label>
                        <span>(file: {currentFile?.name})</span>
                        <textarea id="emails" name="emails-list" placeholder='user@example.com, user2@example.com'></textarea>
                        <span>(insert user emails separated by commas)</span>
                        <input type="submit" value="Share" />
                    </form>
                </aside>
            )}
        </>
    );
};

export default FilesList;