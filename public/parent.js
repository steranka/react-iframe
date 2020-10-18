var gIframes = [];

function openIframe() {
  console.log("openIframe called");
  // let frameWrapper = document.createElement("div");
  // frameWrapper.className = "acme-frame-wrapper";

  let iFrame = createIframe();
  // frameWrapper.appendChild(iFrame);
  document.getElementById("append-react-app").appendChild(iFrame);
  gIframes.push(iFrame);
}

function createIframe() {
  let iframe = document.createElement("iframe");
  let iframeId =
    "acme-component_iframe_" + Math.floor(Math.random() * 999999999) + 1;
  iframe.src = "./index.html";
  return iframe;
}

function closeIframe() {
  if (gIframes.length > 0) {
    let deleteIdx = gIframes.length - 1;
    let iFrameToDelete = gIframes[deleteIdx];
    //let acmeFrameWrapperDiv = iFrameToDelete.parentNode;
    iFrameToDelete.remove();
    // acmeFrameWrapperDiv.remove();
    iFrameToDelete = null;
    // acmeFrameWrapperDiv = null;
    gIframes.splice(deleteIdx);
    console.log("gIframes.length=" + gIframes.length, gIframes);
  } else {
    console.log("No iFrames are open.");
  }
}
