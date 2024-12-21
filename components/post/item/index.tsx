"use client";

import React from "react";
import {
    RiRepeat2Fill,
} from "@remixicon/react";
import Link from "next/link";
import {Post} from "@/types/api-responses/post/single";
import PostActions from "./action-bar";
import PostItemBody from "./body";
import {formatRelativeDate} from "@/lib/format";

type Props = {
    data: Post;
};

function PostItem({data}: Props) {
    return (
        <Link className='py-4' href="/users/[username]/posts/[postId]" as={`/users/${data.user.username}/posts/${data.id}`}>
            <div className="py-4 border-b">
                {data.isReposted && (
                    <div className="pl-8 text-xs text-muted-foreground inline-flex items-center gap-2">
                        <RiRepeat2Fill className="w-4 h-4 text-muted-foreground"/>
                        <p>
                            <Link
                                className="font-bold hover:underline"
                                href='/users/[username]'
                                as={`/users/${data.repostedBy.id}`}
                            >
                                {data.repostedBy.username}
                            </Link>
                            &nbsp; reposted {formatRelativeDate(new Date(data.repostedAt))}
                        </p>
                    </div>
                )}

                <PostItemBody data={data} showReplyBar={false} showMenu/>
                {data.quotePost && (
                    <div className="ml-12 p-4 border border-muted my-2 rounded-md relative">
                        <Link
                            href="/users/[username]/posts/[postId]"
                            as={`/users/${data.quotePost.user.username}/posts/${data.quotePost.id}`}
                            className="absolute inset-0 w-full h-full"
                        />
                        <PostItemBody data={data.quotePost} isQuoted/>
                    </div>
                )}
                <div className="flex items-center gap-3">
                    <div className="flex justify-center items-center h-full w-9">
                        {/*
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="size-6 bg-muted grid place-items-center rounded-full border border-muted-foreground/10">
                      <RiBarChartHorizontalLine className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="inline-flex items-center gap-x-2">
                    {data.replies[0].poll && (
                      <>
                        <RiBarChartHorizontalLine className="w-3 h-3 text-muted-foreground" />
                        <p>
                          Replied this post with a&nbsp;
                          <span className="font-bold">poll</span>
                        </p>
                      </>
                    )}
                    {data.replies[0].media &&
                      data.replies[0].media.length > 0 && (
                        <>
                          <RiImage2Line className="w-3 h-3 text-muted-foreground" />
                          <p>
                            Replied this post with a&nbsp;
                            <span className="font-bold">media</span>
                          </p>
                        </>
                      )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            */}
                    </div>
                    <PostActions
                        data={data}
                        counts={{
                            likes: data.likesCount,
                            replies: data.repliesCount,
                            reposts: data.repostCount,
                        }}
                        postId={data.id}
                    />
                </div>
            </div>
        </Link>
    );
}

export default PostItem;
