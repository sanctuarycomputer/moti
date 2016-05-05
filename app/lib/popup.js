var settings = "scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no";

function getPopupOffset({width, height}) {
  var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  var wTop = window.screenTop ? window.screenTop : window.screenY;

  var left = wLeft + (window.innerWidth / 2) - (width / 2);
  var top = wTop + (window.innerHeight / 2) - (height / 2);

  return {top, left};
}

function getPopupSize(provider) {
  switch (provider) {
    case "instagram":
      return {width: 559, height: 519};

    default:
      return {width: 1020, height: 618};
  }
}

function getPopupDimensions(provider) {
  let {width, height} = getPopupSize(provider);
  let {top, left} = getPopupOffset({width, height});

  return `width=${width},height=${height},top=${top},left=${left}`;
}

export function parsePopupURL(url) {
  if (url.includes(window.location.host)) {
    let params = {};
    url.split('#').forEach(piece => {
      if (piece.includes('=')) {
        let splat = piece.split('=');
        params[splat[0]] = splat[1];
      }
    });
    return params;
  }
  return null;
}

export default function openPopup(provider, url, name) {
  return window.open(url, name, `${settings},${getPopupDimensions(provider)}`)
}
