import PostForm from "@/components/post-form";
import PostItem from "@/components/post-item";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-5">
      <PostForm />
      <PostItem />
    </div>
  );
}
