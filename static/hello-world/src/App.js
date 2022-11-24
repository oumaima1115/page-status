import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';


function App() {
  let [data, setData] = useState(null);

  useEffect(() => {
    invoke('getText').then((response)=> {
      setData(response);
      console.log("response:", response);
    });
  }, []);

  let text = data != null ? data.text : null;
  let width = data != null ? data.width : null;
  let status = data != null ? data.status : null;

  let etat;
  switch(status){
    case "DRAFT": etat=<><img id="image1" src=".\images\draft.png"/><style jsx>{`body{border-left: 5px solid gray;} #composant{background-color: gray;}`}</style></>; break;
    case "ACTION REQUIRED": etat=<><img id="image1" src=".\images\required.png"/><style jsx>{`body{border-left: 5px solid rgb(59, 115,175);}#composant{background-color: rgb(59, 115,175);}`}</style></>; break;
    case "OFFICIAL": etat=<><img id="image1" src=".\images\success.png"/><style jsx>{`body{border-left: 5px solid green;} #composant{background-color: green;}`}</style></>; break;
    case "OUTDATED": etat=<><img id="image1" src=".\images\outdated.png"/><style jsx>{`body{border-left: 5px solid #d04437;} #composant{background-color: #d04437;}`}</style></>; break;
    default:
  }
  
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cYear = currentDate.getFullYear();
  const allMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let cMonth = allMonth[currentDate.getMonth()];
  let cMin = currentDate.getMinutes();
  let hours = currentDate.getHours();
  let mid='AM';
  if(hours>12){
    hours=hours-12;
    mid='PM';
  }
  
  const togglePopup = (event) => {
    document.getElementById("popup-1").classList.toggle("active");
  }

  const handleClick = (status) => {
    invoke("changeStatus").then((response)=> {
      //setStatus(status);
      console.log("response:", response);
    });
    document.getElementById("popup-1").classList.toggle("active")
  };

  const [underLineDraft, setUnderLineDraft] = React.useState("");
  const stylesDraft = {
    "text-decoration": underLineDraft
  };
  const [underLineRequired, setUnderLineRequired] = React.useState("");
  const stylesRequired = {
    "text-decoration": underLineRequired
  };
  
  const [underLineOfficial, setUnderLineOfficial] = React.useState("");
  const stylesOfficial = {
    "text-decoration": underLineOfficial
  };
  const [underLineOutdated, setUnderLineOutdated] = React.useState("");
  const stylesOutdated = {
    "text-decoration": underLineOutdated
  };

  return(
    <>
      <style jsx>{`body{width:`}{width}{`;}`}</style>
      <style jsx>{`#textPart{width:`}{width-38}{`;}`}</style>
      <style jsx>{`
           *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            }
            body{
                background-color: #f5f5f5;
                display: flex;
                justify-content: left;
                align-items: center;
                font-size: 14px;
                font-family: Arial, Helvetica, sans-serif;
                text-align: left;
                position: absolute;
                min-height: 235px;
            }
            #textPart{
                background-color: #f5f5f5;
                padding: 10px;
                margin-left: 38px;
                margin-top: 5px;
            }
            #composant {
                color: white;
                border-radius: 0px 70px;
                position: fixed;
                font-size: 11px;
                margin-left: 46px;
                margin-top: -39px;
                padding-left: 8px;
                padding-right: 8px;
            }
            div.hty{
                float: left;
                border: 1px solid transparent;
                width: 100%;
                border-radius: 4px;
                margin-top: 6px;
            }
            #image1{
                width: 35px;
                height: 35px;
                margin-left: 3px;
            }
            .marked{
                margin-left: 8px;
                font-size: 12px;
            }
            .popup .overlay{
              position:fixed;
              top:0px;
              left:0px;
              width:100vw;
              height: 100vh;
              z-index:1;
              display:none;
            }
            .popup .content{
              position: fixed;
              border: 1px solid #ccc;
              top: 50%;
              left:16%;
              transform: translate(-50%, -50%) scale(0);
              background:#fff;
              z-index:2;
              text-align:left;
              padding:20px;
              box-sizing:border-box;
              height: 13.9rem; 
              margin-top: 0rem; 
              border-radius: 3px;
            }
            .listPart{
                color:#3572b0;
                cursor: pointer;
                margin-left: -32px;
            }
            h2{
                color: #333333;
                margin-top: -1rem;
            }
            dt{
                margin-bottom: 12px;
            }
            #image2{
                width: 17px; 
                height: 23px; 
                margin-right: 10px; 
                padding-top: 6px;
            }
            .tete{
                margin-left: 10px;
            }
            .popup.active .overlay{
              display:block;
            }
            .popup.active .content{
              transition: all 300ms ease-in-out;
              transform: translate(-50%, -50%) scale(1);
            }
            .close-btn{
              cursor: pointer;
              position:absolute;
              width: 20px;
              height: 20px;
              color: #222;
              font-size:25px;
              font-weight:600;
              line-height:30px;
              text-align:center;
              border-radius:50%;
              margin-left: 11rem; 
              margin-top: -1rem;
            }
      `}</style>
      <div className="hty">
        <div className="tete">
          <div className='popup' id="popup-1">
            <div className="overlay"></div>
            <div className="content">
              <h2>Changestatus</h2><span className='close-btn' onClick={togglePopup} >&times;</span>
              <dl className="listPart">
                <dt onClick={() => handleClick("DRAFT")} style={stylesDraft} onMouseEnter={() => setUnderLineDraft("underline")} onMouseLeave={() => setUnderLineDraft("")}><img id="image2" src=".\images\pencil.png"/><span>Mark as Draft</span></dt>
                <dt onClick={() => handleClick("ACTION REQUIRED")} style={stylesRequired} onMouseEnter={() => setUnderLineRequired("underline")} onMouseLeave={() => setUnderLineRequired("")}><img id="image2" src=".\images\iRequired.png"/><span>Mark as Action required</span></dt>
                <dt onClick={() => handleClick("OFFICIAL")} style={stylesOfficial} onMouseEnter={() => setUnderLineOfficial("underline")} onMouseLeave={() => setUnderLineOfficial("")}><img id="image2" src=".\images\check.png"/><span>Mark as Official</span></dt>
                <dt onClick={() => handleClick("OUTDATED")} style={stylesOutdated} onMouseEnter={() => setUnderLineOutdated("underline")} onMouseLeave={() => setUnderLineOutdated("")}><img id="image2" src=".\images\!Outdated.png"/><span>Mark as Outdated</span></dt>
              </dl>
            </div>
          </div>
          {etat}
          <button onClick={togglePopup}>show</button>
          <div id="composant">{status}</div>
          marked by Oumaima Ayachi on {cMonth} {cDay}, {cYear}, {hours}:{cMin} {mid}
        </div>
        <div id="textPart">
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}

export default App;