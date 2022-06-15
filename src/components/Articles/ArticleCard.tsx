import { FaCalendarMinus, FaArrowRight } from "react-icons/fa";
import cardStyle from "./ArticleCard.module.css";
import { Link } from "react-router-dom";
type PropsType = {
  data: {
    _id: string;
    title: string;
    message: string;
    summary: string;
    username: string;
    category: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
};
const ArticleCard: React.FC<PropsType> = ({
  data: { category, description, createdAt },
}) => {
  //Convert date
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <div className={cardStyle.card}>
        <div className={cardStyle.card_img}>
          <img src={"./sample.png"} alt="logo" />
        </div>
        <div className={cardStyle.card_content}>
          <button className={cardStyle.card_button}>{category}</button>
          <div className={cardStyle.card_text}>{description}</div>
        </div>
        <div className={cardStyle.card_base}>
          <div className={cardStyle.left_base}>
            <FaCalendarMinus
              className={`${cardStyle.base_icon} ${cardStyle.calendar_icon}`}
            />
            {date}
          </div>

          <div className={cardStyle.right_base}>
            <Link to={""}>
              Read more
              <FaArrowRight color="#fff" className={cardStyle.base_icon} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
