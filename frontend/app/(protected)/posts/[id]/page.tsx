import PostDetailClient from './PostDetailClient';

export default function Page({ params }: { params: { id: string } }){
  return <PostDetailClient postId={params.id} />;
}
