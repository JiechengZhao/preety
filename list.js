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
		var the = this[idx]
		the.position.y =  off ?  this.len - off : 0 ;
		the.scale.x = 1;
		the.scale.y = 1;
		var pidx = idx -1;
		if (pidx >= 0 && off ){
			var prev = this[pidx];
			prev.position.y = - off *0.3;
			var scale = (1-(off/this.len)*0.3);
			prev.scale.x = scale;
			prev.scale.y = scale;
		}
		var nidx = idx +1;
		if ( nidx < this.length){
			this[nidx].y = this.len;
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

function World(l,n){
	this.l = l
	this.hl = l*3/4
	this.n = n
	this.max = (n-1)*l
	this.x = 0
	this.v = 0
}

World.constructor = World;

World.prototype.check=function(x){
	if (x <0){
		this.x = 0
		this.v = 0
		return true
	}
	if (x > this.max){
		this.x = this.max
		this.v = 0
		return true
	}
	return false
}

World.prototype.set=function(x){
	if (this.check(x)){
		return 
	}
	this.v = x - this.x
	this.x = x
}

World.prototype.get=function(){
	return Math.round(this.x)
}

World.prototype.next=function(){
	var x = this.x + this.v
	if (this.check(x)){
		return 0
	}
	var a = (this.hl -  (this.x + this.hl)%this.l )*0.05
	this.v = (this.v*0.6 + a)
	this.x = x
	x = Math.round(x)
	if ( (x % this.l) == 0 && this.v < 1){
		this.x = x
		this.v = 0
	}
	return x
}
