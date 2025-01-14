import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllPostIds, getAllPostsData, getPostData } from "@/lib/posts";

export default function Post({ post }) {
    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <Layout title="{post.title}">
            <p className="m-4">
                {"ID: "}
                {post.id}
            </p>
            <p className="mb-8 text-xl font-bold">{post.title}</p>
            <p className="px-10">{post.body}</p>
            <Link href="/blog-page">
                <div className="flex cursor-pointer mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
                <span>Back to blog-page</span>
                </div>
            </Link>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const {post: post} = await getPostData(params.id);
    return {
        props: {
            post,
        },
    };
}