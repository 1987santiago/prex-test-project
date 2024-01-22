'use client';

import React, { useState } from 'react';

const UploadFile = ({ uploadFile }: { uploadFile: Function }) => {
    const [file, setFile] = useState();

    const onChange = (e): void => {
        setFile(e.target.files[0]);
    };

    const onSubmit = (e): void => {
        e.preventDefault();
        if (!file) { return };
        uploadFile(file);
    };

    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <legend>Upload File</legend>
                <div>
                    <label htmlFor='file'>Select file:</label>
                    <input type='file' onChange={onChange} name='file' id='file' />
                </div>
                <input type="submit" value="Upload" />
            </fieldset>
        </form>
    );
};

export default UploadFile;