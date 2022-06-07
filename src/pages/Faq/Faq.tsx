import React, { useState, FormEvent } from "react";
import Accordion from "../../components/Accordion/Accordion";
import image from "../../assets/images/Faqs/contact-illustration1.jpg";
import faqCss from "./faq.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Faqs = () => {
  const [question, setQuestion] = useState("");
  const notify = () => toast.success("Question sent successfully");

  const postQuestion = async () => {
    try {
      const response = await axios.post("https://appoga.herokuapp.com/newfaq", {
        questions: question,
      });
      console.log(response);
      toast.success("Question posted successfully");
    } catch (error) {
      if (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postQuestion();
    console.log(question);
    setQuestion("");
  };

  return (
    <section className={faqCss.main_container}>
      <div className={faqCss.faqContainer}>
        <div className={faqCss.purpleBg}>Got a Question?</div>
        <img className={faqCss.faqImage} src={image} alt="" />
      </div>
      <h3 className={faqCss.frequentlyAskedQuestions}>
        Frequently asked questions
      </h3>
      <Accordion data={"data"} />
      <Accordion data={"data"} />
      <Accordion data={"data"} />
      <Accordion data={"data"} />

      <h3 className={faqCss.anotherQuestionHeader}>Still have A question?</h3>
      <div className={faqCss.formDiv}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your question"
            className={faqCss.questionInput}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            type="submit"
            value="send"
            className={faqCss.questionButton}
            // onClick={notify}
          />
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Faqs;

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="faqs">
<h3>Frequently asked questions</h3>
<div className="faq-question">question</div>
<div className="faq-answer">
  In publishing and graphic design, Lorem ipsum is a placeholder text
  commonly used to demonstrate the visual form of a document or a
  typeface without relying on meaningful content. In publishing and
  graphic design, Lorem ipsum is a placeholder text commonly used to
  demonstrate the visual form of a document or a typeface without
  relying on meaningful content.
</div>
</div> */
}
