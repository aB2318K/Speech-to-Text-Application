import Link from "next/link"
export default function Dashboard() {
    return(
         <div>
            This is where you will see your saved speeches
            <br/>
            <Link href="/create">Create New+</Link>
            <br/>
            <Link href="/collaborate">Collaborate</Link>
         </div>
    )
}