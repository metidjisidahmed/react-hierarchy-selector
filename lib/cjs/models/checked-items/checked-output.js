"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var output = new WeakMap();

function getOutputObject(item, parentIds, isCheckedAll) {
  var currentItem = item ? Object.assign({}, item) : {};
  currentItem.id = currentItem.id || null;
  currentItem.name = currentItem.name || '';
  currentItem.children = currentItem.children || [];
  return {
    id: currentItem.id,
    name: currentItem.name,
    level: parentIds.length + 1,
    parentId: parentIds.length > 0 ? parentIds[parentIds.length - 1] : null,
    parentIds: parentIds,
    isCheckedAll: isCheckedAll,
    isChildren: Array.isArray(currentItem.children) && currentItem.children.length > 0
  };
}

function addToOutput(obj, checkedHashItem) {
  var currentOutput = output.get(obj);
  var isCheckedAll = checkedHashItem.isCheckedAll();
  var parents = checkedHashItem.getParents();

  if (isCheckedAll) {
    var item = parents[parents.length - 1];
    parents.pop();
    var parentIds = parents.map(function (i) {
      return i.id;
    });
    currentOutput.push(getOutputObject(item, parentIds, isCheckedAll));
  } else {
    var checkedItems = checkedHashItem.getCheckedItems();

    var _parentIds = parents.map(function (i) {
      return i.id;
    });

    checkedItems.forEach(function (item) {
      currentOutput.push(getOutputObject(item, _parentIds, isCheckedAll));
    });
  }
}

var CheckedOutput = function CheckedOutput() {
  var _this = this;

  _defineProperty(this, "get", function () {
    return output.get(_this).slice();
  });

  _defineProperty(this, "add", function (checkedHashItem) {
    addToOutput(_this, checkedHashItem);
  });

  _defineProperty(this, "clear", function () {
    output.get(_this).splice(0);
  });

  output.set(this, []);
};

exports["default"] = CheckedOutput;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RlbHMvY2hlY2tlZC1pdGVtcy9jaGVja2VkLW91dHB1dC5qcyJdLCJuYW1lcyI6WyJvdXRwdXQiLCJXZWFrTWFwIiwiZ2V0T3V0cHV0T2JqZWN0IiwiaXRlbSIsInBhcmVudElkcyIsImlzQ2hlY2tlZEFsbCIsImN1cnJlbnRJdGVtIiwiT2JqZWN0IiwiYXNzaWduIiwiaWQiLCJuYW1lIiwiY2hpbGRyZW4iLCJsZXZlbCIsImxlbmd0aCIsInBhcmVudElkIiwiaXNDaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSIsImFkZFRvT3V0cHV0Iiwib2JqIiwiY2hlY2tlZEhhc2hJdGVtIiwiY3VycmVudE91dHB1dCIsImdldCIsInBhcmVudHMiLCJnZXRQYXJlbnRzIiwicG9wIiwibWFwIiwiaSIsInB1c2giLCJjaGVja2VkSXRlbXMiLCJnZXRDaGVja2VkSXRlbXMiLCJmb3JFYWNoIiwiQ2hlY2tlZE91dHB1dCIsInNsaWNlIiwic3BsaWNlIiwic2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsSUFBTUEsTUFBTSxHQUFHLElBQUlDLE9BQUosRUFBZjs7QUFFQSxTQUFTQyxlQUFULENBQXlCQyxJQUF6QixFQUErQkMsU0FBL0IsRUFBMENDLFlBQTFDLEVBQXdEO0FBQ3RELE1BQU1DLFdBQVcsR0FBR0gsSUFBSSxHQUFHSSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCTCxJQUFsQixDQUFILEdBQTZCLEVBQXJEO0FBRUFHLEVBQUFBLFdBQVcsQ0FBQ0csRUFBWixHQUFpQkgsV0FBVyxDQUFDRyxFQUFaLElBQWtCLElBQW5DO0FBQ0FILEVBQUFBLFdBQVcsQ0FBQ0ksSUFBWixHQUFtQkosV0FBVyxDQUFDSSxJQUFaLElBQW9CLEVBQXZDO0FBQ0FKLEVBQUFBLFdBQVcsQ0FBQ0ssUUFBWixHQUF1QkwsV0FBVyxDQUFDSyxRQUFaLElBQXdCLEVBQS9DO0FBRUEsU0FBTztBQUNMRixJQUFBQSxFQUFFLEVBQUVILFdBQVcsQ0FBQ0csRUFEWDtBQUVMQyxJQUFBQSxJQUFJLEVBQUVKLFdBQVcsQ0FBQ0ksSUFGYjtBQUdMRSxJQUFBQSxLQUFLLEVBQUVSLFNBQVMsQ0FBQ1MsTUFBVixHQUFtQixDQUhyQjtBQUlMQyxJQUFBQSxRQUFRLEVBQUVWLFNBQVMsQ0FBQ1MsTUFBVixHQUFtQixDQUFuQixHQUF1QlQsU0FBUyxDQUFDQSxTQUFTLENBQUNTLE1BQVYsR0FBbUIsQ0FBcEIsQ0FBaEMsR0FBeUQsSUFKOUQ7QUFLTFQsSUFBQUEsU0FBUyxFQUFUQSxTQUxLO0FBTUxDLElBQUFBLFlBQVksRUFBWkEsWUFOSztBQU9MVSxJQUFBQSxVQUFVLEVBQUVDLEtBQUssQ0FBQ0MsT0FBTixDQUFjWCxXQUFXLENBQUNLLFFBQTFCLEtBQXVDTCxXQUFXLENBQUNLLFFBQVosQ0FBcUJFLE1BQXJCLEdBQThCO0FBUDVFLEdBQVA7QUFTRDs7QUFFRCxTQUFTSyxXQUFULENBQXFCQyxHQUFyQixFQUEwQkMsZUFBMUIsRUFBMkM7QUFDekMsTUFBTUMsYUFBYSxHQUFHckIsTUFBTSxDQUFDc0IsR0FBUCxDQUFXSCxHQUFYLENBQXRCO0FBQ0EsTUFBTWQsWUFBWSxHQUFHZSxlQUFlLENBQUNmLFlBQWhCLEVBQXJCO0FBQ0EsTUFBTWtCLE9BQU8sR0FBR0gsZUFBZSxDQUFDSSxVQUFoQixFQUFoQjs7QUFFQSxNQUFJbkIsWUFBSixFQUFrQjtBQUNoQixRQUFNRixJQUFJLEdBQUdvQixPQUFPLENBQUNBLE9BQU8sQ0FBQ1YsTUFBUixHQUFpQixDQUFsQixDQUFwQjtBQUNBVSxJQUFBQSxPQUFPLENBQUNFLEdBQVI7QUFDQSxRQUFNckIsU0FBUyxHQUFHbUIsT0FBTyxDQUFDRyxHQUFSLENBQVksVUFBQUMsQ0FBQztBQUFBLGFBQUlBLENBQUMsQ0FBQ2xCLEVBQU47QUFBQSxLQUFiLENBQWxCO0FBQ0FZLElBQUFBLGFBQWEsQ0FBQ08sSUFBZCxDQUFtQjFCLGVBQWUsQ0FBQ0MsSUFBRCxFQUFPQyxTQUFQLEVBQWtCQyxZQUFsQixDQUFsQztBQUNELEdBTEQsTUFLTztBQUNMLFFBQU13QixZQUFZLEdBQUdULGVBQWUsQ0FBQ1UsZUFBaEIsRUFBckI7O0FBQ0EsUUFBTTFCLFVBQVMsR0FBR21CLE9BQU8sQ0FBQ0csR0FBUixDQUFZLFVBQUFDLENBQUM7QUFBQSxhQUFJQSxDQUFDLENBQUNsQixFQUFOO0FBQUEsS0FBYixDQUFsQjs7QUFDQW9CLElBQUFBLFlBQVksQ0FBQ0UsT0FBYixDQUFxQixVQUFDNUIsSUFBRCxFQUFVO0FBQzdCa0IsTUFBQUEsYUFBYSxDQUFDTyxJQUFkLENBQW1CMUIsZUFBZSxDQUFDQyxJQUFELEVBQU9DLFVBQVAsRUFBa0JDLFlBQWxCLENBQWxDO0FBQ0QsS0FGRDtBQUdEO0FBQ0Y7O0lBRW9CMkIsYSxHQUNuQix5QkFBYztBQUFBOztBQUFBLCtCQUlSO0FBQUEsV0FBTWhDLE1BQU0sQ0FBQ3NCLEdBQVAsQ0FBVyxLQUFYLEVBQWlCVyxLQUFqQixFQUFOO0FBQUEsR0FKUTs7QUFBQSwrQkFNUixVQUFDYixlQUFELEVBQXFCO0FBQ3pCRixJQUFBQSxXQUFXLENBQUMsS0FBRCxFQUFPRSxlQUFQLENBQVg7QUFDRCxHQVJhOztBQUFBLGlDQVVOLFlBQU07QUFDWnBCLElBQUFBLE1BQU0sQ0FBQ3NCLEdBQVAsQ0FBVyxLQUFYLEVBQWlCWSxNQUFqQixDQUF3QixDQUF4QjtBQUNELEdBWmE7O0FBQ1psQyxFQUFBQSxNQUFNLENBQUNtQyxHQUFQLENBQVcsSUFBWCxFQUFpQixFQUFqQjtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IG91dHB1dCA9IG5ldyBXZWFrTWFwKCk7XG5cbmZ1bmN0aW9uIGdldE91dHB1dE9iamVjdChpdGVtLCBwYXJlbnRJZHMsIGlzQ2hlY2tlZEFsbCkge1xuICBjb25zdCBjdXJyZW50SXRlbSA9IGl0ZW0gPyBPYmplY3QuYXNzaWduKHt9LCBpdGVtKSA6IHt9O1xuXG4gIGN1cnJlbnRJdGVtLmlkID0gY3VycmVudEl0ZW0uaWQgfHwgbnVsbDtcbiAgY3VycmVudEl0ZW0ubmFtZSA9IGN1cnJlbnRJdGVtLm5hbWUgfHwgJyc7XG4gIGN1cnJlbnRJdGVtLmNoaWxkcmVuID0gY3VycmVudEl0ZW0uY2hpbGRyZW4gfHwgW107XG5cbiAgcmV0dXJuIHtcbiAgICBpZDogY3VycmVudEl0ZW0uaWQsXG4gICAgbmFtZTogY3VycmVudEl0ZW0ubmFtZSxcbiAgICBsZXZlbDogcGFyZW50SWRzLmxlbmd0aCArIDEsXG4gICAgcGFyZW50SWQ6IHBhcmVudElkcy5sZW5ndGggPiAwID8gcGFyZW50SWRzW3BhcmVudElkcy5sZW5ndGggLSAxXSA6IG51bGwsXG4gICAgcGFyZW50SWRzLFxuICAgIGlzQ2hlY2tlZEFsbCxcbiAgICBpc0NoaWxkcmVuOiBBcnJheS5pc0FycmF5KGN1cnJlbnRJdGVtLmNoaWxkcmVuKSAmJiBjdXJyZW50SXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwLFxuICB9O1xufVxuXG5mdW5jdGlvbiBhZGRUb091dHB1dChvYmosIGNoZWNrZWRIYXNoSXRlbSkge1xuICBjb25zdCBjdXJyZW50T3V0cHV0ID0gb3V0cHV0LmdldChvYmopO1xuICBjb25zdCBpc0NoZWNrZWRBbGwgPSBjaGVja2VkSGFzaEl0ZW0uaXNDaGVja2VkQWxsKCk7XG4gIGNvbnN0IHBhcmVudHMgPSBjaGVja2VkSGFzaEl0ZW0uZ2V0UGFyZW50cygpO1xuXG4gIGlmIChpc0NoZWNrZWRBbGwpIHtcbiAgICBjb25zdCBpdGVtID0gcGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdO1xuICAgIHBhcmVudHMucG9wKCk7XG4gICAgY29uc3QgcGFyZW50SWRzID0gcGFyZW50cy5tYXAoaSA9PiBpLmlkKTtcbiAgICBjdXJyZW50T3V0cHV0LnB1c2goZ2V0T3V0cHV0T2JqZWN0KGl0ZW0sIHBhcmVudElkcywgaXNDaGVja2VkQWxsKSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZEhhc2hJdGVtLmdldENoZWNrZWRJdGVtcygpO1xuICAgIGNvbnN0IHBhcmVudElkcyA9IHBhcmVudHMubWFwKGkgPT4gaS5pZCk7XG4gICAgY2hlY2tlZEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGN1cnJlbnRPdXRwdXQucHVzaChnZXRPdXRwdXRPYmplY3QoaXRlbSwgcGFyZW50SWRzLCBpc0NoZWNrZWRBbGwpKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGVja2VkT3V0cHV0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgb3V0cHV0LnNldCh0aGlzLCBbXSk7XG4gIH1cblxuICBnZXQgPSAoKSA9PiBvdXRwdXQuZ2V0KHRoaXMpLnNsaWNlKCk7XG5cbiAgYWRkID0gKGNoZWNrZWRIYXNoSXRlbSkgPT4ge1xuICAgIGFkZFRvT3V0cHV0KHRoaXMsIGNoZWNrZWRIYXNoSXRlbSk7XG4gIH1cblxuICBjbGVhciA9ICgpID0+IHtcbiAgICBvdXRwdXQuZ2V0KHRoaXMpLnNwbGljZSgwKTtcbiAgfVxufVxuIl19