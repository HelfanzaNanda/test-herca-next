import { getUserName } from "@/lib/authentication";

export default function page() {
    return (
        <div>Welcome {getUserName()}</div>
    )
}
