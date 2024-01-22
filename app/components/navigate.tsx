import { USER } from "@/constants";
import Link from "next/link";
import LogoutComponent from "./logout";
import dynamic from "next/dynamic";
import styles from "../page.module.css";

const Navigate = () => (
    <nav className={styles.navigate}>
        <ul>
            <li><Link href="/">Home</Link></li>
            {!localStorage.getItem(USER.ACTIVE) && (
                <>
                    <li><Link href="pages/login">Login</Link></li>
                    <li><Link href="pages/create-account">Create Account</Link></li>
                </>
            )}
            {localStorage.getItem(USER.ACTIVE) && (
                <>
                    <li><Link href="/pages/files">Files</Link></li>
                    <li><LogoutComponent onSubmit={() => { localStorage.clear() }} /></li>
                </>
            )}
        </ul>
    </nav>
);


export default dynamic(() => Promise.resolve(Navigate), {
    ssr: false,
});