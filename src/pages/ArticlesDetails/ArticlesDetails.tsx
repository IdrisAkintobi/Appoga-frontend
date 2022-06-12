import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import styles from "./ArticlesDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import calender from "../../assets/image/calender.png";
import articlesDetailsImage from "../../assets/image/articleDetailsImage.png";
import fb from "../../assets/image/fb.png";
import twitter from "../../assets/image/twitter.png";
import share from "../../assets/image/share.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader"

interface Article {
  title: string;
  message: string;
  _id: string;
  category: string;
  summary: string;
  createdAt: string;
}

interface Comment {
  name: string;
  email: string;
  comment: string;
  date: string;
}

const initialValue = {
  title: "",
  message: "",
  _id: "",
  category: "",
  summary: "",
  createdAt: "",
};

const inputData = {
  username: "",
  email: "",
  comment: "",
  date: "",
};

const ArticlesDetails = () => {
  const [articleData, setArticleData] = useState<Article>(initialValue);
  const [comments, setComment] = useState(inputData);
  const [userComment, setUserComment] = useState([]);
  const [loading, setLoading] = useState(true);

  // get /blog:id from request parameters
  const { id } = useParams();

  // handlechange change event
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setComment({
      ...comments,
      [e.target.name]: value,
    });
  };

  // fetch article data from backend
  const getArticleData = async () => {
    const response = await axios(`https://appoga.herokuapp.com/blog/${id}`);
    setLoading(false)
    setArticleData(response.data);
  };

  // convert Date from ISOstring to date string
  const { createdAt } = articleData;
  const createDate = new Date(createdAt).toDateString();

  // function to post data to backend
  const postComment = async () => {
    const userData = {
      name: comments.username,
      email: comments.email,
      comment: comments.comment,
      date: new Date().toDateString(),
    };
    const response = await axios.post(
      `https://appoga.herokuapp.com/blog/comment/${id}`,
      userData
    );

    // define success and error messages
    if (response.status === 200) {
      
      toast.success("comments posted");
      setComment(inputData);
    } else {
      toast.error("an error occured");
    }
  };

  // handle submit events
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, comment } = comments;

    if (!username || !email || !comment) {
      toast.error("please complete all fields");
    } else {
      await postComment();
    }
  };

  const getComments = async () => {
    const response = await axios(`https://appoga.herokuapp.com/blog/${id}`);
    setUserComment(response.data.comments);
  };

  useEffect(() => {
    getArticleData();
  }, []);

  useEffect(() => {
    getComments();
  }, []);

  

  return (
    <div className={styles.main}>
      {
          loading ? <div className={styles.loading}> <Loader /></div>  : <div className={styles.container}>

        {/*main article   */}
          <section className={styles.articleDataContainer}>
            <div className={styles.articlesDataHeader}>
              <h2>{articleData.title}</h2>
              <div className={styles.date}>
                <img src={calender} alt="" />
                <h5>{createDate}</h5>
              </div>
            </div>
  
            <div className={styles.articleImage}>
              <img src={articlesDetailsImage} alt="" />
            </div>
            <div className={styles.articleText}>
              <p>{articleData.message}</p>
            </div>
            <div className={styles.socialLinks}>
              <img src={fb} alt="facebook" />
              <img src={twitter} alt="twitter" />
              <img src={share} alt="share" />
            </div>
          </section>
  
  {/* user comments */}
          <section className={styles.usercommentsContainer}>
            <div className={styles.commentHeader}>
              <h3>Comments({!userComment ? 0 : userComment.length})</h3>
            </div>
            {!userComment ? (
              <div className={styles.noComment}>No Comments</div>
            ) : (
              userComment.map((comment: Comment, index) => {
                return (
                  <div className={styles.usercomments} key={index}>
                    <div className={styles.userCommentHeader}>
                      <h5>{comment.name}</h5>
                      <h5>{comment.date}</h5>
                    </div>
                    <hr />

                    <p>{comment.comment}</p>
                  </div>
                );
              })
            )}
          </section>
  
  
  {/* related articles */}
          <section className={styles.relatedArticlesContainer}>
            <h2></h2>
            <div className={styles.relatedImages}>
              <div>
                <img src="" alt="" />
                <p></p>
              </div>
  
              <div>
                <img src="" alt="" />
                <p></p>
              </div>
  
              <div>
                <img src="" alt="" />
                <p></p>
              </div>
            </div>
            <p></p>
          </section>
  
  {/* comments section */}
          <section className={styles.commentsContainer}>
            <div className={styles.commentHeader}>
              <h2>Comments</h2>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.nameEmail}>
                <input
                  type="text"
                  placeholder="Name"
                  name="username"
                  value={comments.username}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={comments.email}
                  onChange={handleChange}
                />
              </div>
  
              <input
                type="text"
                placeholder="Add a comment here..."
                name="comment"
                value={comments.comment}
                onChange={handleChange}
              />
              <button type="submit">Send</button>
            </form>
            <ToastContainer />
          </section>
        </div>
          
        }
      
    </div>
  );
};

export default ArticlesDetails;
