import Image from "next/image";
import TweetDapp from "@/component/tweet_dapp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TweetDapp/>
    </main>
  );
}
