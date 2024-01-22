import { ROUTES, USER } from "@/constants";
import Link from "next/link";
import LogoutComponent from "./logout";
import dynamic from "next/dynamic";
import styles from "../page.module.css";

const Navigate = ({ onLogout }: { onLogout: Function }) => (
    <nav className={styles.navigate}>
        <ul>
            <li><Link href="/">Home</Link></li>
            {!localStorage.getItem(USER.ACTIVE) && (
                <>
                    <li><Link href={ROUTES.PAGES.LOGIN}>Login</Link></li>
                    <li><Link href={ROUTES.PAGES.CREATE_ACCOUNT}>Create Account</Link></li>
                </>
            )}
            {localStorage.getItem(USER.ACTIVE) && (
                <>
                    <li><Link href={ROUTES.PAGES.FILES}>Files</Link></li>
                    <li><LogoutComponent onSubmit={() => { onLogout() }} /></li>
                </>
            )}
        </ul>
    </nav>
);


export default dynamic(() => Promise.resolve(Navigate), {
    ssr: false,
});