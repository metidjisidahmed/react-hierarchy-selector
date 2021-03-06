function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import HierarchySelectorAbstractList from './abstract-list.component';

var HierarchySelectorPinnedList =
/*#__PURE__*/
function (_HierarchySelectorAbs) {
  _inheritsLoose(HierarchySelectorPinnedList, _HierarchySelectorAbs);

  function HierarchySelectorPinnedList() {
    return _HierarchySelectorAbs.apply(this, arguments) || this;
  }

  var _proto = HierarchySelectorPinnedList.prototype;

  _proto.render = function render() {
    return React.createElement("div", null, React.createElement("p", {
      className: "list-group-header"
    }, this.props.pinnedGroupLabel));
  };

  return HierarchySelectorPinnedList;
}(HierarchySelectorAbstractList);

export { HierarchySelectorPinnedList as default };
HierarchySelectorPinnedList.propTypes = {
  pinnedGroupLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
HierarchySelectorPinnedList.defaultProps = {
  pinnedGroupLabel: 'Pinned items'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcGlubmVkLWxpc3QuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkhpZXJhcmNoeVNlbGVjdG9yQWJzdHJhY3RMaXN0IiwiSGllcmFyY2h5U2VsZWN0b3JQaW5uZWRMaXN0IiwicmVuZGVyIiwicHJvcHMiLCJwaW5uZWRHcm91cExhYmVsIiwicHJvcFR5cGVzIiwib25lT2ZUeXBlIiwic3RyaW5nIiwiZWxlbWVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUVBLE9BQU9DLDZCQUFQLE1BQTBDLDJCQUExQzs7SUFFcUJDLDJCOzs7Ozs7Ozs7OztTQUNuQkMsTSxHQUFBLGtCQUFTO0FBQ1AsV0FDRSxpQ0FDRTtBQUFHLE1BQUEsU0FBUyxFQUFDO0FBQWIsT0FBa0MsS0FBS0MsS0FBTCxDQUFXQyxnQkFBN0MsQ0FERixDQURGO0FBS0QsRzs7O0VBUHNESiw2Qjs7U0FBcENDLDJCO0FBVXJCQSwyQkFBMkIsQ0FBQ0ksU0FBNUIsR0FBd0M7QUFDdENELEVBQUFBLGdCQUFnQixFQUFFTCxTQUFTLENBQUNPLFNBQVYsQ0FBb0IsQ0FBQ1AsU0FBUyxDQUFDUSxNQUFYLEVBQW1CUixTQUFTLENBQUNTLE9BQTdCLENBQXBCO0FBRG9CLENBQXhDO0FBSUFQLDJCQUEyQixDQUFDUSxZQUE1QixHQUEyQztBQUN6Q0wsRUFBQUEsZ0JBQWdCLEVBQUU7QUFEdUIsQ0FBM0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IEhpZXJhcmNoeVNlbGVjdG9yQWJzdHJhY3RMaXN0IGZyb20gJy4vYWJzdHJhY3QtbGlzdC5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIaWVyYXJjaHlTZWxlY3RvclBpbm5lZExpc3QgZXh0ZW5kcyBIaWVyYXJjaHlTZWxlY3RvckFic3RyYWN0TGlzdCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1oZWFkZXJcIj57dGhpcy5wcm9wcy5waW5uZWRHcm91cExhYmVsfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSGllcmFyY2h5U2VsZWN0b3JQaW5uZWRMaXN0LnByb3BUeXBlcyA9IHtcbiAgcGlubmVkR3JvdXBMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbn07XG5cbkhpZXJhcmNoeVNlbGVjdG9yUGlubmVkTGlzdC5kZWZhdWx0UHJvcHMgPSB7XG4gIHBpbm5lZEdyb3VwTGFiZWw6ICdQaW5uZWQgaXRlbXMnLFxufTtcbiJdfQ==