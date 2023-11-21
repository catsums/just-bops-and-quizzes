///splash_script.js

let myMods = [];
import * as MY from './myHelperFunctions.js'; myMods.push(MY);

for(let mod of myMods){
	Object.entries(mod).forEach(([name, exported]) => window[name] = exported);
}

export class Vector2{
	x; y;

	static get ZERO(){
		return new Vector2(0,0);
	}
	static get ONE(){
		return new Vector2(1,1);
	}
	static get NEG_ONE(){
		return new Vector2(-1,-1);
	}
	static get INF(){
		return new Vector2(Infinity,Infinity);
	}
	static get NEG_INF(){
		return new Vector2(-Infinity,-Infinity);
	}
	static get EPSILON(){
		return new Vector2(Number.MIN_VALUE,Number.MIN_VALUE);
	}

	static get UP(){
		return new Vector2(0,-1);
	}
	static get DOWN(){
		return new Vector2(0,1);
	}
	static get LEFT(){
		return new Vector2(-1,0);
	}
	static get RIGHT(){
		return new Vector2(1,0);
	}

	static ADD(v1,v2){
		return new Vector2(v1.x+v2.x,v1.y+v2.y);
	}
	add(other){
		this.x+=other.x;
		this.y+=other.y;
	}
	static SUBTRACT(v1,v2){
		return new Vector2(v1.x-v2.x,v1.y-v2.y);
	}
	subtract(other){
		this.x-=other.x;
		this.y-=other.y;
	}

	static MULTIPLY(v1,v2){
		if(MY.isNumber(v2))
			v2 = new Vector2(v2,v2);
		return new Vector2(v1.x*v2.x,v1.y*v2.y);
	}
	multiply(other){
		if(MY.isNumber(other)){
			return this.scale(other);
		}
		this.x*=other.x;
		this.y*=other.y;
	}

	static DIVIDE(v1,v2){
		return new Vector2(v1.x/v2.x,v1.y/v2.y);
	}
	divide(other){
		this.x/=other.x;
		this.y/=other.y;
	}

	static SCALE(v1, n){
		return new Vector2(v1.x*n,v2.y*n);
	}
	scaleBy(n){
		this.x*=n;
		this.y*=n;
	}
	scaled(n){
		return new Vector2(this.x*n,this.y*n);
	}

	static MOD(v1,v2){
		return new Vector2(
			mod(v1.x,v2.x), mod(v1.y,v2.y)
		);
	}
	mod(other){
		this.x = mod(this.x,other.x);
		this.y = mod(this.y,other.y);
	}

	static MODBY(v1,n){
		return new Vector2(
			mod(v1.x,n), mod(v1.y,n)
		);
	}
	modBy(n){
		this.x = mod(this.x, n);
		this.y = mod(this.y, n);
	}

	static DOT(v1,v2){
		return (v1.x*v2.x)+(v1.y*v2.y);
	}

	static EQUALS(v1,v2){
		if(!v1 && !v2) return true;

		if(v1?.x === v2?.x && v1?.y === v2?.y) return true;

		if(
			(Math.abs(v1?.x - v2?.x) < Number.EPSILON) &&
			(Math.abs(v1?.y - v2?.y) < Number.EPSILON)
		){
			return true;
		}

		return false;
	}
	equals(other){
		return Vector2.EQUALS(this, other);
	}

	static SortAlgo(a,b){
		if(a.isGreaterThan(b)) return 1;
		else if(a.isLesserThan(b)) return -1;
		return 0;
	}
	static SortAlgoX(a,b){
		if(a.x > b.x) return 1;
		else if(a.x < b.x) return -1;
		return 0;
	}
	static SortAlgoY(a,b){
		if(a.y > b.y) return 1;
		else if(a.y < b.y) return -1;
		return 0;
	}
	static SortAlgoXY(a,b){
		if(a.x > b.x) return 1;
		else if(a.x < b.x) return -1;
		if(a.y > b.y) return 1;
		else if(a.y < b.y) return -1;
		return 0;
	}
	static SortAlgoXY(a,b){
		if(a.y > b.y) return 1;
		else if(a.y < b.y) return -1;
		if(a.x > b.x) return 1;
		else if(a.x < b.x) return -1;
		return 0;
	}
	static SortAlgoAvg(a,b){
		let x,y;
		if(a.x > b.x) x = 1;
		else if(a.x < b.x) x = -1;
		else x = 0;

		if(a.y > b.y) y = 1;
		else if(a.y < b.y) y = -1;
		else y = 0;

		let avg = x+y/2;

		return Math.trunc(avg);
	}

	constructor(x=0,y=0){
		if(x instanceof Vector2 || (MY.isObject(x) && 'x' in x && 'y' in x)){
			this.x = x.x; this.y = x.y;
		}else if(MY.isArray(x) && MY.isNumber(x[0]) && MY.isNumber(x[1])){
			this.x = x[0]; this.y = x[1];
		}else if(MY.isNumber(x) && MY.isNumber(y)){
			this.x = x; this.y = y;
		}else{
			this.x = 0; this.y = 0;
		}
	}
	abs(){
		var v = new Vector2(Math.abs(this.x),Math.abs(this.y));
		return v;
	}
	lengthSquared(){
		var llengthSquared = Math.pow(this.x,2) + Math.pow(this.y,2);
		return llengthSquared;
	}
	length(){
		return Math.sqrt(this.lengthSquared());
	}
	lerp(other, t){
		let x = this.x + (other.x - this.x) * t;
		let y = this.y + (other.y - this.y) * t;

		return new Vector2(x,y);
	}
	sumOfParts(){
		return (this.x + this.y);
	}
	ratioed(){
		var sum = this.sumOfParts();
		
		return new Vector2(
			MY.safeDivide(this.x, sum), MY.safeDivide(this.y, sum)
		);
	}
	isNormalised(){
		return Math.abs(this.lengthSquared()-1) == 0;
	}
	normalized(){
		var llen = this.length();
		
		return new Vector2(
			MY.safeDivide(this.x, llen), MY.safeDivide(this.y, llen)
		);
	}
	normalised(){
		return this.normalized()
	}
	magnitude(){
		return this.length();
	}
	dot(other){
		return (this.x*other.x)+(this.y*other.y);
	}
	lineTo(other){
		return Vector2.SUBTRACT(other,this);
	}
	gradient(){
		return MY.safeDivide(this.y,this.x);
	}
	angle(){

		let prod = MY.safeDivide(this.y, this.x);

		return Math.atan(prod);
	}
	angleTo(other){
		return (this.angle())-(other.angle());
	}
	angleToPoint(other){
		return this.lineTo(other).angle();
	}
	angleBetween(a,b){
		//p1 = c, p2 = a, p3 = b
		let c = new Vector2(this);

		let top = (a.y * (c.x-b.x)) + (c.y * (b.x-a.x)) + (b.y * (a.x-c.x));
		let bot = ((a.x-c.x)*(c.x-b.x)) + ((a.y-c.y)*(c.y-b.y));

		let ratio = MY.safeDivide(top,bot);

		let angle = Math.atan(ratio);

		return angle;
	}
	distanceSquaredTo(other){
		return Vector2.SUBTRACT(other, this).lengthSquared();
	}
	distanceTo(other){
		return Vector2.SUBTRACT(other, this).length();
	}
	directionTo(other){
		return Vector2.SUBTRACT(other,this).normalized();
	}
	rotateAround(pivot, angle){

		let pt = new Vector2(this);
		let ct = new Vector2(pivot);

		let sinO = Math.sin(angle);
		let cosO = Math.cos(angle);

		pt.x -= ct.x;
		pt.y -= ct.y;

		this.x = (pt.x * cosO) - (pt.y * sinO) + ct.x;
		this.y = (pt.x * sinO) + (pt.y * cosO) + ct.y;

	}
	rotated(pivot, angle){

		let pt = new Vector2(this);
		let ct = new Vector2(pivot);

		let sinO = Math.sin(angle);
		let cosO = Math.cos(angle);

		pt.x -= ct.x;
		pt.y -= ct.y;

		let _x = (pt.x * cosO) - (pt.y * sinO) + ct.x;
		let _y = (pt.x * sinO) + (pt.y * cosO) + ct.y;

		return new Vector2(_x,_y);
	}

	static INVERSE(v1){
		return v1.inverse();
	}

	inverse(){
		let ix, iy;
		if(this.x === 0) ix = Infinity;
		else if(this.x === Infinity || this.x === -Infinity) ix = 0;
		else ix = 1/this.x;

		if(this.y === 0) iy = Infinity;
		else if(this.y === Infinity || this.y === -Infinity) iy = 0;
		else iy = 1/this.y;

		return new Vector2(ix,iy);
	}

	static FLIPPED(v1){
		return new Vector2(v1.y, v1.x);
	}

	flipped(){
		return new Vector2(this.y, this.x);
	}

	static MIDPOINT(arr){
		if(!MY.isArray(arr)){
			arr = [];
		}
		let _x = 0, _y = 0;
		for(let v of arr){
			v = new Vector2(v);
			_x += v.x;
			_y += v.y;
		}

		let x = MY.safeDivide(_x, arr.length);
		let y = MY.safeDivide(_y, arr.length);

		return new Vector2(x,y);
	}

	midPoint(other){
		let arr = [];
		if(!MY.isArray(other)){
			arr.push(other);
		}else{
			arr = arr.concat(other);
		}
		let _x = 0, _y = 0;
		for(let v of arr){
			v = new Vector2(v);
			_x += v.x;
			_y += v.y;
		}

		_x += this.x;
		_y += this.y;

		let x = MY.safeDivide(_x, arr.length+1);
		let y = MY.safeDivide(_y, arr.length+1);

		return new Vector2(x,y);
	}

	floor(){
		return new Vector2(Math.floor(this.x), Math.floor(this.y));
	}
	ceil(){
		return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
	}

	reflect(other){
		return Vector2.SUBTRACT(this, Vector2.SCALE(other,2*Vector2.DOT(this, other)));
	}
	project(norm){
		return Vector2.SCALE(norm, this.dot(norm)/norm.lengthSquared());
	}
	slide(other){
		return Vector2.SUBTRACT(this, Vector2.SCALE(other, this.dot(other)));
	}
	bounce(other){
		return Vector2.NEG(this.reflect(other));
	}

	closestPoint(arr, exclusive=false){
		if(!MY.isArray(arr) || !arr.length) return null;

		let pt = null; let dist = Infinity;
		for(let v of arr){
			if(exclusive && v.equals(this)){
				continue;
			}
			let _dist = Math.abs(v.distanceTo(this));
			if(_dist < dist){
				pt = v; dist = _dist;
			}
		}
		return pt;
	}

	sortPointsByClosest(points){
		if(!MY.isArray(points)) return null;

		let arr = points.slice();
		
		let len = arr.length;
		let newArr = [];
		// console.log({arr,len,points,newArr})
		for(let i=0; i<len; i++){
			let pt = this.closestPoint(arr);
			// console.log({pt})
			if(!pt) continue;
			newArr.push(pt);
			let index = arr.indexOf(pt);
			arr.splice(index, 1);
			// MY.arrayRemove(arr, pt);
			i--;
		}
		return newArr;
	}

	toString(){
		var out = "( "+String(this.x)+" , "+String(this.y)+" )";
		return out;
	}
	asObject(){
		return {x:this.x,y:this.y};
	}
	asArray(){
		return [this.x, this.y];
	}

	

	isGreaterThan(other){
		return (this.lengthSquared() > other.lengthSquared());
	}
	isLesserThan(other){
		return (this.lengthSquared() < other.lengthSquared());
	}

	static NEG(v1){
		return new Vector2(-v1.x,-v2.y);
	}
	neg(){
		return Vector2.NEG(this);
	}

	static quadraticBezier(points, t){
		let qPoints = [];

		for(let i=0; i<points.length-1; i++){
			let pA = new Vector2(points[i]);
			let pB = new Vector2(points[i+1]);

			let pt = pA.lerp(pB, t);

			qPoints.push(pt);
		}

		if(qPoints.length<2){
			return qPoints[0];
		}

		return Vector2.quadraticBezier(qPoints, t);

	}

	static quadraticBezierPoints(points, inc){
		let qPoints = [];
		if(MY.isArray(points)&&MY.isNumber(inc)&&inc>0){
			let t = 0; let last = false;
			while(t<=1){
				qPoints.push(Vector2.quadraticBezier(points,t));
				t += inc;
				if(t>1 && !last){
					t = 1; last = true;
				}
			}
		}

		return qPoints;
	}
}

export class Vector2Line{
	a; b; c;
	// f //x intercept
	// e //y intercept
	// m //gradient

	get gradient(){
		return MY.safeDivide( -(this.a), this.b );
	}get m(){
		return this.gradient;
	}

	get xIntercept(){
		return MY.safeDivide( -(this.c), this.a );
	}get f(){
		return this.xIntercept;
	}

	get yIntercept(){
		return MY.safeDivide( -(this.c), this.b );
	}get e(){
		return this.yIntercept;
	}

	constructor(x,y){
		if(
			(x instanceof Vector2 && y instanceof Vector2) ||
			(MY.isObject(x) && MY.isObject(y)) ||
			(MY.isArray(x) && MY.isArray(y))
		){
			//make line that passes through these points
			let a, b, c;

			let v1 = new Vector2(
				(x.x||x[0]||0), (x.y||x[1]||0)
			);
			let v2 = new Vector2(
				(y.x||y[0]||0), (y.y||y[1]||0)
			);

			let m = Vector2.SUBTRACT(v2,v1).gradient();

			//y=mx+e
			//e = y - mx

			let e, f;

			if(MY.isInfinity(m)){
				//vertical line
				c = -(v1.x || v2.x);
				b = 0;
				a = -1;
			}else if(m == 0){
				//horizontal line
				a = 0;
				b = -1;
				c = -(v1.y || v2.y);
			}else{
				e = (v1.y) - (m * (v1.x));
				f = MY.safeDivide(-e, m);

				c = -(f * m);
				b = MY.safeDivide(-c, e) || 1;
				a = -(b*m);

				//
			}
			
			//finish and account for vertical and horizontal lines

			

			this.a = a; this.b = b; this.c = c;
		}else if(MY.isObject(x) && (
			'a' in x && 'b' in x && 'c' in x
		)){
			//use standard form
			let obj = x;

			this.a = obj.a;
			this.b = obj.b;
			this.c = obj.c;
		}else if(MY.isObject(x) && (
			('gradient' in x || 'm' in x) && ('e' in x || 'c' in x || 'yIntercept' in x)
		)){
			//use intercept form
			let obj = x;
			let a, b, c;

			let m = (obj.gradient)||(obj.m)||0;
			let e = (obj.e)||(obj.c)||(obj.yIntercept)||0;
			let f;

			if('f' in obj || 'xIntercept' in obj){
				f = (obj.f)||(obj.xIntercept)||0;
				c = -(f * m);
			}else{
				c = 1;
				f = MY.safeDivide(-c,m);
			}

			b = MY.safeDivide(-c, e);
			a = -(b*m);

			this.a = a; this.b = b; this.c = c;

		}else if(MY.isObject(x) && (
			('f' in x || 'x' in x || 'c' in x || 'xIntercept' in x) && ('e' in x || 'y' in x || 'yIntercept' in x)
		)){
			//use intercept form but with actual intercepts
			let obj = x;
			let a, b, c;

			let e = (obj.e)||(obj.c)||(obj.y)||(obj.yIntercept)||0;
			let f = (obj.f)||(obj.x)||(obj.xIntercept)||0;

			let m = new Vector2(0 - e, f - 0).gradient();

			c = -(f * m);
			b = MY.safeDivide(-c, e);
			a = -(b*m);

			this.a = a; this.b = b; this.c = c;

		}else if(MY.isNumber(x)&&MY.isNumber(y)){
			//treat as x and y intercepts

			let a, b, c;

			let e = y;
			let f = x;

			let m = new Vector2(0 - e, f - 0).gradient();

			c = -(f * m);
			b = MY.safeDivide(-c, e);
			a = -(b*m);

			this.a = a; this.b = b; this.c = c;

		}
	}

	getX(y){
		let x;
		if(this.b != 0){
			let m = this.gradient;
			let e = this.yIntercept;

			//y = mx+e
			//x = (y - e)/m

			x = MY.safeDivide((y - e), m);
		}else{
			let c = this.c;
			let a = this.a;

			x = MY.safeDivide(-c, a);
		}

		return x;

	}
	getY(x){
		let y;
		if(this.a != 0){
			let m = this.gradient;
			let e = this.yIntercept;

			//y = mx+e
			//x = (y - e)/m

			y = (m*x) + e;
		}else{
			let c = this.c;
			let b = this.b;

			y = MY.safeDivide(-c, b);
		}

		return y;
	}

	equals(other){
		return (
			this.gradient == other.gradient &&
			this.yIntercept == other.yIntercept &&
			this.xIntercept == other.xIntercept
		);
	}

	isHorizontal(){
		return (this.a === 0);
	}
	isVertical(){
		return (this.b === 0);
	}

	hasPoint(point){
		let v = new Vector2(point);

		//ax+by+c=0

		let res;

		if(MY.isInfinity(this.a) && MY.isInfinity(this.b)){
			if(a == b){
				// INF + INF
				res = Infinity + this.c;
			}else{
				// INF - INF
				res = 0 + this.c;
			}
		}else{
			let ax = (this.a * v.x);
			let by = (this.b * v.y);
			let c = (this.c);

			res = (ax + by + c);
			res = Number(res);
		}

		

		return (res == 0);

	}

	angle(){
		let xInt = this.xIntercept;
		let yInt = this.yIntercept;

		if(xInt == Infinity) return 0; //or Math.PI
		if(xInt == -Infinity) return (Math.PI); //or Math.PI
		if(yInt == Infinity) return (Math.PI/2);
		if(yInt == -Infinity) return -(Math.PI/2);

		let vx = new Vector2(xInt, 0);
		let vy = new Vector2(0,yInt);

		return vx.angleToPoint(vy);
	}

	intersect(other){
		//x = (b1c2-b2c1)/(a1b2-a2b1) = BC/AB
		//y = (a2c1-a1c2)/(a1b2-a2b1) = AC/AB

		if(other.gradient == this.gradient){
			return null;
		}

		let a1 = this.a, a2 = other.a;
		let b1 = this.b, b2 = other.b;
		let c1 = this.c, c2 = other.c;

		let b1c2 = b1 * c2; let b2c1 = b2 * c1;
		let a1b2 = a1 * b2; let a2b1 = a2 * b1;
		let a2c1 = a2 * c1; let a1c2 = a1 * c2;

		let BC, AB, AC;

		if(MY.isInfinity(b1c2) && MY.isInfinity(b2c1) && b1c2!=b2c1){
			BC = 0;
		}else{
			BC = (b1c2-b2c1);
		}
		if(MY.isInfinity(a1b2) && MY.isInfinity(a2b1) && a1b2!=a2b1){
			AB = 0;
		}else{
			AB = (a1b2-a2b1);
		}
		if(MY.isInfinity(a2c1) && MY.isInfinity(a1c2) && a2c1!=a1c2){
			AC = 0;
		}else{
			AC = (a2c1-a1c2);
		}

		// console.log({BC,AB,AC, l1:this,l2:other})

		let x = MY.safeDivide((BC),(AB));
		let y = MY.safeDivide((AC),(AB));

		// console.log({x,y})

		return new Vector2(x,y);

	}

	perpendicular(point){

		point = new Vector2(point);

		if(this.a == 0){
			let a = this.b, b = this.a, c = point.x;
			return new Vector2Line({a,b,c});
		}else if(this.b == 0){
			let a = this.b, b = this.a, c = point.y;
			return new Vector2Line({a,b,c});
		}else{

			let m = MY.safeDivide(-1,this.gradient);

			let e = (point.y) + ((1/m) * point.x);

			let f = MY.safeDivide(-e, m);

			return new Vector2Line({
				gradient: m, xIntercept: f, yIntercept: f
			});

		}

	}

	normal(){
		return new Vector2(this.a, this.b);
	}

	mirror(point){
		point = new Vector2(point);

		if(this.hasPoint(point)){
			return new Vector2(point);
		}

		let _normal = this.normal();
		let unitNormal = _normal.normalized();

		let unitC = MY.safeDivide(this.c , _normal.length());

		let signedDist = (unitNormal.x * point.x) + (unitNormal.y * point.y) + unitC;

		let mx = point.x - 2 * unitNormal.x * signedDist;
		let my = point.y - 2 * unitNormal.y * signedDist;

		return new Vector2(mx,my);
	}

}
