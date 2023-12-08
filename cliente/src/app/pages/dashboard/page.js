import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListUser from "@/app/components/ListUser";


export default async function Dashboard() {
    const users = await getUsers();
    return (
        <div>
                    <h1>Dashboard</h1>
            <Suspense fallback={<p>carregando...</p>}>
                 <ListUser users={users}/>
            </Suspense>     
        </div>
    );
};