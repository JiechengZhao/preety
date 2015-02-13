function ImgList(l){
	this.len = l;
}

ImgList.prototype = new Array();
ImgList.constructor = ImgList;

ImgList.prototype.getCurrentIdx = function(x){
	function f(x){
		var h = parseInt(x)+1
		return h-parseInt(h-x)
	}
	return f(x/this.len);
}

ImgList.prototype.getCurrent = function(x){
	var idx = this.getCurrentIdx(x);
	return ( idx >= 0 &&   idx < this.length ) ? this[idx] : null;
}

ImgList.prototype.getPrevious = function(x){
	var idx = this.getCurrentIdx(x) - 1;
	return  ( idx >= 0 &&   idx < this.length ) ? this[idx] : null;
}

ImgList.prototype.resetPosition = function(x){
	var idx = this.getCurrentIdx(x);
	var off = x % this.len;
	if ( idx >= 0 &&   idx < this.length ) {
		this[idx].position.y =  off ?  this.len - off : 0 ;
		pidx = idx -1;
		if (pidx >= 0 && off ){
			var prev = this[pidx];
			prev.position.y = - off *0.5;
			var scale = (1-(off/this.len)*0.3);
			prev.scale.x = scale;
			prev.scale.y = scale;
		}
	}

}

function Bunny(texture){
    PIXI.Sprite.call(this,texture);
    // move the sprite to the center of the screen
    this.position.x = 640*0.5;
    this.position.y = 960;

    this.anchor.x = 0.5;
    this.anchor.y = 0;
}

Bunny.constructor = Bunny;
Bunny.prototype = Object.create(PIXI.Sprite.prototype);