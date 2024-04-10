import { useState } from "react";
import "./App.css";
// import QRCode from "qrcode.react";
// import bcrypt from 'bcrypt';

function App() {
  const [data, setdata] = useState("");
  const [format, setFormat] = useState("JPG");
  const [size, setSize] = useState("200");
  const [bgcolor, setbgcolor] = useState("255-255-255");
  const [color, setColor] = useState("0-0-0");
  const [genqrcode, setGenqrcode] = useState('')

  const generateqrcode = async(e) => {
    e.preventDefault();
    // const hash = await genHash(data)
    console.log(data, format, size, bgcolor, color);
    try{
      if (data && format && size && bgcolor) {
        console.log(data, format, size, bgcolor, color);
        const url = `https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${size}x${size}&bgcolor=${bgcolor}&color=${color}`
        // const code = await fetch(url);
        setGenqrcode(url)
      }
    }catch(error){
      alert(`Error generating code: ${error}`)
    }
    
  };


  const colors = [
    {},
    { name: "white", value: "255-255-255" },
    { name: "green", value: "0-255-0" },
    { name: "blue", value: "0-0-255" },
    { name: "skyblue", value: "135-206-235" },
    { name: "orange", value: "255-165-0" },
    { name: "yellow", value: "255-255-0" },
    { name: "yellowgreen", value: "154-205-50" },
    { name: "black", value: "0-0-0" },
  ];

  const sizes = [
    { name: " 200px x 200px ", value: "200" },
    { name: " 400px x 400px ", value: "400" },
    { name: " 600px x 600px ", value: "600" },
    { name: " 800px x 800px ", value: "800" },
  ];

  const download = async() => {
    // console.log ("hi")
    try{
      await fetch (genqrcode)
      .then((res)=>res.blob())
      .then((blob)=>{
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
    }catch(error){
      console.log("error in downloading", error)
    }
  }

  return (
    <div className="app">
      {/* <div className="fullbox"> */}
        <h1>QR code generator</h1>
        <p className="subtitle">
          Generate your QR code in a customized way and download it
          for further use
        </p>
      {genqrcode? <div className="qrcode">
        {console.log(genqrcode)}
        <img
          src={genqrcode}
          alt="qr code generated"
          aria-label="generated qr code"
        />
        <button onClick={()=>download()}>Download QR code</button>
      </div> : null
}
      <form onSubmit={(e) => generateqrcode(e)} className="clsform">
        <div className="box">
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setdata(e.target.value)}
          /><br/>
          <p className="vsmall">This field is mandatory</p>
        </div>
        
        <div className="box">
          <p className="label">Select the QR Code size</p>
          <select
            className="dropdown"
            name="size"
            onChange={(e) => setSize(e.target.value)}
          >
            {sizes.map((s, index) => (
              <option value={s.value} key={index} className="opt">
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <p className="vsmall">Defalut color is black and white</p>
        <div className="box">
          <p className="label">Select the QR Code background colour</p>
          <select
            className="dropdown"
            name="bgcolor"
            onChange={(e) => setbgcolor(e.target.value)}
          >
            {colors.map((f, index) => (
              <option value={f.value} key={index} className="opt">
                {f.name}
              </option>
            ))}
          </select>
        </div>
        <div className="box">
          <p className="label">Select the color of the qr code</p>
          <select
            className="dropdown"
            name="color"
            onChange={(e) => setColor(e.target.value)}
          >
            {colors.map((c, index) => (
              <option value={c.value} key={index} className="opt">
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" >
          Generate QR Code
        </button>
      </form>
    {/* </div> */}
    </div>
  );
}

export default App;
