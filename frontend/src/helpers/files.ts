

export const getBase64 = (fileBlob: any, cb: (base64: any) => any) => {
  const reader = new FileReader();
  reader.readAsDataURL(fileBlob);
  reader.onload = function () {
      cb(reader.result)
  };
  reader.onerror = function (error) {
      console.error('Error: ', error);
  };
}

export const getImageSrc = (imageStr: string): string => {
  try {
    const src = window.atob(imageStr);
    return (src.startsWith("http") || src.startsWith("data:image/jpeg;base64")) ? src : `data:image/jpeg;base64,${imageStr}`
  } catch (error) {
    return (imageStr.startsWith("http") || imageStr.startsWith("data:image/jpeg;base64")) ? imageStr : 'no-image'
  }
};

export const getAudioSrc = (audioStr: string): string => {
  try {
    const src = window.atob(audioStr);
    return (src.startsWith("http") || src.startsWith("data:audio/mpeg;base64,")) ? src : `data:audio/mpeg;base64,${audioStr}`
  } catch (error) {
    return (audioStr.startsWith("http") || audioStr.startsWith("data:audio/mpeg;base64,")) ? audioStr : 'no-audio'
  }
};