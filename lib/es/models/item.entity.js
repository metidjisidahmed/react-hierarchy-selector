var ItemEntity = function ItemEntity(data) {
  this.id = data && data.id ? data.id : null;
  this.name = data && data.name ? data.name : null;
  this.children = data && Array.isArray(data.children) ? data.children : [];
};

export { ItemEntity as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvaXRlbS5lbnRpdHkuanMiXSwibmFtZXMiOlsiSXRlbUVudGl0eSIsImRhdGEiLCJpZCIsIm5hbWUiLCJjaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSJdLCJtYXBwaW5ncyI6IklBQXFCQSxVLEdBQ25CLG9CQUFZQyxJQUFaLEVBQWtCO0FBQ2hCLE9BQUtDLEVBQUwsR0FBVUQsSUFBSSxJQUFJQSxJQUFJLENBQUNDLEVBQWIsR0FBa0JELElBQUksQ0FBQ0MsRUFBdkIsR0FBNEIsSUFBdEM7QUFDQSxPQUFLQyxJQUFMLEdBQVlGLElBQUksSUFBSUEsSUFBSSxDQUFDRSxJQUFiLEdBQW9CRixJQUFJLENBQUNFLElBQXpCLEdBQWdDLElBQTVDO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQkgsSUFBSSxJQUFJSSxLQUFLLENBQUNDLE9BQU4sQ0FBY0wsSUFBSSxDQUFDRyxRQUFuQixDQUFSLEdBQXVDSCxJQUFJLENBQUNHLFFBQTVDLEdBQXVELEVBQXZFO0FBQ0QsQzs7U0FMa0JKLFUiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtRW50aXR5IHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMuaWQgPSBkYXRhICYmIGRhdGEuaWQgPyBkYXRhLmlkIDogbnVsbDtcbiAgICB0aGlzLm5hbWUgPSBkYXRhICYmIGRhdGEubmFtZSA/IGRhdGEubmFtZSA6IG51bGw7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGRhdGEgJiYgQXJyYXkuaXNBcnJheShkYXRhLmNoaWxkcmVuKSA/IGRhdGEuY2hpbGRyZW4gOiBbXTtcbiAgfVxufVxuIl19