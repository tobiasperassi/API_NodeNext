import { PostProps } from '../page'

export default async function DatailPost({
    params
}: {
    params: { id: string }
}) {
    const { id } = params;

    const response = await fetch(`https://dummyjson.com/posts/${id}`)
    const data: PostProps = await response.json()

    return (
        <div>
            <h1>Detalhes do post: {id}</h1>

            <h2>{data.title}</h2>
            <p>{data.body}</p>
        </div>
    );
}
