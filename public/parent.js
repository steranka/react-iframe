var gIframes = [];

function openIframe() {
  console.log("openIframe called");
  let frameWrapper = document.createElement("div");
  frameWrapper.id = "acme-frame-wrapper";
  frameWrapper.style.position = "absolute";
  frameWrapper.style.zIndex = 9000;
  frameWrapper.style.height = "800px";
  frameWrapper.style.width = "1024px";

  let iFrame = createIframe();
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
    iFrameToDelete.remove();
    iFrameToDelete = null;
    gIframes.splice(deleteIdx);
  } else {
    console.log("iFrame is already closed!");
  }
}
