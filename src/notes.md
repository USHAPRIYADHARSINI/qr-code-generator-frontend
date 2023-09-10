2: Render QR image

import QRCode from "qrcode.react";
// other code ...
const downloadQR = () => { // will implement soon}
<div>
  <QRCode
    id="123456"
    value="123456"
    size={290}
    level={"H"}
    includeMargin={true}
  />
  <a onClick={downloadQR}> Download QR </a>
</div>
The QR will be rendered with Download QR link.


Downloading the QR image
1: Create a link without text so that it won’t be visible to users.

2: Assign the image URL and name.

3: Append the link as a child element to the body.

4: Click the created link by javascript to download the image.

5: Remove the created and invisible link.

const downloadQR = () => {
  const canvas = document.getElementById("123456");
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "123456.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
Thanks for the quick read.