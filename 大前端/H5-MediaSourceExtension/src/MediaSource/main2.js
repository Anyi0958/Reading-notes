var videoMp4 = document.querySelector('.js-player-mp4');
  if (window.MediaSource) {
    var mediaSource = new MediaSource();
    videoMp4.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);
  } else {
  console.log("The Media Source Extensions API is not supported.")
  }

  function sourceOpen(e) {
    URL.revokeObjectURL(videoMp4.src);
    // 设置 媒体的编码类型
    var mime = 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"';
    var mediaSource = e.target;
    var sourceBuffer = mediaSource.addSourceBuffer(mime);
    var videoUrl = './test.mp4';
    fetch(videoUrl)
      .then(function(response) {
        return response.arrayBuffer();
      })
      .then(function(arrayBuffer) {
      sourceBuffer.addEventListener('updateend', function(e) {
        if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
          mediaSource.endOfStream();
          videoMp4.play().then(function() {
          }).catch(function(err) {
            log('.js-log-mp4', err)
          });
        }
      });
      sourceBuffer.appendBuffer(arrayBuffer);
      });
  }