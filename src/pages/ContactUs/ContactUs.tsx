import React, { useState,FormEvent } from 'react';
import style from "./ContactUs.module.css";
import phoneImg from '../../assets/images/contactUs/phone.png'
import address from "../../assets/images/contactUs/address.png";
import NGNflag from "../../assets/images/contactUs/Nigeriaflag.png";
import CADflag from "../../assets/images/contactUs/Canadaflag.png";
import contactImg from '../../assets/images/contactUs/contact.jpeg'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  
 

  
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          let res = await fetch("https://appoga.herokuapp.com/contact_us", {
            method: "POST",
            body: JSON.stringify({
              name: name,
              email: email,
              phone: phone,
              message: message
            }),
            mode:'cors',
            headers: { 'Content-Type': 'application/json' },
          });
           const data = await res.json();
           console.log(data)

          if (res.status === 200) {
            setName("");
            setEmail("");
            setMessage("")
            setPhoneNumber("");
            toast.success("Thanks for reaching out, we will get back to you soon!");
            
          } else {
            toast.error("Please complete all fields"); 
          }
        } catch (err) {
          console.log(err);
        }
  }


  return (
    <div className={style.ContactUsBody}>
      
     <section >
       <div className={style.top}>
          <div className={style.topText}>
           <p>Let us help you build your online presence</p> 
          </div>
          <div className={style.topImg}>
            <img src={contactImg} alt="contact" />
          </div>
       </div>  
       <div className={style.helpLine}>
       <div className={style.helpLine_NGN}>
            <div className={style.flagNGN}>
              <img src={NGNflag} alt="nigerian flag"  />  
            </div>
            <h3>Nigeria</h3>
            <div>
                <div className={style.content}>
                  <img src={phoneImg} alt="phone" />
                  <p>(+234) 9138911913</p>
                </div>
                <div className={style.content}>
                  <img src={address} alt="address" />
                  <p>Block 308 DBM Plaza, Wuse Zone 1, Abuja</p>
                </div>
            </div>
            

       </div>


       <div className={style.helpLine_CAD}>
            <div className={style.flagCAD}> 
                <img src={CADflag} alt="canadian flag"  />  
            </div>

            <h3>Canada</h3>
            <div>
                <div className={style.content}>
                  <img src={phoneImg} alt="phone" />
                  <p>(+234) 9138911913</p>
                </div>
                <div className={style.content}>
                  <img src={address} alt="address" />
                  <p>Block 308 DBM Plaza, Wuse Zone 1, Abuja</p>
                </div>
            </div>
            
       </div>

     </div>
     </section>

     <section className={style.middle}>
          <div className={style.container}>
              <div className={style.middleHeader}>
                    <h2>Contact Us</h2>
                    <p>Send us an enquiry with your details and we will reach out to you</p>
              </div>

              <div className={style.form_container}>

                  <form onSubmit ={handleSubmit}>
                  <div className={style.namePhone}>
                        <input 
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />

                        <input 
                        type="text" 
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                  </div>
                 

                  <input 
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                 <div className={style.wrapper}>
                 
                 <textarea 
                 className={style.textareaMessage} 
                 placeholder="Message"
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 
                 ></textarea>
                 </div>
                 <button type="submit" className={style.button}>Send Enquiry</button>
                 {/* {alert &&  <div className={style.reply}><p>{reply}</p></div> }  */}
                
                </form>
              </div>
          </div>          
     </section>
     <ToastContainer />
    </div>
  )
}

export default ContactUs