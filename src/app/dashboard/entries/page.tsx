import EntriesList from "@/components/EntriesList"
import {getUserFromServer} from "@/lib/auth"
import {getEntries} from "@/lib/getEntries"

export default async function Page() {
    const user = await getUserFromServer()
    if (!user) {
        console.error("Please sign in")
        return
    }
    const data = await getEntries(user.id)

    return <EntriesList entries={data.entries}/>
}
