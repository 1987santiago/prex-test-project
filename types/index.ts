export interface UserDataProps {
    id: string;
    email: string;
    name: string;
    password: string;
}

export interface FileProps {
    author: string;
    name: string;
    filePath: string;
    size: number;
    viewers: Array<string>;
}