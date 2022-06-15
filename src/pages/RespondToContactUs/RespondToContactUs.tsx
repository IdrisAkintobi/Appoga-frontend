import Chatbox from "../../components/admin_chatbox/Chatbox";
const data = {
  name: "Benedict",
  message: "This is dummy message to text the rendering of this object",
};
const RespondToContactUs = () => {
  return <Chatbox data={data} />;
};

export default RespondToContactUs;
