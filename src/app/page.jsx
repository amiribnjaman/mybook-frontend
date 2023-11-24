import Image from 'next/image'
import Stories from '@/components/stories'
import Feed from "@/components/feed";

export default function Home() {
  return   (
    <main className=" min-h-screen flex-col w-2/4">
      {/*=====STORIES======*/}
      {/* <Stories /> */}
      {/*====FEED=========*/}
      <Feed />
    </main>
  )
}
