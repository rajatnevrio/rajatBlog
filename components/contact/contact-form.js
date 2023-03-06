import { useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";
// import { ReturnDocument } from "mongodb";
async function sendContactData(contactDetails) {
  //add client side validation
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}
function ContactForm() {
  const [eneteredEmail, setEnteredEmail] = useState("");
  const [eneteredName, setEnteredName] = useState("");
  const [eneteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
 
  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
        console.log("ReturnDocument");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();
    setRequestStatus("pending");
    try {
      await sendContactData({
        email: eneteredEmail,
        name: eneteredName,
        message: eneteredMessage,
      });
      setRequestStatus("success");
      setEnteredMessage("");
      setEnteredEmail("");
      setEnteredName("");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }
  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }
  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form}>
        <div className={classes.control}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={eneteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={eneteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id=" message"
            rows="5"
            value={eneteredMessage}
            required
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button onClick={(event) => sendMessageHandler(event)}>
            Send Message
          </button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
