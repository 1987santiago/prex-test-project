'use client';

import React, { useState } from 'react';
import { FileProps } from '@/types';
import styles from '../files/page.module.css';

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
        <section>
            <h3>Files List</h3>
            <ul className={styles.list}>
                {
                    files.map((file, i) => (
                        <li key={file.name + i}>
                            <div className={styles.fileInfo}>
                                <span className={styles.fileName}>Name: {file.name}</span>
                                <span className={styles.fileAuthor}>Author: {file.author}</span>
                                <span className={styles.fileViewers}>Viewers: {file.viewers?.toString()}</span>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.deleteBtn} type="button" onClick={() => { deleteFile(file) }}>delete</button>
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
                <aside className={styles.share}>
                    <h4>Share file - {currentFile?.name}</h4>
                    <form onSubmit={shareFileHandler}>
                        <label htmlFor="emails">Share this file with: </label>
                        <textarea id="emails" name="emails-list" placeholder='user@example.com,user2@example.com'></textarea>
                        <span>(insert user emails separated by commas, without spaces)</span>
                        <input type="submit" value="Share" />
                    </form>
                    <span className={styles.x} onClick={() => setShareViewEnable(!shareViewEnable)}>x</span>
                </aside>
            )}
        </section>
    );
};

export default FilesList;