import articleStyle from "./Articles.module.css";
import TopStories from "../../components/Articles/TopStories";
import Categories from "../../components/Articles/Categories";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const options = {
  method: "GET",
  url: "https://appoga.herokuapp.com/blog",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0c2VydmljZS5saXZlcHJvamVjdEBnbWFpbC5jb20iLCJpYXQiOjE2NTQ3ODgzNjJ9.aW2pTAna5Se8dKReZeSkCejkJAeIKxJjGayalFP4Wcc",
  },
};

type iniValue = {
  _id: string;
  title: string;
  message: string;
  description: string;
  summary: string;
  category: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

const Article = () => {
  const [data, setData] = useState<Array<iniValue>>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request(options);
        if (response.status === 200) {
          setIsLoading(false);
        }
        setData(response.data);

        console.log(data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const loading = (
    <div className={articleStyle.spinner}>
      <Loader />
    </div>
  );
  const actualRender = (
    <>
      <div className={articleStyle.hero}>
        <div className={articleStyle.hero_text}>See what is going on</div>
      </div>
      <TopStories data={data} />
      <Categories data={data} />
    </>
  );
  return <>{isLoading ? loading : actualRender}</>;
};

export default Article;
