import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

export const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const verifyTmanager = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/v1/match/veryfyTmanager",
            {
              tmanagerid: localStorage.getItem("tmanagerid"),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log("You Are Autherized !!");
          console.log("gg", response.data);
          //   if (response.data !== "you are verified") {
          //     router.push('/login');
          //   }
        } catch (error) {
          console.error(error);
          router.push("/login");
        }
      };
      verifyTmanager();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};