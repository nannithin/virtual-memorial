import ProfClient from "@/components/proj/singleprof";
import axios from "axios";

async function getOne(id) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getone/${id}`);
  return res.data;
}

export async function generateStaticParams() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getallpub`);
  const posts = res.data;
  return posts.map((post) => ({ slog: post._id.toString() }));
}

const Prof = async ({ params }) => {
  const { slog } = await params;
  const post = await getOne(slog);

  return <ProfClient post={post} />;
};

export default Prof;
