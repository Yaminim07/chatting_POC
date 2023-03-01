import logo from "./logo.svg";
import "./App.css";
import { ZIM } from "zego-zim-web";
import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useJsApiLoader } from "@react-google-maps/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import GoogleMapComponent from "./Components/GoogleMapComponent";

ZIM.create({
  appID: 1928975649,
  // appSign: 'fc871f0a1f6df0eadb39956c6d7b9dfd75ff92dc0df7e9844acf40345c6689ae',
});
let zim = ZIM.getInstance();

function App() {
  const [recievedMessage, setReceivedMessage] = useState("");
  const [text, setText] = useState("");

  const pdfRef = useRef();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const handleTextChange = (e) => {
    let value = e.target.value;
    setText(value);
  };

  useEffect(() => {
    loginUser();
  }, []);

  const sendMessage = () => {
    let messageTextObj = { type: 1, message: text };
    let toUserID = "1234";
    let config = {
      priority: 1, // Set priority for the message. 1: Low (by default). 2: Medium. 3: High.
    };
    var type = 0; // Session type. Values are: 0: One-on-one chat.  1: Chat room  2: Group chat.
    var notification = {
      onMessageAttached: function (message) {
        // todo: Loading
        // alert('sending message:', message);
      },
    };
    zim
      .sendMessage(messageTextObj, toUserID, type, config, notification)
      .then(function ({ message }) {
        // Message sent successfully.
        // alert('message sent:', message);
      })
      .catch(function (err) {
        // Failed to send the message.
        // alert('sending failed');
        console.log("sending failed", err);
      });
      const input = document.getElementById('divToPrint');
      console.log(input);
      console.log(pdfRef.current);
  };

  const loginUser = () => {
    let userInfo = { userID: "123", userName: "Yaminim" };
    let token =
      "04AAAAAGP+2goAEG15ajhrdXV5aHlmNTN6NzUAoFCXDpipDpe9ZXzK0gLPoSUDIUx4PpQPkECMRA5SBiiZtS+35fojiyJ+p+attHKifMUAsBrn/elq+E42gQc9/1SxQJ5bFz7w4MKzxkpQK3z44AKgZQMOZnh+uJi4SHlt2c37VMuBuePYLgeNf9Zl0i3q7PQO3oiLZON9IDGQuy3w7Wx/VxMAlI44eQ0OJtJJOyK0Lb/3IFvuHudAJW3G540=";
    zim
      .login(userInfo, token)
      .then(function () {
        // Login successful.
        console.log("login successful");
        zim.on(
          "receivePeerMessage",
          function (zim, { messageList, fromConversationID }) {
            console.log("receivePeerMessage", messageList, fromConversationID);
            let newMsgString = "";
            messageList.map((item) => {
              newMsgString = item.message;
            });
            setReceivedMessage(newMsgString);
          }
        );
      })
      .catch(function (err) {
        // Login failed.
        console.log("user login unsuccess");
      });
  };

  // const printDocument= () => {
  //   const jsPdf = new jsPDF({
  //     orientation: "landscape",
  //     unit: "in",
     
  //   });
  //   html2canvas(pdfRef.current)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL("image/jpeg", 1.0);  
  //       // console.log(ImageData);     
  //       jsPdf.addImage(imgData, 'JPEG', 0, 0);
  //       jsPdf.save("download.pdf");
  //     })
  //   ;
  // }
  const handleGeneratePdf = () => {
		const doc = new jsPDF('l', 'pt', [ 1080 , 1920]);
		doc.setFont('Inter-Regular', 'normal');
		doc.html(pdfRef.current, {
			async callback(doc) {
				await doc.save('document');
			},
		});
	};

  if (!isLoaded) {
    return <div>loading...</div>;
  }

  return (
    <div className="App">
      <Button onClick={handleGeneratePdf}>Generate Pdf</Button>
      <div ref={pdfRef}>
        <div style={{ margin: 20 }}>
          <TextField
            id="outlined-basic"
            placeholder="Type here"
            variant="outlined"
            value={text}
            onChange={handleTextChange}
          />
        </div>
        <Button variant="outlined" onClick={sendMessage}>
          Send Message
        </Button>
        <p>{recievedMessage}</p>

        <GoogleMapComponent />
      </div>
    </div>
  );
}

export default App;
