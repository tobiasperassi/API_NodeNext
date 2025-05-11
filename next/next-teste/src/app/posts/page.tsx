import Link from "next/link";

export interface PostProps {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface ResponseProps{
    posts: PostProps[]
}

export default async function Postspage() {
    const response = await fetch('https://dummyjson.com/posts')
    const data: ResponseProps = await response.json()
    
    async function handleFetchPosts() {
        'use server'
        const response = await fetch('https://dummyjson.com/posts')
        const data: ResponseProps = await response.json()

        console.log(data.posts);
    }

    async function handleSearchUsers(formData: FormData) {
        'use server'

        const userId = formData.get('userId') //formData está atrelada ao "name" do form, ou seja, irá retornar o userId
        console.log(userId)

        const response = await fetch(`https://dummyjson.com/posts/user/${userId}`)
        const data: ResponseProps  = await response.json()

        console.log(data)
    }

    return(
        <div>
            <h1 className="text-center mt-5 mb-2 font-bold text-3xl">
                Todos os Posts
            </h1>
        
            <button onClick={handleFetchPosts}>Buscar Posts</button>

            <form 
                action={handleSearchUsers}
                className="flex gap-2 my-4
                ">

                <input 
                    type="text"
                    placeholder="ID do usuário"
                    className="border border-gray-200 p-2"    
                    name="userId"
                />
                <button
                    className="bg-blue-500 text-white p-2"
                    type="submit"
                >
                    Buscar Usuário
                </button>        
            </form>

            <div className="flex flex-col mx-2 gap-4">
                {data.posts.map(post =>
                    <div key={post.id} className="bg-gray-200 -4 rounded-md">
                        <h2 className="font-bold">{post.title}</h2>
                        <p>{post.body}</p>
                        <Link className="text-blue-500" href={`/posts/${post.id}`}>Acessar detalhes</Link>
                    </div>
                )}
            </div>
        </div>
    )
}