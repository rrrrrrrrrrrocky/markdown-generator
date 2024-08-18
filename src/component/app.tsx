import { initializeGlobalApp } from "@/app-initializer";
import HomeContainer from "./home-container/home-container";

import { createTheme, MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import supabase from "@/script/util/supabase";
import { Session } from "@supabase/supabase-js";

const theme = createTheme({
  /** Put your mantine theme override here */
});

initializeGlobalApp();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  console.log("session >>>", session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session || session.user.email !== "rrrrrrrrrrrocky@gmail.com") {
        supabase.auth.signInWithOAuth({
          provider: "google",
        });
        return;
      }
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <div>Loading...</div>;
  } else if (session.user.email !== "rrrrrrrrrrrocky@gmail.com") {
    return <div>Access denied!</div>;
  } else {
    return (
      <MantineProvider theme={theme}>
        <HomeContainer />
      </MantineProvider>
    );
  }
};

export default App;
