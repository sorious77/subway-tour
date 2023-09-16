import Container from "components/Container";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { fetchUserByEmail } from "queries/users";
import { QueryClient, dehydrate } from "react-query";

const Home = () => {
  const { data: session } = useSession();

  let user = session?.user?.user;

  return (
    <Container>
      <h1 className="mb-4 text-9xl">🚇</h1>
      {user && <div className="text-2xl">안녕, {user.nickname}!</div>}
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const email = session ? session.user.user.email : null;

  const queryClient = new QueryClient();
  context.res.setHeader("Cache-Control", "public, max-age=59");

  await queryClient.prefetchQuery(["user", email], async () =>
    fetchUserByEmail(email)
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
