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
    console.log(data, format, size, bgcolor);
    if (data && format && size && bgcolor) {
      const code = await fetch(
        `http(s)://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${size}x${size}&bgcolor=${bgcolor}&color=${color}`
      );
      setGenqrcode(code)
    }
  };

  // async function genHash(data){
  //   const NO_OF_ROUND = 3;
  //   const salt = await bcrypt.genSalt(NO_OF_ROUND);
  //   const hash = await bcrypt.hash(data,salt);
  //   console.log(salt);
  //   console.log(hash);
  //   return hash;
  // }

  const colors = [
    { name: "green", value: "0-255-0" },
    { name: "blue", value: "0-0-255" },
    { name: "skyblue", value: "135-206-235" },
    { name: "orange", value: "255-165-0" },
    { name: "yellow", value: "255-255-0" },
    { name: "yellowgreen", value: "154-205-50" },
    { name: "white", value: "255-255-255" },
    { name: "black", value: "0-0-0" },
  ];
  const formats = [
    { name: "PNG", value: "PNG" },
    { name: "JPEG", value: "JPG" },
    { name: "SVG", value: "SVG" },
  ];

  const sizes = [
    { name: " 200px x 200px ", value: "200" },
    { name: " 400px x 400px ", value: "400" },
    { name: " 600px x 600px ", value: "600" },
    { name: " 800px x 800px ", value: "800" },
  ];

  return (
    <div className="app">
      <div>
        <h1>QR code generator</h1>
        <p>
          Generate your QR code in a customized way and download in any format
          for further use
        </p>
      </div>
      <form>
        <div className="box">
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setdata(e.target.value)}
          /><br/>
          <p className="vsmall">This field is mandatory</p>
        </div>
        <div className="box">
          <p className="label">Select the QR Code format</p>
          <select
            className="dropdown"
            name="format"
            onChange={(e) => setFormat(e.target.value)}
          >
            {formats.map((f, index) => (
              <option value={f.value} key={index} className="opt">
                {f.name}
              </option>
            ))}
          </select>
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
            name="bgcolor"
            onChange={(e) => setColor(e.target.value)}
          >
            {colors.map((c, index) => (
              <option value={c.value} key={index} className="opt">
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={() => generateqrcode}>
          Generate QR Code
        </button>
      </form>
      <div className="qrcode">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100"
          alt="qr code generated"
          aria-label="generated qr code"
        />
      </div>
    </div>
  );
}

export default App;
