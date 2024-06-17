import Formula from "@/components/Formula";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const Home = async () => {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center px-5 py-24 gap-10">
      <h1 className="font-bold text-lg">Formula input functionality</h1>
      <div className="flex flex-col gap-5 w-full max-w-[800px]">
        <ReactQueryProvider>
          <Formula />
        </ReactQueryProvider>
        <p className="text-sm text-center opacity-50 mt-10">
          Created by{" "}
          <a
            href="https://www.upwork.com/freelancers/svitlanaiordatii"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Svitlana Iordatii
          </a>
        </p>
      </div>
    </main>
  );
};

export default Home;
