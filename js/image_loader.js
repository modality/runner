var ImageLoader = function() {
  var images = {};
  var onProgress, onComplete;

  this.load = function(urls, progress, complete) {
    this.imagesLoaded = 0;
    this.imagesRequested = urls.length;

    onProgress = progress;
    onComplete = complete;

    for(var i=0;i<urls.length;i++) {
      var url = urls[i];    

      images[url] = new Image();
      images[url].onload = function() { onload(url); };
      images[url].src = url;
    }

    onProgress(this.imagesLoaded, this.imagesRequested);
  }

  function onload(url) {
    imagesLoaded++;
    onProgress(this.imagesLoaded, this.imagesRequested);
    if(this.imagesLoaded == this.imagesRequested) {
      onComplete(images);
    }
  }

  return this;
};
